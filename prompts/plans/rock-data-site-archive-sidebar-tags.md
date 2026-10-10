# Теги в сайдбаре рок-дат и архива

## Цель

На страницах `/rock-data` и `/site-archive` в сайдбаре тот же блок «Популярные теги», что уже стоит на архивах новостей, статей, музыки и видео. Журнал, тесты, архив тега, календарь, главная и поиск не меняются.

## Контракт данных

Новых эндпоинтов и полей нет.

- Список: `baseData.popularTags` из `siteApi.useGetCommonDataQuery()` (`D:\OSPanel635\home\sorocknext\src\api\site\types.ts`).
- Посты по тегу: `taxonomyApi.useLazySearchPostsByTagQuery()` — `GET /search-posts-by-tag?tagId=`.
- Виджет по-прежнему режет список до `POPULAR_TAGS_SLICE_COUNT` и перемешивает его.

Флаги сайдбара — в `D:\OSPanel635\home\sorocknext\src\configs\postTypes.config.ts`. Сейчас `popularTags: true` только у `news`, `article`, `music`, `video`. У `rock-data` и `site-archive` флагов нет, оба блока скрыты, в сайдбаре текст `sidebar`.

Включить только `popularTags: true`. `taxonomyTerms` оставить `false`: кастомных таксономий у этих типов нет (`CUSTOM_TAXONOMIES` в `D:\OSPanel635\home\sorocknext\src\configs\taxonomies.config.ts`).

## UI

Разметка уже в `ArchiveTPL`: при `popularTags` рисуется `Block`, заголовок `h2` «Популярные теги» (класс `tagsTitle`: цвет `--accent`, отступ снизу 16px) и `PopularTagsWidget`. Кнопки, модалка и стили виджета не меняются.

Флаг читается и на корне (`/rock-data`, `/site-archive`), и на вложенных страницах того же шаблона (`[postType]/[...slug]`). Плейсхолдер `sidebar` на этих типах пропадает. Виджет терминов не появляется.

## Файлы

- `D:\OSPanel635\home\sorocknext\src\configs\postTypes.config.ts` — `popularTags: true` у `rock-data` и `site-archive`.

## Не делать

- Не включать теги у `journal`, `quiz`, архива тега, календаря, главной и поиска.
- Не включать виджет терминов у рок-дат и архива.
- Не менять `ArchiveTPL`, виджет, модалку и стили кнопок.
- Не обновлять `prompts/pattern-front.md` и `prompts/pattern-back.md`: контракт API не меняется.
