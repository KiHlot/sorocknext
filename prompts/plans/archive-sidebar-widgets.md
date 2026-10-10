# Сайдбар архива: теги и термины

## Цель

На архивных страницах пост-тайпов `news`, `article`, `music`, `video` в сайдбаре те же два блока, что на странице поста: виджет терминов кастомной таксономии, под ним «Популярные теги». У `journal`, `quiz`, `rock-data`, `site-archive`, архива тега и календаря сайдбар не меняется.

Какой блок рисовать, задают два отдельных флага в конфиге пост-тайпа. У четырёх типов оба включены.

## Контракт данных

Нового роута нет. В `GET /archive/archive` рядом с `postsData` и `paginationInfo` появляется то же поле, что у поста:

```json
{
  "postsData": [],
  "paginationInfo": { "currentPage": 1, "pagesCount": 1 },
  "taxonomyTerms": [{ "slug": "interview", "count": 12 }]
}
```

- `taxonomyTerms: null` — у пост-типа нет кастомной таксономии (`Site_Config::get_post_type_taxonomy`).
- Массив — все термины таксономии, включая `count: 0`. `count` — `WP_Term::$count`. Подписей и URL бэк не отдаёт.
- Сбор `{ slug, count }` общий для поста и архива: метод принимает post type, его вызывают `Post_Model::get_taxonomy_terms` и `Archive_Model::get_archive_data`. Форма `GET /post/{slug}` не меняется.
- Популярные теги по-прежнему из `baseData.popularTags` (`GET /site/common-data`). Отдельного поля в архиве нет.
- Фильтр `taxonomy` на список терминов сайдбара не влияет: это вся таксономия типа, как на посте.

Флаги вывода — только на фронте, в `D:\OSPanel635\home\sorocknext\src\configs\postTypes.config.ts`. Бэк их не читает: поле `taxonomyTerms` отдаётся всегда по правилу выше, флаги решают, рисовать ли блок.

```ts
popularTags: boolean
taxonomyTerms: boolean
```

`true` / `true` у `news`, `article`, `music`, `video`. У остальных пост-тайпов флагов нет, оба блока скрыты.

## UI

Сайдбар `ArchiveTPL`, если у `postType` включён флаг:

1. `taxonomyTerms` — `Block` и `TaxonomyTermsWidget`. Данные через уже существующий `getTaxonomySidebarTerms`: заголовок из `CUSTOM_TAXONOMIES`, порядок ключей конфига, ссылка `/${getArchiveSlug(postType)}/${slug}/1`, неизвестный слаг не рисуется. `null`, пустой массив или ни одного известного слага — блока нет.
2. `popularTags` — `Block`, `h2` «Популярные теги» (класс как в `PostTPL`: цвет `--accent`, отступ снизу 16px) и `PopularTagsWidget`. Кнопки, модалка и стили виджета не меняются.

Порядок как на посте: сначала термины, потом теги. Оба флага выключены — в сайдбаре остаётся текст `sidebar`.

Страницы: корень архива (`/news`, `/articles`, `/music`, `/video`) и архив термина (`/news/sport/1` и аналоги). Фильтр терминов в контенте остаётся.

## Файлы

- `D:\OSPanel635\home\st.sorockwp.local\public\wp-content\themes\sorockru\models\_post-model.php` — общий сбор терминов по post type.
- `D:\OSPanel635\home\st.sorockwp.local\public\wp-content\themes\sorockru\models\_archive-model.php` — ключ `taxonomyTerms` в `get_archive_data`.
- `D:\OSPanel635\home\sorocknext\src\configs\postTypes.config.ts` — два флага на `news`, `article`, `music`, `video`.
- `D:\OSPanel635\home\sorocknext\src\api\archive\types.ts` — `taxonomyTerms` в `FetchArchiveIF`.
- `D:\OSPanel635\home\sorocknext\src\templates\ArchiveTPL\ArchiveTPL.types.ts` и `ArchiveTPL.component.tsx` — проп и сайдбар по флагам.
- `D:\OSPanel635\home\sorocknext\src\templates\ArchiveTPL\ArchiveTPL.module.scss` — заголовок «Популярные теги».
- `D:\OSPanel635\home\sorocknext\src\app\(site)\[postType]\page.tsx` и `[postType]\[...slug]\page.tsx` — передать `taxonomyTerms` в `ArchiveTPL`.
- `D:\OSPanel635\home\sorocknext\.cursor\rules\api-endpoints.mdc`, `prompts\pattern-back.md`, фрагмент архива в `prompts\pattern-front.md` — поле `taxonomyTerms` у `GET /archive/archive`.

## Не делать

- Не ставить блоки в сайдбары поста, главной, поиска, календаря и архива тега.
- Не убирать фильтр терминов из контента архива.
- Не менять виджеты, модалку тегов и стили кнопок.
- Не отдавать с бэка подписи терминов, URL и флаги сайдбара.
