# Секция ТОП-альбомов на главной

## Цель

На главной, в колонке `Content` после `LastNewsPromoSection`, показать секцию топов альбомов. Несколько топов переключаются вкладками. У активного топа слева плеер выбранного альбома (iframe Яндекс Музыки / виджет ВК), справа мозаика из 10 обложек с номером места. Клик по обложке переключает плеер на этот альбом.

## Контракт данных

Запрос уже есть: `/page/home-page-data` (`src/api/page/endpoints.ts`). Новых эндпоинтов нет. Бэк должен отдать ключ `topAlbumsListData` (сейчас в `src/api/page/types.ts` он `any[] | null`).

Предлагаемая форма (согласовать с бэком, имена полей в стиле уже существующих `MusicIF` / `AlbumInfoIF`):

```ts
export interface TopAlbumIF {
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

export interface TopAlbumsListIF {
    title: string;             // общий заголовок топа, h2 секции
    tabTitle: string;          // короткое имя для таб-кнопки
    albums: TopAlbumIF[];      // до 10, по порядку мест
}
```

`topAlbumsListData?: TopAlbumsListIF[] | null`.

- `null` или пустой массив — секцию не рендерить.
- Топ без альбомов — вкладку не показывать.
- Альбом без `musicCode` — карточка всё равно переключает выбор. `url` рецензии карточку ссылкой не делает.
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
- Карточка: картинка через `Img`, снизу градиент, номер места (без обводки), «Название, год» и исполнители. Флаг страны в углу, если есть `country` (как у постов, через `Country`). Активный (играющий) альбом подсвечен рамкой.
- Карточка — `button` (`aria-pressed` для активной) и только переключает плеер. Ссылка на рецензию по клику на карточку не ведёт.
- Табы — `role="tablist"` / `role="tab"` / `aria-selected`, панель — `role="tabpanel"`.

От `xxl` (1500px) и ниже: одна колонка, сначала мозаика в той же сетке, под ней плеер на всю ширину.
Мобильный (`md`): мозаика в 2 колонки, под ней плеер, все карточки квадратные, места 1–3 на всю ширину не растягиваем.

## Файлы

Создать:

- `src/components/sections/TopAlbumsSection/TopAlbumsSection.types.ts` — `TopAlbumIF`, `TopAlbumsListIF`, пропсы секции
- `src/components/sections/TopAlbumsSection/TopAlbumsSection.component.tsx` — клиентская секция: состояние активной вкладки и альбома, `Section` с заголовком
- `src/components/sections/TopAlbumsSection/TopAlbumsSection.config.ts` — лимит 10, подписи (aria)
- `src/components/sections/TopAlbumsSection/TopAlbumsSection.module.scss` — шапка, две колонки, адаптив
- `src/components/sections/TopAlbumsSection/TopAlbumsTabs/*` — ряд таб-кнопок (Swiper + `SliderArrow`)
- `src/components/sections/TopAlbumsSection/TopAlbumsPlayer/*` — плеер по `musicCode`
- `src/components/sections/TopAlbumsSection/TopAlbumsGrid/*` — мозаика с `grid-template-areas` по местам
- `src/components/cards/TopAlbumCard/*` — карточка альбома

Изменить:

- `src/api/page/types.ts` — `topAlbumsListData?: TopAlbumsListIF[] | null` вместо `any[]`
- `src/templates/HomePageTPL/HomePageTPL.component.tsx` — рендер секции после `LastNewsPromoSection` при непустых данных
- `src/components/sections/PostMusicSection/PostMusicSection.helpers.ts` — `mountMusicEmbed` переиспользовать; если импорт из чужой секции выглядит плохо — вынести в `src/helpers` и поправить импорт в `PostMusicSection`
- `prompts/pattern-back.md` — описать новый ключ `topAlbumsListData` в ответе `/page/home-page-data` (скилл `update-client-patterns`)

## Не делать

- Иконки стриминговых сервисов и «лайк» на карточках (на скрине есть — нужен отдельный контракт ссылок).
- Кнопки play / лайк / поделиться над плеером.
- Новые запросы, RTK Query: всё приходит в SSR-данных главной.
- Автопереключение альбомов и вкладок.
