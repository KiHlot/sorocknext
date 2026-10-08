# Ссылка на термин пост-тайпа

## Цель

Круглая ссылка рядом с `CategoryLink`: тот же размер и тень, другой цвет, своя иконка на каждый дефолтный термин `article` / `music` / `news` / `video`. Ведёт на архив термина `/{postType}/{termSlug}`.

## Контракт данных

Термины уже есть в `src/configs/taxonomies.config.ts` (`CUSTOM_TAXONOMIES`, `getTermLabel`). Новых полей бэка нет.

URL: `/{postType}/{slug}`, как у рубрик в `src/configs/siteCategories/siteCategories.config.tsx` (`/article/interview`, `/music/album`, `/video/clip`).

Неизвестный слаг или пост-тайп без кастомной таксономии (`journal`, `quiz`, `rock-data`, `site-archive`, `stars`) — компонент ничего не рендерит.

## UI

Как `CategoryLink`: круг, `box-shadow`, режимы `simple` (иконка) и `text` (подпись), размеры `default` 24px и `large` 36px.

Цвет: фон `var(--colorPrimary)`, иконка белая. У `CategoryLink` остаётся белый фон и `var(--accent)`.

`title` — подпись термина (`Интервью`, `Альбом`, …).

Иконки из `react-icons/io5`, outline:

| Пост-тайп | Термин | Подпись | Иконка |
|---|---|---|---|
| article | interview | Интервью | IoMicOutline |
| article | review | Рецензия | IoCreateOutline |
| article | sport | Спорт | IoAmericanFootballOutline |
| article | game | Игра | IoGameControllerOutline |
| article | fact | Факты | IoBulbOutline |
| article | entertaining | Занимательное | IoHappyOutline |
| article | event | Событие | IoCalendarOutline |
| article | advertising | Реклама | IoMegaphoneOutline |
| music | album | Альбом | IoDiscOutline |
| music | single | Сингл | IoMusicalNoteOutline |
| music | ep | EP | IoAlbumsOutline |
| music | playlist | Сборник | IoListOutline |
| music | live | Лайв | IoRadioOutline |
| news | society | Общество | IoPeopleOutline |
| news | sport | Спорт | IoAmericanFootballOutline |
| news | celebrities | Знаменитости | IoStarOutline |
| news | interesting | Интересное | IoFlashOutline |
| news | advertisement | Анонс | IoMegaphoneOutline |
| video | clip | Клип | IoPlayCircleOutline |
| video | concert | Концерт | IoTicketOutline |
| video | live | Лайв | IoRadioOutline |
| video | film | Фильм | IoFilmOutline |
| video | cool | Cool | IoFlameOutline |

## Файлы

- `src/configs/postTypeTerms/postTypeTerms.types.ts` — тип конфига термина (подпись, url, иконка).
- `src/configs/postTypeTerms/postTypeTerms.config.tsx` — карта `postType → slug → иконка и ссылка`. Подписи берутся из `CUSTOM_TAXONOMIES`.
- `src/components/elems/TermLink/TermLink.types.ts`
- `src/components/elems/TermLink/TermLink.component.tsx`
- `src/components/elems/TermLink/TermLink.module.scss`

Пропсы: `postType`, `termSlug`, `linkType` (`simple` | `text`), `size` (`default` | `large`), `className`.

Существующие вставки `CategoryLink` не трогать.

## Не делать

- Не подключать `TermLink` в карточки и промо, пока не попросят.
- Не менять `CategoryLink` и `SITE_CATEGORIES`.
- Не править `prompts/pattern-front.md` и `prompts/pattern-back.md`.
