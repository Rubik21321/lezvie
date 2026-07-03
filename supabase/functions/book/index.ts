// Edge Function «book»:
//   GET  ?master=Марк&date=2026-07-03  → { ok, busy: ["19:00", ...] } — занятые слоты
//   POST { name, phone, service, master, date, time } → сохраняет заявку,
//        шлёт уведомление в Telegram с кнопками «Подтвердить» / «Отменить».
import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

const ANY_MASTER = 'Любой мастер'
const CAPACITY = 3 // всего кресел/мастеров в смене

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // ---- Занятые слоты ----
  if (req.method === 'GET') {
    const url = new URL(req.url)
    const master = (url.searchParams.get('master') ?? ANY_MASTER).slice(0, 50)
    const date = url.searchParams.get('date') ?? ''
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return json({ ok: false, error: 'Неверная дата' }, 400)
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('time, master')
      .eq('date', date)
      .neq('status', 'cancelled')

    if (error) {
      console.error('busy query error:', error)
      return json({ ok: false, error: 'Ошибка базы' }, 500)
    }

    const countByTime: Record<string, number> = {}
    const busy = new Set<string>()
    for (const b of data) {
      countByTime[b.time] = (countByTime[b.time] ?? 0) + 1
      if (b.master === master) busy.add(b.time)
    }
    // слот закрыт для всех, если занята вся смена
    for (const [t, count] of Object.entries(countByTime)) {
      if (count >= CAPACITY) busy.add(t)
    }
    return json({ ok: true, busy: [...busy].sort() })
  }

  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)

  // ---- Создание заявки ----
  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return json({ ok: false, error: 'Некорректный запрос' }, 400)
  }

  const name = (data.name ?? '').trim().slice(0, 100)
  const phone = (data.phone ?? '').trim().slice(0, 30)
  const service = (data.service ?? '').trim().slice(0, 100)
  const master = (data.master ?? ANY_MASTER).trim().slice(0, 50)
  const date = (data.date ?? '').trim()
  const time = (data.time ?? '').trim()

  if (!name || !phone || !service || !date || !time) {
    return json({ ok: false, error: 'Заполнены не все поля' }, 400)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{1,2}:\d{2}$/.test(time)) {
    return json({ ok: false, error: 'Неверный формат даты или времени' }, 400)
  }

  // Проверка занятости (плюс уникальный индекс в базе — от гонок)
  const { data: existing, error: checkError } = await supabase
    .from('bookings')
    .select('id, master')
    .eq('date', date)
    .eq('time', time)
    .neq('status', 'cancelled')

  if (checkError) {
    console.error('check error:', checkError)
    return json({ ok: false, error: 'Ошибка базы' }, 500)
  }

  const slotTaken =
    existing.some((b) => b.master === master) || existing.length >= CAPACITY
  if (slotTaken) {
    return json({ ok: false, error: 'Это время уже занято — выберите другое' }, 409)
  }

  const { data: inserted, error: dbError } = await supabase
    .from('bookings')
    .insert({ name, phone, service, master, date, time })
    .select('id')
    .single()

  if (dbError) {
    if (dbError.code === '23505') {
      return json({ ok: false, error: 'Это время уже занято — выберите другое' }, 409)
    }
    console.error('db insert error:', dbError)
    return json({ ok: false, error: 'Не удалось сохранить заявку' }, 500)
  }

  // Уведомление в Telegram с кнопками управления
  const tgToken = Deno.env.get('TG_BOT_TOKEN')
  const tgChat = Deno.env.get('TG_CHAT_ID')
  if (tgToken && tgChat) {
    const [y, m, d] = date.split('-')
    const text = [
      `💈 Новая запись №${inserted.id}`,
      '',
      `👤 ${name}`,
      `📞 ${phone}`,
      `✂️ ${service}`,
      `🧔 Мастер: ${master}`,
      `📅 ${d}.${m}.${y} в ${time}`,
    ].join('\n')

    const tgRes = await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: tgChat,
        text,
        reply_markup: {
          inline_keyboard: [[
            { text: '✅ Подтвердить', callback_data: `confirm:${inserted.id}` },
            { text: '❌ Отменить', callback_data: `cancel:${inserted.id}` },
          ]],
        },
      }),
    })
    if (!tgRes.ok) {
      console.error('telegram error:', await tgRes.text())
    }
  }

  return json({ ok: true, id: inserted.id })
})
