-- Один мастер не может быть занят дважды в один слот
-- («Любой мастер» не индексируем — там ёмкость считает функция)
create unique index if not exists bookings_slot_uniq
  on public.bookings (master, date, time)
  where status <> 'cancelled' and master <> 'Любой мастер';
