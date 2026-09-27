# Календарь в промо архива рок-дат

## Цель

На архиве `/rock-data` правая колонка промо-блока — календарь текущего года по образцу скрина: слайдер месяцев, сетка дней, полоски числа событий. Клик по дню открывает список в `ModalSheet`. На остальных архивах галерея промо остаётся как сейчас.

## Контракт данных

Живой запрос не подключаем. События — мок в `ArchivePromoCalendar.mock.ts`, значение — `PostShortCardModelIF` из `D:\OSPanel635\home\sorocknext\src\components\cards\PostShortCard\PostShortCard.types.ts`.

Ключ — ежегодная дата `MM-DD` (`TIME_FORMATS.MonthDay`), без года. В моке есть дни с 1–5 событиями, день с 6 и больше, и запись на `02-29`.

Год сетки — текущий (`dayjs().year()`). В невисокосном году февраль — 28 клеток; события `02-29` считаются и показываются вместе с 28 февраля. В високосном `02-29` — отдельный день.

`GET /archive/calendar` и `EventCard` не используем: у главной другой список и другая карточка.

## UI

Календарь стоит в колонке галереи (`styles.archivePromoGallery`): ширина 56% / 100% на `xxl` уже задана в `ArchivePromoSection.module.scss`.

Месяцы — существующий `MonthsSlider` с главной (swiper, стрелки, подписи). Смена месяца как на главной: текущий месяц — сегодняшний день, другой — 1-е число. Модалка при смене месяца не открывается. Год не переключается.

Сетка дней — flex-wrap, семь колонок равной ширины, без CSS Grid. Неделя с понедельника (`dayjs` locale `ru`). Шапка — короткие имена дней. Хвосты соседних месяцев видны приглушёнными и не кликаются: месяц меняется только слайдером.

Клетка текущего месяца — `button`. По умолчанию выбран сегодня и текущий месяц, модалка закрыта. Выбранный день — обводка `var(--white)`.

Отметки числа событий под числом:

- 0 — без отметок;
- 1–5 — столько горизонтальных полосок, цвета по кругу из токенов `--colorPrimary`, `--accent`, `--textColor`, `--colorSecondary`, `--correct`;
- больше 5 — один квадрат `var(--accent)` вместо полосок.

Клик по дню выбирает его и открывает `ModalSheet` с `bottomSheetMobile`: на мобилке нижний лист, на десктопе модалка. Заголовок — дата выбранного дня. В теле — `PostShortCard` на каждое событие этого дня (для 28 февраля невисокосного года — вместе с событиями 29-го). Пустой день — текст «В этот день событий нет».

Доступность: у дня `aria-pressed` и подпись с датой и числом событий; у модалки заголовок для `aria-labelledby` уже внутри `ModalSheet`. `h1` страницы остаётся в интро промо.

Секция на `/rock-data` рендерится и без `seoData` / `archivePromoData`, чтобы календарь был на странице всегда. Интро при отсутствии SEO показывает `title`.

## Файлы

Создать:

- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.component.tsx`
- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.types.ts`
- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.module.scss`
- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.config.ts`
- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.helpers.ts`
- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoCalendar\ArchivePromoCalendar.mock.ts`

Изменить:

- `D:\OSPanel635\home\sorocknext\src\components\sections\ArchivePromoSection\ArchivePromoSection.component.tsx` — для `pathname === '/rock-data'` календарь вместо галереи
- `D:\OSPanel635\home\sorocknext\src\templates\ArchiveTPL\ArchiveTPL.component.tsx` — промо-секция на `/rock-data` даже без SEO и промо-постов
- `D:\OSPanel635\home\sorocknext\src\configs\magicNumbers.config.ts` — порог полосок (5), дней в неделе (7), сдвиг понедельника

## Не делать

- Запрос к бэку и правки `api-endpoints` / `pattern-front` / `pattern-back`.
- Слайдер дней с главной и список событий под календарём.
- Сетку через `display: grid`.
- Календарь на архивах кроме `/rock-data`.
- Смену года и клик по дням соседних месяцев.
