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

Превью карты, фон партнёров и логотипы — заглушки на CSS. Аватары команды пустые: `Img` с `type="user250"` рисует силуэт. Портрет `src/images/about/ozzy.png` с страницы убирается.

## UI

Один `h1` — заголовок промо. Заголовки секций — `h2`. Пункты истории и фактов — `h3`. Имена в команде — ссылки, не заголовки.

Водяных знаков `SectionWatermark` на странице нет: ни `#О НАС`, ни `#10 ЛЕТ`, ни `#TEAMSPIRIT`.

В карточку `Section` (`src/components/blocks/Section/Section.component.tsx`) входят только три блока. `Section` сам рендерит `<section>`, поэтому свой внешний `<section>` у этих блоков снимается, второй `<section>` внутрь не кладётся. Проп `title` у `Section` не передаётся: заголовок уже есть внутри, второй `h2` не нужен. Декор-SVG карточки остаётся.

1. **Промо** «О медиа-портале sorock.ru». Обёртка — `Section` с `aria-labelledby` на существующий `h1`. Крошки `Главная » О нас` (`Breadcrumbs`, `pathname="/about"`, `title="О нас"`). Заголовок цветом `--accent`, на всю ширину карточки (отступ под водяной знак снимается). Описание с жирным и курсивом. Кнопки в ряд: «Копировать ссылку» (`Button` `primary`, иконка ссылки, клик копирует `location.href` и показывает тот же toast, что `CopyLinkButton`) и «Оставить отзыв» (`Button` `accent`, `href` из мока, `target="_blank"`, `rel="noopener noreferrer"`). Под текстом четыре цифры: значение и подпись. Справа жёлтая визитка `LocalBusiness`: превью карты, логотип, название, телефон (`tel:`), почта (`mailto:`), адрес, часы. Кнопка на превью открывает и закрывает iframe Яндекс.Карты (`title` у iframe). На узкой ширине визитка уходит под текст, статистика — в две колонки.
2. **История.** Свой `<section>`, без карточки `Section`. `h2` «История проекта Сорок Ру». Две тёмные колонки. Левая — даты, иконка лампочки, акцент `--accent` не используется: маркер жёлтый, как на скрине. Правая — факты, иконка календаря, маркер `--colorPrimary`. Вертикальная линия между пунктами. На `md` колонки друг под другом. Ссылки в тексте: внешние с `rel="noopener noreferrer"`, у ВК ещё `nofollow`.
3. **Команда.** Обёртка — `Section` с `aria-labelledby` на существующий `h2` «Команда sorock.ru». Сетка карточек: фото слева, имя капсом, должность цветом `--accent`, короткое описание, соцсети справа снизу (`react-icons`, внешние ссылки). Ширина карточки: 4 в ряд, затем 3, 2 и 1. Имя — `next/link` на `uri`. Страниц `/users/...` на новом фронте ещё нет: ссылка ведёт на этот путь заранее. `Section` уже ставит `WebPageElement`, поэтому `NewsMediaOrganization` переносится на внутренний список. `h2` и `itemProp="name"` остаются одни.
4. **Партнёры.** Свой `<section>`, без карточки `Section`. Тёмный фон и диагональные полосы `--accent` вместо картинки мазков. `h2` «Партнеры проекта» и абзац слева, справа слоты с названиями (ссылка `target="_blank"` `rel="nofollow noopener noreferrer"`). На `md` текст на всю ширину, слоты сеткой под ним.
5. **Кто мы** — `WhoWeAreSection` внутри `Section` с `aria-label` «О проекте sorock.ru». Портрета Оззи нет: ни `<img>`, ни отступа карточки под него, файл `src/images/about/ozzy.png` удаляется. Текст по-прежнему читает `siteApi.useGetCommonDataQuery()`: поле `whoWeAre` (`{ title, text }[] | null`) в ответе `/site/common-data`. Пока поля нет или оно пустое — три абзаца из старой вёрстки. Карточка пунктов: «Кто мы», «Наша философия», «Для кого», у абзаца полоса `--accent`. Разметка `FAQPage` переносится на внутреннюю карточку: у `Section` уже стоит `WebPageElement`.

## Файлы

- `src/app/(site)/about/page.tsx` — `generateMetadata` и рендер шаблона.
- `src/templates/AboutTPL/AboutTPL.component.tsx` — `Content` и пять секций, без `Sidebar`.
- `src/templates/AboutTPL/AboutTPL.mock.ts` — данные.
- `src/templates/AboutTPL/AboutTPL.types.ts` — типы мока.
- `src/components/sections/AboutPromoSection/` — промо, статистика, визитка (визитка с `'use client'` из‑за карты и копирования ссылки).
- `src/components/sections/AboutHistorySection/`
- `src/components/sections/AboutTeamSection/`
- `src/components/sections/AboutPartnersSection/`
- `src/components/sections/WhoWeAreSection/` — сама ходит в `siteApi`, пропсов с текстом нет. Внешний тег заменяется на `Section`, водяной знак и портрет убираются.
- `src/components/elems/SectionWatermark/` — удалить, после снятия с трёх секций импортов не остаётся.
- `src/images/about/ozzy.png` — удалить.
- `src/api/site/types.ts` — необязательное `whoWeAre`, без изменений.

Подписи, id заголовков и подписи кнопок — в `*.config.ts` секции, не в компоненте и не в моке.

## Не делать

- Карточку `Section` на историю и партнёров.
- Проп `title` у `Section` там, где заголовок уже есть в блоке.
- `SiteStatisticSection` (графики внизу старого шаблона).
- `StyledConnectUsWrapper`: аккордеон «Присоединяйся к команде» (дизайнеры, редакторы, Wordpress, Front-end).
- Блок «Кто мы» в общий layout. На `/about` он стоит последним; на другие страницы его подключают отдельно.
- Новый REST-роут. Поле `whoWeAre` дописывается в уже существующий `/site/common-data`, каталог эндпоинтов не меняется, пока бэк его не отдаёт.
- `prompts/pattern-front.md` и прочие клиентские паттерны: контракт API не меняется.
