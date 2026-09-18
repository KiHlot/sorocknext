# Лейауты: grid → flex

## Цель

Убрать CSS Grid из лейаутов и перевести колонки на Flexbox, как требует `scss-modules-styling.mdc`. Внешний вид и брейкпоинты те же.

В `src` грид есть только в двух местах. Секции, шаблоны и утилиты `_base` (`flc` / `flcol` / `flrow`) не трогаем.

## Контракт данных

Не меняется. Правки только SCSS (и при необходимости классы ширины колонок).

## UI

### `CommonLayout`

Сейчас (`D:\OSPanel635\home\sorocknext\src\layouts\CommonLayout\CommonLayout.module.scss`): три колонки `200px | 1fr | 280px`, `gap: var(--gapDesktop)`, `grid-auto-flow: column`.

Разметка (`CommonLayout.component.tsx`): `aside.menu` | `{children}` (`Content` + `Sidebar` из шаблона).

Flex:

- обёртка: `display: flex`, `flex-direction: row`, `align-items: flex-start`, тот же `gap` / `padding`;
- `.menu`: `flex: 0 0 200px`, `width: 200px` (sticky без изменений);
- `.content`: `flex: 1 1 auto`, `min-width: 0` (чтобы длинный контент не раздувал ряд);
- сайдбар справа: `flex: 0 0 280px`, `width: 280px` на экспорт `Sidebar` (класс в том же модуле).

Удалить `display: grid`, `grid-template-columns`, `grid-auto-flow`, `grid-auto-columns`.

### Auth layout

Сейчас (`D:\OSPanel635\home\sorocknext\src\app\(auth)\auth.module.scss`): `10vw | 600px | 1fr`; `xl` — `5vw | 600px | 1fr`; `md` — `0 | 1fr | 0`.

Разметка (`layout.tsx`): `.leftSide` | `.content` | `.thumb`.

Flex:

- `.authLayout`: `display: flex`, `flex-direction: row`, `align-items: stretch`;
- `.leftSide`: `flex: 0 0 10vw`; `@include media(xl)` — `5vw`; `@include media(md)` — `flex: 0 0 0`, `width: 0`, `overflow: hidden` (колонка пропадает, как `0` в гриде);
- `.content`: `flex: 0 0 600px`, `width: 600px`; на `md` — `flex: 1 1 auto`, `width: 100%`;
- `.thumb`: `flex: 1 1 auto`, `min-width: 0`; на `md` — `flex: 0 0 0`, `width: 0`, `overflow: hidden`.

Паддинги `.content` и прочие классы модуля не менять.

## Файлы

Изменить:

- `D:\OSPanel635\home\sorocknext\src\layouts\CommonLayout\CommonLayout.module.scss`
- `D:\OSPanel635\home\sorocknext\src\layouts\CommonLayout\CommonLayout.component.tsx` — класс ширины на `Sidebar`, если ширина не в модуле
- `D:\OSPanel635\home\sorocknext\src\app\(auth)\auth.module.scss`

Не трогать JSX auth, если ширины закрываются классами модуля.

Проверка: главная (три колонки), страница auth (три колонки + `xl`/`md`).

## Не делать

- Не переписывать гриды вне лейаутов (их нет).
- Не менять Header / Footer / шаблоны / API.
- Не вводить CSS Grid в новых стилях.
- Не трогать `prompts/pattern-front.md`.
