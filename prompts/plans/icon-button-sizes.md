# Размеры круглых кнопок

## Цель

У `CopyLinkButton`, `Country`, `CategoryLink` и новой кнопки отзыва один проп размера: `default` 24×24 и `large` 36×36. По умолчанию `default`. Кнопка «Оставить отзыв» со страницы архива становится компонентом в `interactive`.

## Контракт данных

Эндпоинтов нет. `reviewUrl` по-прежнему приходит в SEO архива и решает, показывать ли кнопку.

## UI

Общий проп `size?: 'default' | 'large'`. Класс размера вешается на корневой элемент. `default` не нужно передавать снаружи.

Круг, отступы, фон и ховер не меняются. Меняется только коробка и масштаб иконки внутри.

| size | коробка | иконка |
| --- | --- | --- |
| default | 24×24, min-width 24 | 14px |
| large | 36×36, min-width 36 | 20px |

`CategoryLink` с `linkType="text"` размер не применяет: ширина по тексту, как сейчас.

`ReviewButton` — ссылка через `Button` с `isCustom`, иконка `IoChatboxEllipsesOutline`, фон `--accent`, тень `--elemShadow`, `target="_blank"`, `rel="noopener noreferrer"`, подпись «Оставить отзыв». Поведение как у текущей кнопки в промо архива.

Где какой размер:

- Архив, промо: «Скопировать ссылку» и «Оставить отзыв» — `large`.
- `EventCard`: страна и копирование — `default`.
- `Country` в карточке архива и в промо поста — `default`.
- `CategoryLink` с иконкой (`linkType="small"` в короткой карточке, карточке архива и промо поста) — `default`. Старые 22×22 и неиспользуемые 30×30 уходят, коробку задаёт `size`.
- `CategoryLink` с `linkType="text"` в избранном архива — без размера.

## Файлы

Создать:

- `src/components/interactive/ReviewButton/ReviewButton.component.tsx`
- `src/components/interactive/ReviewButton/ReviewButton.types.ts`
- `src/components/interactive/ReviewButton/ReviewButton.module.scss`

Изменить:

- `src/components/interactive/CopyLinkButton/CopyLinkButton.component.tsx`
- `src/components/interactive/CopyLinkButton/CopyLinkButton.types.ts`
- `src/components/interactive/CopyLinkButton/CopyLinkButton.module.scss`
- `src/components/elems/Country/Country.component.tsx`
- `src/components/elems/Country/Country.types.ts`
- `src/components/elems/Country/Country.module.scss` — флаг на всю коробку
- `src/components/elems/CategoryLink/CategoryLink.component.tsx`
- `src/components/elems/CategoryLink/CategoryLink.types.ts`
- `src/components/elems/CategoryLink/CategoryLink.module.scss` — убрать 22×22 и 30×30
- `src/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.component.tsx` — `ReviewButton` вместо локальной кнопки, у копирования и отзыва `size="large"`
- `src/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.module.scss` — убрать `.iconButton` и `.reviewButton`

Остальные вызовы не получают `size`: у них уже мелкий круг, сработает `default`.

## Не делать

- Новый вариант `Button`, общий класс на все четыре компонента, `clsx`.
- Менять `linkType` у `CategoryLink` (`small` / `text` / `simple`).
- Ставить `large` стране, иконкам категорий и копированию ссылки вне промо архива.
- Правки `prompts/pattern-front.md` и `prompts/pattern-back.md`.
