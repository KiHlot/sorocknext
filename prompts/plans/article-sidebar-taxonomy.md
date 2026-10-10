# Таксономии в сайдбаре поста

## Цель

На странице поста, у которого пост-тип имеет кастомную таксономию, в сайдбаре над блоком «Популярные теги» появляется карточка: заголовок таксономии и список всех её терминов. Каждый пункт — ссылка на архив термина и число опубликованных записей в нём. У `journal`, `quiz`, `rock-data` и `site-archive` карточки нет.

Макет — приложенный скрин: карточка, заголовок с короткой чертой, строки «название слева / число справа», разделители. Цвета и скругление — текущие токены сайта, не палитра скрина.

## Контракт данных

Роут тот же: `GET /post/{slug}?postType=`. Новое поле — сосед `postBase`, не внутри него.

```json
{
  "postBase": {},
  "taxonomyTerms": [{ "slug": "interview", "count": 12 }]
}
```

- `taxonomyTerms: null` — у пост-типа нет кастомной таксономии (`Site_Config::get_post_type_taxonomy`).
- Массив — все термины этой таксономии, включая `count: 0`. `count` — `WP_Term::$count` (опубликованные записи). Подписей и URL бэк не отдаёт.
- Слаги и подписи на фронте уже есть в `src/configs/taxonomies.config.ts` (`article_cat`, `music_cat`, `news_cat`, `video_cat`). Неизвестный слаг не рисуется. Порядок строк — порядок ключей в `CUSTOM_TAXONOMIES`, не порядок WordPress.
- Ссылка: `/${getArchiveSlug(postType)}/${slug}/1`. У статей это `/articles/{slug}/1`.
- Поле `postBase.taxonomies.taxonomies` не меняется: это термины текущего поста, не список таксономии.

## UI

Карточка — существующий `Block`. Заголовок — `h2`, текст `CUSTOM_TAXONOMIES[taxonomy].label` («Категории статей», «Форматы музыки», «Категории новостей», «Категории видео»). Цвет заголовка не `--accent` (так остаётся только «Популярные теги»): обычный цвет текста, начертание 600, размер около 16px, чтобы влезть в сайдбар 280px. Под заголовком короткая черта 2px на ~36px, цвет `rgba(var(--textColor), 0.35)`.

Список — `ul`. Строка целиком — `Link`: название слева, число справа (`--colorSecondary`), между строками `border-bottom` кроме последней (`--border`). Hover и focus-visible: название в `--accent`. У ссылки доступное имя включает подпись и число, например «Интервью, 12».

`null`, пустой массив или ни одного известного слага — блок не рендерится. Блок тегов остаётся. На `xl` сайдбар по-прежнему выезжает из шапки; виджет серверный, отдельного клиентского запроса нет.

## Файлы

- `D:\OSPanel635\home\st.sorockwp.local\public\wp-content\themes\sorockru\models\_post-model.php` — метод списка `{ slug, count } | null`.
- `D:\OSPanel635\home\st.sorockwp.local\public\wp-content\themes\sorockru\controllers\_post-controller.php` — ключ `taxonomyTerms` рядом с `postBase`.
- `D:\OSPanel635\home\sorocknext\src\types\post.ts` — `taxonomyTerms` в `PostIF`.
- `D:\OSPanel635\home\sorocknext\src\templates\PostTPL\PostTPL.types.ts` и `PostTPL.component.tsx` — проп `postType` со страницы, блок над тегами.
- `D:\OSPanel635\home\sorocknext\src\app\(site)\[postType]\[...slug]\page.tsx` — передать `postType` в `PostTPL`.
- `D:\OSPanel635\home\sorocknext\src\components\widgets\TaxonomyTermsWidget\` — компонент, типы, SCSS-модуль.
- `D:\OSPanel635\home\sorocknext\.cursor\rules\api-endpoints.mdc` и `D:\OSPanel635\home\sorocknext\prompts\pattern-back.md` — в описании `GET /post/{slug}` указать `taxonomyTerms`.
- `prompts/structure.txt` — `npm run prompt`, если появится новая папка виджета.

## Не делать

- Не ставить блок в сайдбары главной, архива, поиска и календаря.
- Не менять блок «Популярные теги», `TermLink` в карточках и шапке поста.
- Не отдавать с бэка подписи терминов и готовые URL.
- Не подсвечивать термин текущего поста: в макете все строки одинаковые.
