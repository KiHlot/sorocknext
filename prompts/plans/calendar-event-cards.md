# Данные карточек рок-дат

## Цель

Карточки выбранного дня берутся с бэка, а не из мока.

При открытии главной список — `calendarDefaultData` из `GET /page/home-page-data` (день «сегодня», слайдер как сейчас). При смене месяца или дня клиент запрашивает `GET /archive/calendar?month=1&day=23`: `month` — 1–12, `day` — число месяца. Ответ `data` — тот же массив, что и `calendarDefaultData`: `EventCardModelIF[] | null`.

Пустой день (`null` или `[]`) — текст «В этот день событий нет». Пока идёт запрос нового дня, пустое состояние не показываем.

Живой `GET /page/home-page-data` поля `calendarDefaultData` ещё не отдаёт, `GET /archive/calendar` отвечает 404. Фронт всё равно вызывает эти контракты.

## Контракт данных

`src/api/page/types.ts`:

```ts
export interface HomePageDataIF {
    lastNewsPromoData?: LastNewsPromoDataIF[] | null;
    calendarDefaultData?: EventCardModelIF[] | null;
}
```

`src/components/cards/EventCard/EventCard.types.ts` — модель отдельно от пропсов, как у `PostArchiveCard` / `PostShortCard`. Поля названы как у архивной карточки, только те, что рисует `EventCard`:

```ts
export interface EventCardModelIF {
    titleH1: string;
    content: string;
    author: AuthorIF;
    url: string;
    coverImg: string | null;
    tags: string[] | null;
    country: string;
}

export interface EventCardPropsIF {
    data?: EventCardModelIF[] | null;
    className?: string;
}
```

`author.fullName` — имя, `coverImg` — фон, `content` — отрывок (HTML снимается, как у архивной карточки), `tags` — чипы. `className` на каждую карточку списка.

Клиентский запрос — RTK Query в `src/api/archive/archive.ts`, база `/archive`, query `month` и `day`. Слайс регистрируется в `src/store/store.ts`. Серверный `fetchApi` для смены дня не используем: секция уже `'use client'`.

Роут добавить в `.cursor/rules/api-endpoints.mdc`.

## Контракт для бэкенда

Оба роута публичные, без JWT. Ответ — обычный конверт `Api_Helper::response()`: при успехе `result: "ok"`, полезное тело в `data`.

Год в запрос не передаётся. Это ежегодная дата: месяц и день, посты за любые годы.

### `GET /page/home-page-data`

В `data` рядом с `lastNewsPromoData` добавить `calendarDefaultData` — события **сегодняшнего** дня по часовому поясу сайта. Тот же массив, что отдаёт календарь на этот месяц и день. Постов нет — `null`.

```json
{
    "lastNewsPromoData": [],
    "calendarDefaultData": []
}
```

### `GET /archive/calendar?month=1&day=23`

Query:

| Параметр | Значение |
| --- | --- |
| `month` | 1–12, январь — `1` |
| `day` | 1–31 |

`data` — массив карточек или `null`. Не оборачивать в `postsData`.

Небывалая дата (`31` апреля, `30` февраля) — `data: null`. `29` февраля допустим.

Фронт в невисокосном году февраль рисует на 28 дней и `day=29` не запрашивает. События 29 февраля в такой год нужно отдать вместе с ответом `month=2&day=28`.

### Элемент массива

```json
{
    "titleH1": "Pink Floyd — «The Dark Side of the Moon»",
    "content": "<p>HTML контента поста</p>",
    "author": {
        "img80": null,
        "fullName": "Игорь Лебедев",
        "url": "/users/4"
    },
    "url": "/news/slug",
    "coverImg": "https://st.sorockwp.local/wp-content/uploads/....jpg",
    "tags": ["Pink Floyd", "альбом"],
    "country": "gb"
}
```

| Поле | Смысл |
| --- | --- |
| `titleH1` | Заголовок |
| `content` | HTML поста. Фронт сам делает отрывок без тегов |
| `author` | Как в `lastNewsPromoData`: `fullName`, опциональные `img80` и `url` |
| `url` | Путь записи для «Читать» и копирования ссылки |
| `coverImg` | URL обложки, тот же размер, что `coverImg` у архивной карточки. Нет обложки — `null` |
| `tags` | Имена тегов строками, без решётки. Нет тегов — `null` |
| `country` | Код страны, как у остальных карточек (`gb`, `ru`) |

Сортировка — от новых записей к старым.

## Что сделать на бэке

Сейчас `GET /page/home-page-data` поля `calendarDefaultData` не отдаёт, `GET /archive/calendar` отвечает 404.

1. В `Archive_Controller` зарегистрировать публичный роут `/archive/calendar`.
2. Прочитать `month` и `day`. Вне диапазона или небывалая дата — `data: null`.
3. Выбрать опубликованные записи, у которых месяц и день даты публикации совпадают с query, без фильтра по году.
4. Собрать массив полей из таблицы выше. Пустая выборка — `data: null`, не `[]` обязательно, фронт понимает оба варианта.
5. В невисокосном году к выборке 28 февраля добавить записи 29 февраля.
6. В `get_home_page_data` положить в `calendarDefaultData` результат того же сборщика на сегодняшний месяц и день.

## UI

Внешний вид карточки, слайдеры месяцев и дней, стрелки и fade не меняются.

`EventCard` сам рисует список из `data`. Секция передаёт массив и не мапит карточки.

Мок событий и перенос 29 февраля на фронте убираем: какие посты в дне, решает бэк. Слайдер дней по-прежнему строит `dayjs`. У каждого дня показывается число; приглушение «нет событий» по моку снимается. Пустой ответ — только у выбранного дня под слайдером.

Смена месяца выбирает день так: текущий месяц — сегодня, другой месяц — 1-е число. Один запрос на итоговые `month` и `day`. Повторный выбор уже активного месяца или дня запрос не шлёт.

Первый кадр — `calendarDefaultData`, без запроса календаря. Запрос уходит, когда выбранная дата отличается от сегодняшней.

## Файлы

Изменить:

- `D:\OSPanel635\home\sorocknext\src\components\cards\EventCard\EventCard.types.ts`
- `D:\OSPanel635\home\sorocknext\src\components\cards\EventCard\EventCard.component.tsx`
- `D:\OSPanel635\home\sorocknext\src\api\page\types.ts`
- `D:\OSPanel635\home\sorocknext\src\templates\HomePageTPL\HomePageTPL.component.tsx`
- `D:\OSPanel635\home\sorocknext\src\components\sections\RockDatesSection\RockDatesSection.component.tsx`
- `D:\OSPanel635\home\sorocknext\src\components\sections\RockDatesSection\RockDatesSection.types.ts`
- `D:\OSPanel635\home\sorocknext\src\components\sections\RockDatesSection\RockDatesSection.helpers.ts`
- `D:\OSPanel635\home\sorocknext\src\store\store.ts`
- `D:\OSPanel635\home\sorocknext\.cursor\rules\api-endpoints.mdc`
- `D:\OSPanel635\home\sorocknext\prompts\pattern-front.md`
- `D:\OSPanel635\home\sorocknext\prompts\pattern-back.md`

Создать:

- `D:\OSPanel635\home\sorocknext\src\api\archive\archive.ts`

Удалить, если после отвязки мока не останется импортов:

- `D:\OSPanel635\home\sorocknext\src\components\sections\RockDatesSection\RockDatesSection.mock.ts`

`src/app/(site)/page.tsx` не менять: он уже отдаёт весь `HomePageDataIF` в шаблон.

## Не делать

- Новый визуал карточки, кнопки «Нравится» и «В закладки».
- Запрос календаря на первый рендер сегодняшнего дня.
- Подсветку дней месяца, в которых есть события: бэк отдаёт один день.
- Выдуманные поля сверх списка выше.
