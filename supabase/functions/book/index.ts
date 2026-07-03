// Edge Function «book»: принимает заявку с сайта,
// сохраняет её в таблицу bookings и шлёт уведомление в Telegram.
import { createClient } from 'jsr:@supabase/supabase-js@2'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405)

  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return json({ ok: false, error: 'Некорректный запрос' }, 400)
  }

  const name = (data.name ?? '').trim().slice(0, 100)
  const phone = (data.phone ?? '').trim().slice(0, 30)
  const service = (data.service ?? '').trim().slice(0, 100)
  const master = (data.master ?? 'Любой мастер').trim().slice(0, 50)
  const date = (data.date ?? '').trim()
  const time = (data.time ?? '').trim()

  if (!name || !phone || !service || !date || !time) {
    return json({ ok: false, error: 'Заполнены не все поля' }, 400)
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{1,2}:\d{2}$/.test(time)) {
    return json({ ok: false, error: 'Неверный формат даты или времени' }, 400)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const { error: dbError } = await supabase
    .from('bookings')
    .insert({ name, phone, service, master, date, time })

  if (dbError) {
    console.error('db insert error:', dbError)
    return json({ ok: false, error: 'Не удалось сохранить заявку' }, 500)
  }

  // Уведомление в Telegram (если не дойдёт — заявка всё равно сохранена)
  const tgToken = Deno.env.get('TG_BOT_TOKEN')
  const tgChat = Deno.env.get('TG_CHAT_ID')
  if (tgToken && tgChat) {
    const [y, m, d] = date.split('-')
    const text = [
      '💈 Новая запись!',
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
      body: JSON.stringify({ chat_id: tgChat, text }),
    })
    if (!tgRes.ok) {
      console.error('telegram error:', await tgRes.text())
    }
  }

  return json({ ok: true })
})
