# Промо-блок архива

## Цель

На архивных страницах (`/news` и другие пост-типы) над лентой — блок по скрину: слева паспорт раздела, справа галерея постов. Клик по миниатюре меняет большую обложку и карточку. Карусели нет.

## Контракт данных

Два независимых запроса:

1. `GET /archive/archive?postType=&page=` — `postsData`, `paginationInfo` (как сейчас).
2. `GET /archive/promo-data?postType=` — без `page`:

```ts
{
  seoData: {
    titleH1: string;      // HTML, БД archive_h1_title
    description: string;  // HTML, БД archive_h1_content
    reviewUrl: string;    // href «Оставить отзыв», например /#contact
  } | null;
  archivePromoData: PostArchiveCardModelIF[] | null; // [0] активен
}
```

На странице — `Promise.allSettled`. Промо с `GET /archive/promo-data`.

## UI

- Один `h1` из HTML `seoData.titleH1`.
- Крошки внутри промо, если промо есть.
- «Копировать ссылку» — clipboard текущего URL, тост `s107`.
- «Оставить отзыв» — `reviewUrl` (`/#contact`).
- Миниатюры — кнопки с `aria-pressed`.
- Featured: дата, теги, категория, автор, excerpt, «Читать».
- Watermark — первый тег выбранного поста.

## Файлы

- `src/components/sections/ArchivePromoSection/`
- `src/api/archive/types.ts`, `endpoints.ts`
- `src/templates/ArchiveTPL/`
- `src/app/(site)/[postType]/page.tsx`
- `src/helpers/validation/codes/codes.config.ts`
- футер `id="contact"`
- `.cursor/rules/api-endpoints.mdc`, `prompts/pattern-front.md`, `prompts/pattern-back.md`

## Не делать

- Закладка и шеринг на карточке.
- Ломать сетку `menu | content | sidebar`.
