// Edge Function «tg-webhook»: принимает нажатия кнопок из Telegram
// («Подтвердить» / «Отменить» под уведомлением о записи) и меняет статус в базе.
// Отменённая запись освобождает слот на сайте.
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('ok')

  // Запросы принимаем только от Telegram (секрет задаётся в setWebhook)
  const secret = Deno.env.get('TG_WEBHOOK_SECRET')
  if (secret && req.headers.get('x-telegram-bot-api-secret-token') !== secret) {
    return new Response('forbidden', { status: 403 })
  }

  const update = await req.json().catch(() => null)
  const cb = update?.callback_query
  if (!cb) return new Response('ok')

  const token = Deno.env.get('TG_BOT_TOKEN')!
  const api = (method: string, body: unknown) =>
    fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  const answer = (text: string) =>
    api('answerCallbackQuery', { callback_query_id: cb.id, text })

  // Кнопки работают только для владельца
  const owner = Deno.env.get('TG_CHAT_ID')
  if (owner && String(cb.from?.id) !== owner) {
    await answer('Нет доступа')
    return new Response('ok')
  }

  const match = /^(confirm|cancel):(\d+)$/.exec(cb.data ?? '')
  if (!match) {
    await answer('Неизвестная команда')
    return new Response('ok')
  }
  const [, action, id] = match
  const status = action === 'confirm' ? 'confirmed' : 'cancelled'

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', Number(id))

  if (error) {
    console.error('status update error:', error)
    await answer('Ошибка, попробуйте ещё раз')
    return new Response('ok')
  }

  const mark = action === 'confirm' ? '✅ Подтверждена' : '❌ Отменена, слот свободен'
  await answer(mark)

  // Дописываем статус в исходное сообщение
  if (cb.message) {
    await api('editMessageText', {
      chat_id: cb.message.chat.id,
      message_id: cb.message.message_id,
      text: `${cb.message.text}\n\n${mark}`,
      reply_markup:
        action === 'confirm'
          ? { inline_keyboard: [[{ text: '❌ Отменить', callback_data: `cancel:${id}` }]] }
          : undefined,
    })
  }

  return new Response('ok')
})
