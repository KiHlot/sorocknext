# Фильтр архива по термину

## Цель

Архив пост-типа фильтруется одним термином кастомной таксономии. Адрес на сайте — `/{postType}/{term}/{page}` (`/article/entertaining/2`). В REST уходит `taxonomy` = slug термина. Список и `pagesCount` берутся из ответа `GET /archive/archive`. Смена термина открывает `/{postType}/{term}/1`.

`/{postType}` — архив без фильтра, пагинация `?page=`. Query `?taxonomy=` редиректит на путь термина.

## Контракт данных

`GET /archive/archive`

| Параметр | Обязательность | Смысл |
| --- | --- | --- |
| `postType` | да | slug пост-типа |
| `taxonomy` | нет | slug термина (`clip`, `live`), не имя таксономии (`video_cat`) |
| `page` | нет | номер страницы с 1 |

В query запроса `taxonomy` добавляется только если строка задана. Один термин. Имя таксономии бэк выводит из `postType`.

Ответ без смены формы: `postsData` и `paginationInfo.currentPage` / `paginationInfo.pagesCount`. `pagesCount` — только из этого ответа, для текущего фильтра.

Краевые случаи бэка: нет `postType`, неизвестный slug, пустой список — `postsData: null`, `pagesCount: 1`, не 404. У типа без таксономии параметр игнорируется. `page > pagesCount` — последняя страница, `currentPage` уже поправлен. `result: 'redirect'` — редирект на `redirectUrl`.

Список терминов на фронте статический, из `src/configs/taxonomies.config.ts` (`CUSTOM_TAXONOMIES`). Отдельной ручки списка терминов нет.

Типы не дублировать. Расширить существующие:

- `FetchArchiveParamsIF` в `src/api/archive/types.ts`: `taxonomy?: string`. `page` остаётся числом, которое страница уже посчитала.
- `FetchArchiveIF` и `PaginationInfoIF` в `src/types/common.ts` уже совпадают с контрактом.

`archiveApi` в `src/api/archive/archive.ts` кэширует только календарь. `getArchive` нет, `serializeQueryArgs` не нужен. `fetchArchive` ходит через серверный `fetchApi` с `no-cache`.

## UI

Фильтр только на странице `/{postType}`, над списком карточек, под заголовком или промо.

Ряд ссылок, без Redux и без клиентского состояния:

- «Все» — `/{postType}`. Активна на архиве типа.
- Дальше термины из `CUSTOM_TAXONOMIES`. Ссылка `/{postType}/{slug}/1`.
- Активный термин — сегмент пути.
- У `journal`, `quiz`, `rock-data`, `site-archive`, `stars` ряда нет.
- Неизвестный slug в query не подсвечивает пункт и не даёт 404: запрос уходит как есть, список пустой по ответу бэка.

Один `h1` страницы не меняется. Ряд — `nav`, у активной ссылки `aria-current="page"`.

Пагинация архива типа — `/{postType}?page=N`. Пагинация термина — `/{postType}/{term}/{page}`. Фильтр есть на обеих страницах. В `fetchArchive` с пути термина уходит `taxonomy` = slug термина.

Номер страницы на экране — `paginationInfo.currentPage`. Если в query есть `page` и он не равен `currentPage`, URL приводится к `currentPage`, остальные query-ключи (включая `taxonomy`) сохраняются. `result: 'redirect'` с `redirectUrl` — `redirect()` из `next/navigation`. Сейчас `fetchApi` при не-`ok` возвращает `null` и теряет `redirectUrl`; для архива ответ нужно разобрать целиком, не меняя общий `fetchApi` для остальных ручек.

`generateStaticParams` не трогать: query `taxonomy` в SSG не входит. Страницы по-прежнему `postType` и сегменты `slug`.

## Файлы

- `src/api/archive/types.ts` — `taxonomy?: string` в `FetchArchiveParamsIF`.
- `src/api/archive/endpoints.ts` — `taxonomy` в `URLSearchParams` только если задан; разбор `result: 'redirect'`.
- `src/helpers/archive/archive.helpers.ts` — синхронизация query `page` с `currentPage` из ответа.
- `src/app/(site)/[postType]/page.tsx` — чтение `searchParams.taxonomy`, передача в `fetchArchive` и в шаблон.
- `src/app/(site)/[postType]/[...slug]/page.tsx` — для `kind: 'term'` передать slug в `taxonomy`.
- `src/templates/ArchiveTPL/ArchiveTPL.types.ts` и `ArchiveTPL.component.tsx` — проп фильтра.
- `src/components/interactive/ArchiveTermFilter/` — ряд ссылок и стили.
- `.cursor/rules/backend-reference.mdc` — убрать фразу, что архив фильтруется только по `postType`.
- `prompts/pattern-front.md`, `prompts/pattern-back.md` — после кода, скилл `update-client-patterns`: сигнатура `fetchArchive` и то, что список термина больше не без фильтра.

## Не делать

- Не передавать `video_cat` и другие имена таксономий.
- Не передавать несколько терминов.
- Не кэшировать `pagesCount` между разными `taxonomy`.
- Не заводить отдельные эндпоинты на термин.
- Не менять URL `TermLink` и путь `/{postType}/{term}/{page}`.
- Не добавлять `taxonomy` в `generateStaticParams`.
- Не класть фильтр в Redux.
