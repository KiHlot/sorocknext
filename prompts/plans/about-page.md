# Страница «О нас»

## Цель

На `/about` появляется страница по скринам старого сайта. Порядок секций как в `d:\OSPanel\domains\sorockapp\src\templates\AboutTemplate.tsx`, плюс блок «Кто мы» внизу. Контент — моки из старой вёрстки, пока в БД нет полей.

Слева остаётся меню сайта. Сайдбара нет: секции занимают колонку `Content`.

## Контракт данных

Нового эндпоинта нет. В каталоге `api-endpoints.mdc` страницы «О нас» нет — запрос не придумывать.

- Роут фронта: `/about`. Пункт уже есть в `src/components/menus/LeftMenu/LeftMenu.config.tsx` и в футере.
- SEO: существующий `GET /metadata?type=page&slug=about` через `fetchMetadata`. Если страницы в WP ещё нет, `fetchApi` вернёт `null`, сработают дефолтные метаданные.
- Тексты, цифры, команда, партнёры, контакты и ссылка на отзыв лежат в `src/templates/AboutTPL/AboutTPL.mock.ts`. Тексты переносятся из старых компонентов как есть, включая HTML-ссылки внутри абзацев.
- Форма мока (чтобы потом подставить ответ бэка без переделки секций):
  - промо: `title`, `descriptionHtml`, `reviewUrl`, `stats[]` (`value`, `label`);
  - визитка: `name`, `tagline`, `siteUrl`, `phone`, `email`, `street`, `city`, `country`, `postalCode`, `hours`, `mapEmbedUrl`;
  - история и факты: `labelHtml`, `titleHtml`, `descriptionHtml`;
  - команда: `fullName`, `position`, `description`, `avatar`, `uri`, `soclist` (`mode`, `link`);
  - партнёры: `title`, `url` (без файлов логотипов: в слоте текст названия).

Реальный файл один: `src/images/about/ozzy.png` из `d:\OSPanel\domains\sorockapp\src\img\bg\ozzy.png`. Превью карты, фон партнёров и логотипы — заглушки на CSS. Аватары команды пустые: `Img` с `type="user250"` рисует силуэт.

## UI

Один `h1` — заголовок промо. Заголовки секций — `h2`. Пункты истории и фактов — `h3`. Имена в команде — ссылки, не заголовки.

1. **Промо.** Крошки `Главная » О нас` (`Breadcrumbs`, `pathname="/about"`, `title="О нас"`). Справа сверху водяной знак `#О НАС` (`aria-hidden`). Заголовок цветом `--accent`. Описание с жирным и курсивом. Кнопки в ряд: «Копировать ссылку» (`Button` `primary`, иконка ссылки, клик копирует `location.href` и показывает тот же toast, что `CopyLinkButton`) и «Оставить отзыв» (`Button` `accent`, `href` из мока, `target="_blank"`, `rel="noopener noreferrer"`). Под текстом четыре цифры: значение и подпись. Справа жёлтая визитка `LocalBusiness`: превью карты, логотип, название, телефон (`tel:`), почта (`mailto:`), адрес, часы. Кнопка на превью открывает и закрывает iframe Яндекс.Карты (`title` у iframe). На узкой ширине визитка уходит под текст, статистика — в две колонки.
2. **История.** `h2` «История проекта Сорок Ру», водяной знак `#10 ЛЕТ`. Две тёмные колонки. Левая — даты, иконка лампочки, акцент `--accent` не используется: маркер жёлтый, как на скрине. Правая — факты, иконка календаря, маркер `--colorPrimary`. Вертикальная линия между пунктами. На `md` колонки друг под другом. Ссылки в тексте: внешние с `rel="noopener noreferrer"`, у ВК ещё `nofollow`.
3. **Команда.** `h2` «Команда sorock.ru». Сетка карточек: фото слева, имя капсом, должность цветом `--accent`, короткое описание, соцсети справа снизу (`react-icons`, внешние ссылки). Ширина карточки: 4 в ряд, затем 3, 2 и 1. Имя — `next/link` на `uri`. Страниц `/users/...` на новом фронте ещё нет: ссылка ведёт на этот путь заранее.
4. **Партнёры.** Тёмный фон и диагональные полосы `--accent` вместо картинки мазков. `h2` «Партнеры проекта» и абзац слева, справа слоты с названиями (ссылка `target="_blank"` `rel="nofollow noopener noreferrer"`). На `md` текст на всю ширину, слоты сеткой под ним.
5. **Кто мы** — отдельная секция `WhoWeAreSection`, не часть мока страницы. Её можно поставить на другую страницу тем же компонентом. Текст читает `siteApi.useGetCommonDataQuery()`: поле `whoWeAre` (`{ title, text }[] | null`) в ответе `/site/common-data`. Пока поля нет или оно пустое — три абзаца из старой вёрстки. Водяной знак `#TEAMSPIRIT`, слева `ozzy.png` (`alt=""`, `aria-hidden`, на `md` скрыто). Карточка: «Кто мы», «Наша философия», «Для кого», у абзаца полоса `--accent`.

Секции не оборачивать в карточку `Section` с главной: фон и водяные знаки свои, декор-SVG секции не показывать.

## Файлы

- `src/app/(site)/about/page.tsx` — `generateMetadata` и рендер шаблона.
- `src/templates/AboutTPL/AboutTPL.component.tsx` — `Content` и пять секций, без `Sidebar`.
- `src/templates/AboutTPL/AboutTPL.mock.ts` — данные.
- `src/templates/AboutTPL/AboutTPL.types.ts` — типы мока.
- `src/components/sections/AboutPromoSection/` — промо, статистика, визитка (визитка с `'use client'` из‑за карты и копирования ссылки).
- `src/components/sections/AboutHistorySection/`
- `src/components/sections/AboutTeamSection/`
- `src/components/sections/AboutPartnersSection/`
- `src/components/sections/WhoWeAreSection/` — сама ходит в `siteApi`, пропсов с текстом нет.
- `src/api/site/types.ts` — необязательное `whoWeAre`.
- `src/images/about/ozzy.png`

Подписи, id заголовков и подписи кнопок — в `*.config.ts` секции, не в компоненте и не в моке.

## Не делать

- `SiteStatisticSection` (графики внизу старого шаблона).
- `StyledConnectUsWrapper`: аккордеон «Присоединяйся к команде» (дизайнеры, редакторы, Wordpress, Front-end).
- Блок «Кто мы» в общий layout. На `/about` он стоит последним; на другие страницы его подключают отдельно.
- Новый REST-роут. Поле `whoWeAre` дописывается в уже существующий `/site/common-data`, каталог эндпоинтов не меняется, пока бэк его не отдаёт.
- `prompts/pattern-front.md` и прочие клиентские паттерны: контракт API не меняется.
