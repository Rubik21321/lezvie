// Цели для систем статистики: MyTracker (ЛР5) и Яндекс.Метрика (если счётчик подключён).
// ID — тот же, что в коде счётчика Top.Mail.Ru в partials/counters.html
const TMR_ID = '3807159'

export function reachGoal(goal, params) {
  const tmr = window._tmr || (window._tmr = [])
  tmr.push({ id: TMR_ID, type: 'reachGoal', goal, ...(params && { params }) })

  if (typeof window.ym === 'function' && window.YM_ID) {
    window.ym(window.YM_ID, 'reachGoal', goal, params)
  }
}

// Клики по телефону, Telegram и «Записаться к мастеру» ловим одним обработчиком —
// такие ссылки есть на нескольких страницах и в разных компонентах
export function trackLinkGoals() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]')
    if (!link) return
    const href = link.getAttribute('href')

    if (href.startsWith('tel:')) {
      reachGoal('phone_click')
    } else if (href.includes('t.me/')) {
      reachGoal('telegram_click')
    } else if (href.includes('zapis.html?master=')) {
      const master = new URL(link.href).searchParams.get('master')
      reachGoal('master_booking', { master })
    }
  })
}
