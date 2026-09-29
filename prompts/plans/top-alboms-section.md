# Секция ТОП-альбомов на главной

## Цель

На главной, в колонке `Content` после `LastNewsPromoSection`, показать секцию топов альбомов. Несколько топов переключаются вкладками. У активного топа слева плеер выбранного альбома (iframe Яндекс Музыки / виджет ВК), справа мозаика из 10 обложек с номером места. Клик по обложке переключает плеер на этот альбом.

## Контракт данных

Запрос уже есть: `/page/home-page-data` (`src/api/page/endpoints.ts`). Новых эндпоинтов нет. Бэк должен отдать ключ `topAlbomsListData` (сейчас в `src/api/page/types.ts` он `any[] | null`).

Предлагаемая форма (согласовать с бэком, имена полей в стиле уже существующих `MusicIF` / `AlbomInfoIF`):

```ts
export interface TopAlbomIF {
    position: number;          // место в топе, 1..10
    musicCode: string;         // готовый HTML iframe/виджета, как в MusicIF
    title: string;             // название альбома
    artists: string[] | null;
    year: number | null;
    country: string | null;    // код страны для флага, как у постов
    coverImg: string;          // квадратная обложка
    innerImg: string | null;   // горизонтальное фото для широких ячеек
    url: string | null;        // ссылка на рецензию на сайте, если есть
}

export interface TopAlbomsListIF {
    title: string;             // общий заголовок топа, h2 секции
    tabTitle: string;          // короткое имя для таб-кнопки
    alboms: TopAlbomIF[];      // до 10, по порядку мест
}
```

`topAlbomsListData?: TopAlbomsListIF[] | null`.

- `null` или пустой массив — секцию не рендерить.
- Топ без альбомов — вкладку не показывать.
- Альбом без `musicCode` — карточка есть, но не кликабельна для плеера (если есть `url` — ведёт на рецензию).
- Больше 10 альбомов — выводим первые 10.

## UI

Раскладка десктопа (как на скрине):

- Шапка: заголовок `h2` = `title` активного топа, справа ряд таб-кнопок (`tabTitle`), активная подчёркнута акцентным цветом. Если вкладки не помещаются — горизонтальный скролл Swiper со стрелками `SliderArrow` (как в `RockDatesSection`). Одна вкладка — ряд табов не показываем.
- Тело: две колонки.
  - Слева плеер фиксированной высоты 400px (тот же приём, что в `PostMusicSection`: `mountMusicEmbed`, растянуть iframe, поднять скрипты ВК). По умолчанию играет альбом №1 активного топа. При смене вкладки — сброс на №1 нового топа.
  - Справа мозаика на CSS Grid, 6 колонок:
    - ряд 1: места 1, 2, 3 — большие квадраты по 2 колонки;
    - ряды 2–3: место 4 — вертикальная, 1 колонка на 2 ряда; 5 — широкая, 2 колонки; 6 — 1 колонка; 7 — 1 колонка; 8 — широкая, 2 колонки; 9 и 10 — вертикальные на 2 ряда.
    - Широкие ячейки (5, 8) берут `innerImg`, если нет — `coverImg`. Остальные — `coverImg`, `object-fit: cover`.
- Карточка: картинка через `Img`, снизу градиент, круг с номером места, «Название, год» и исполнители. Флаг страны в углу, если есть `country` (как у постов, через `Country`). Активный (играющий) альбом подсвечен рамкой.
- Карточка — `button` (`aria-pressed` для активной), если есть `musicCode`; иначе ссылка на `url` или просто блок.
- Табы — `role="tablist"` / `role="tab"` / `aria-selected`, панель — `role="tabpanel"`.

Планшет: плеер сверху на всю ширину, мозаика под ним в той же сетке.
Мобильный: плеер сверху, мозаика в 2 колонки, все карточки квадратные, места 1–3 на всю ширину не растягиваем.

## Файлы

Создать:

- `src/components/sections/TopAlbomsSection/TopAlbomsSection.types.ts` — `TopAlbomIF`, `TopAlbomsListIF`, пропсы секции
- `src/components/sections/TopAlbomsSection/TopAlbomsSection.component.tsx` — клиентская секция: состояние активной вкладки и альбома, `Section` с заголовком
- `src/components/sections/TopAlbomsSection/TopAlbomsSection.config.ts` — лимит 10, подписи (aria)
- `src/components/sections/TopAlbomsSection/TopAlbomsSection.module.scss` — шапка, две колонки, адаптив
- `src/components/sections/TopAlbomsSection/TopAlbomsTabs/*` — ряд таб-кнопок (Swiper + `SliderArrow`)
- `src/components/sections/TopAlbomsSection/TopAlbomsPlayer/*` — плеер по `musicCode`
- `src/components/sections/TopAlbomsSection/TopAlbomsGrid/*` — мозаика с `grid-template-areas` по местам
- `src/components/cards/TopAlbomCard/*` — карточка альбома

Изменить:

- `src/api/page/types.ts` — `topAlbomsListData?: TopAlbomsListIF[] | null` вместо `any[]`
- `src/templates/HomePageTPL/HomePageTPL.component.tsx` — рендер секции после `LastNewsPromoSection` при непустых данных
- `src/components/sections/PostMusicSection/PostMusicSection.helpers.ts` — `mountMusicEmbed` переиспользовать; если импорт из чужой секции выглядит плохо — вынести в `src/helpers` и поправить импорт в `PostMusicSection`
- `prompts/pattern-back.md` — описать новый ключ `topAlbomsListData` в ответе `/page/home-page-data` (скилл `update-client-patterns`)

## Не делать

- Иконки стриминговых сервисов и «лайк» на карточках (на скрине есть — нужен отдельный контракт ссылок).
- Кнопки play / лайк / поделиться над плеером.
- Новые запросы, RTK Query: всё приходит в SSR-данных главной.
- Автопереключение альбомов и вкладок.
