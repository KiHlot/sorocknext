# Ссылки терминов вместо категорий

## Цель

На карточках и в шапке поста вместо кружков `CategoryLink` показываются термины кастомной таксономии через `TermLink`: иконка и переход на `/{archiveSlug}/{termSlug}`.

## Контракт данных

Поле категорий в этих моделях уже заменено на список слагов. Новых ключей бэк не отдаёт. `postType` в карточке нет.

- `src/types/post.ts` — `postBase.taxonomies.taxonomies: string[] | null`, теги остаются `tags: OptionIF[] | null`.
- `src/components/cards/PostArchiveCard/PostArchiveCard.types.ts` — `taxonomies: string[] | null`.
- `src/components/cards/PostShortCard/PostShortCard.types.ts` — `taxonomies: string[] | null`.
- `src/components/sections/LastNewsPromoSection/LastNewsPromoSection.types.ts` — `taxonomies: string[] | null`.

Слаги те же, что термины в `src/configs/taxonomies.config.ts`. Неизвестный слаг `TermLink` не рисует.

`postType` для ссылки берётся из места, где список уже одного типа, либо из пути карточки:

- Архив: страница знает `postType`, прокидывает его в карточку и в промо.
- Шапка поста: первый сегмент `pathname` через `getPostTypeBySlug`.
- Короткая карточка (поиск, теги, календарь рок-дат): первый непустой сегмент относительного `url` через `getPostTypeBySlug`. Если сегмент не пост-тип, иконок нет.

## UI

Место и режим те же, что у старых категорий.

- `PostArchiveCard` и `PostShortCard`: ряд иконок, `TermLink` без `linkType` (круг `default`, 24px). Пустой или `null` список — ряд не рендерится.
- `ArchivePromoFeatured`: подпись «Категория» остаётся, ссылки текстом (`linkType="text"`).
- `SinglePostPromoSection`: список с `aria-label="Рубрики"`. Внутри только `TermLink` в режиме иконки. Сырой слаг текстом не показывается. Теги без изменений.

`LastNewsPromoSection` — заглушка, термины там не выводятся.

## Файлы

- `src/components/cards/PostArchiveCard/PostArchiveCard.component.tsx` — `taxonomies` и `TermLink`. Проп `postType`.
- `src/components/cards/PostArchiveCard/PostArchiveCard.types.ts` — `postType` в пропсах карточки.
- `src/templates/ArchiveTPL/ArchiveTPL.types.ts` и `ArchiveTPL.component.tsx` — принять `postType` и отдать в карточку.
- `src/app/(site)/[postType]/page.tsx` и `src/app/(site)/[postType]/[...slug]/page.tsx` — передать `postType` в шаблон; `getTermSegmentsFromCategories` читает `taxonomies`, не `categories`.
- `src/components/sections/ArchivePromoSection/ArchivePromoSection.types.ts` и `ArchivePromoSection.component.tsx` — прокинуть `postType` в галерею.
- `src/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.types.ts` и `ArchivePromoGallery.component.tsx` — прокинуть `postType` в featured.
- `src/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoFeatured/ArchivePromoFeatured.types.ts` и `ArchivePromoFeatured.component.tsx` — `TermLink` с `linkType="text"`.
- `src/components/cards/PostShortCard/PostShortCard.component.tsx` — `taxonomies` и `TermLink`, тип из `url`.
- `src/components/sections/SinglePostPromoSection/SinglePostPromoSection.component.tsx` — `taxonomies.taxonomies` и `TermLink`.
- `src/components/sections/SinglePostPromoSection/SinglePostPromoSection.helpers.ts` — убрать разбор категорий, если после замены он не нужен.

## Не делать

- Не верстать `LastNewsPromoSection`.
- Не менять `CategoryLink`, поиск по рубрикам и `SITE_CATEGORIES`.
- Не добавлять `postType` в JSON моделей.
- Не менять размеры и режимы `TermLink`.
- Не трогать `prompts/pattern-front.md` и `prompts/pattern-back.md` в этом заходе.
