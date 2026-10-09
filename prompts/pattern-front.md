# Паттерны разработки фронтенда (Next.js)

Источник истины для **контракта REST** — бэкенд (`pattern-back.md` и `.cursor/rules/api-*.mdc`). Этот файл описывает, **как писать фронт**: слои, файлы, импорты, сервер/клиент, формы и стили.

Стек: Next.js App Router, TypeScript, Redux Toolkit + RTK Query, react-hook-form + yup, SCSS-модули, dayjs, react-toastify, react-icons.

---

## 1. Структура `src/`

```
src/
├── app/              # App Router: страницы, layout, StoreProvider
├── api/              # Клиентские RTK-слайсы и серверные fetch-обёртки
├── store/            # Redux store и UI-слайсы
├── templates/        # Шаблоны страниц (Content / Sidebar + секции)
├── layouts/          # Хром сегментов (CommonLayout, AdminLayout, MainWrapper)
├── components/       # UI по категориям
├── helpers/          # fetchApi, parseResponse, валидация, storage, SEO
├── hooks/            # Кастомные хуки
├── configs/          # MAGIC_NUMBERS, категории сайта, форматы дат
├── types/            # Общие типы (api, common, post, user)
├── styles/           # global.scss, переменные, миксины, утилиты
└── images/           # svg/ и статичные img/
```

Категории `src/components/`:

| Папка          | Назначение                                               |
| -------------- | -------------------------------------------------------- |
| `blocks/`      | Составные блоки (Block, Table, Section)                  |
| `controls/`    | Поля форм (Input, Button, CheckBox, CodeInput, TextArea) |
| `elems/`       | Мелкие элементы (Img, Author, MainLogo, Overlay)         |
| `interactive/` | Модалки, пагинация, табы, breadcrumbs                    |
| `menus/`       | LeftMenu, AdminMenu                                      |
| `sections/`    | Секции страниц (Header, Footer, промо, контент поста)    |
| `widgets/`     | Виджеты (логин, теги, сброс пароля)                      |
| `forms/`       | Самостоятельные формы (LoginForm, RegistrationForm)      |

Модули рядом с компонентом:

- `*.component.tsx` — обязателен
- `*.module.scss` — стили
- `*.types.ts` — пропсы и локальные типы
- `*.config.ts` / `*.config.tsx` — схемы, константы, пункты меню. Именованные константы модуля лежат здесь, не в `*.component.tsx` / `*.helpers.ts` / `*.mock.ts`
- `*.helpers.ts` — локальные хелперы

Именование файлов: PascalCase для компонентов (`Button.component.tsx`), camelCase для хелперов и хуков (`fetchApi.ts`, `outsideClick.hook.ts`). ESLint: `unicorn/filename-case`.

---

## 2. Типы и интерфейсы

- Интерфейсы — постфикс `IF` (`UserIF`, `PageProps`, `ResponseIF`).
- Типы — постфикс `T` (`ValueOfT`, `UserRoleT`, `SearchParamsT`).
- Ключи JSON с бэка — **camelCase**. `snake_case` во фронтовых типах не появляется.
- Имена полей форм совпадают с `Site_Config::$FIELDS` на бэке (`loginEmail`, `passwordConfirm`, `confirmCode`).

Общие типы — `src/types/`. Типы конкретного эндпоинта — `src/api/<domain>/types.ts`.

```ts
// src/types/common.ts
export type ValueOfT<T> = T[keyof T];

export interface OptionIF {
    label: string;
    value: string;
}

export type SearchParamsT = Record<string, string | undefined>;

export interface PageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams?: Promise<SearchParamsT>;
}

export interface FilteredResultIF<DataIF = null> {
    pagination: PaginationIF;
    filteredData: DataIF | null;
    isRedirect: boolean;
}
```

```ts
// src/types/api.ts
export const RESPONSE_RESULT = {
    Ok: 'ok',
    Errors: 'errors',
    Redirect: 'redirect',
    Logout: 'logout',
    NotFound: 'notfound',
} as const;

export type ResponseErrorIF = {
    code: string;
    fieldName?: string;
    addInfo?: string;
};

export interface ResponseIF<DataIF = null> {
    result: ValueOfT<typeof RESPONSE_RESULT>;
    data: DataIF | null;
    errors?: ResponseErrorIF[];
    redirectUrl?: string;
}
```

SEO с бэка (`src/api/metadata/types.ts`):

```ts
export const METADATA_TYPE = {
    Page: 'page',
    Archive: 'archive',
    Post: 'post',
    Search: 'search',
} as const;

export type MetadataTypeT = ValueOfT<typeof METADATA_TYPE>;

export interface MetadataParamsIF {
    type: MetadataTypeT;
    slug?: string;
    param?: string;
}

export interface SeoDataIF {
    title: string;
    description: string;
    canonical: string;
    innerImg?: string;
    dateGmt: string;
    modifiedGmt: string;
    author: string;
    tags?: string[];
}
```

---

## 3. Импорты и код-стиль

- Только абсолютные импорты `@/...`. Относительные (`./`, `../`) запрещены ESLint.
- Явные типы аргументов и возврата у функций и компонентов.
- Компоненты — стрелочные функции, тип `FC<PropsIF>` или страница `Promise<ReactElement>`.
- Магические числа — в `@/configs/magicNumbers.config` (`MAGIC_NUMBERS.RedirectDelay`).
- `no-console` — warn; отладочные `console.log` в прод-код не оставлять.

Порядок импортов (`eslint-plugin-import`, без пустых строк между группами):

1. builtin
2. `react`
3. external (`next`, библиотеки)
4. internal, в таком порядке pathGroups:
   `@/store` → `@/styles` → `@/types` → `@/images` → `@/api` → `@/configs` → `@/hooks` → `@/helpers` → `@/layouts` → `@/components`
5. внутри группы — алфавит

Prettier: `printWidth: 80`, `tabWidth: 4`, `singleQuote`, `semi`, `trailingComma: all`.

---

### Markdown: вложенные блоки кода

Когда генерируется `.md` или `.mdc`-файл, внутри которого есть **примеры кода** (`.ts` / `.tsx` / `.scss` / `.php` и т.д.):

- **Внешний блок** оборачивается **четырьмя бэктиками** (` ` ````).
- **Внутренние примеры** — **тремя** (` ``` `).

Иначе внешний markdown-блок «съедается» первым вложенным, и весь файл ломается.

**Пример правильной структуры:**

````markdown
## Раздел

Пример кода:

```ts
const x = 1;
```
````

---

## Экспорты

Правило единое на весь проект:

- **`export default`** — для компонентов и хуков.
    - Компоненты: `export default Button;`
    - Страницы и layout'ы: `export default HomePage;` (App Router требует default у `page.tsx` / `layout.tsx` / `not-found.tsx`).
    - Шаблоны: `export default HomePageTPL;`
    - Layout-обёртки: `export default CommonLayout;`
    - Хуки (один хук — один файл): `export default useOutsideClick;`
- **Named exports** — для всего остального:
    - Типы (`*.types.ts`): `export interface ButtonPropsIF`, `export type ButtonVariantT`.
    - Конфиги (`*.config.ts` / `*.config.tsx`): `export const MENU_ITEMS = [...]`.
    - API-слайсы RTK (`@/api/<domain>/<domain>.ts`): `export const authApi = createApi(...)`.
    - Серверные обёртки (`@/api/<domain>/endpoints.ts`): `export const fetchHomePageData = ...`.
    - Файлы с несколькими публичными экспортами (`utils.ts`, `storage.helpers.ts`, `codes.config.ts`).

**Правило для ассистента:** один публичный экспорт в файле → `default`. Несколько публичных экспортов → все через named, без `default`.

Типы и интерфейсы **никогда** не экспортируются через `default` — только named, даже если компонент рядом использует `export default`.

---

## 4. Переменные окружения

Не хардкодить домены. База REST и JWT собираются из env.

| Переменная                    | Назначение                                        |
| ----------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_REST_BASE`       | `/wp-json/rest`                                   |
| `NEXT_PUBLIC_JWT_BASE`        | `/wp-json/jwt-auth/v1`                            |
| `NEXT_PUBLIC_DOMAIN_URL`      | фронтовый домен                                   |
| `NEXT_PUBLIC_WP_HOST`         | хост медиа (`st.sorockwp.local` / `st.sorock.ru`) |
| `NEXT_PUBLIC_REST_DOMAIN_URL` | хост API                                          |

`next.config.ts` подставляет `NEXT_PUBLIC_WP_HOST` в `images.remotePatterns` для `/wp-content/uploads/**`. SVG через `@svgr/webpack` (и webpack, и turbopack).

---

## 5. Два слоя запросов

### 5.1. Сервер: `fetchApi`

Файл: `src/helpers/fetchApi.ts`. Только в Server Components / Route Handlers (`cookies()` из Next).

- Собирает URL: `${NEXT_PUBLIC_REST_DOMAIN_URL}${NEXT_PUBLIC_REST_BASE}${route}`.
- `route` всегда с ведущим слэшем: `/archive/archive`.
- Берёт cookie `token` и при наличии ставит `Authorization: Bearer`.
- **Разворачивает конверт**: при `result === 'ok'` возвращает `data`, иначе `null`.
- Дженерик `fetchApi<T>` — тип **внутренних данных**, не `ResponseIF<T>`.

```ts
export const fetchApi = async <DataIF = null>(
    route: string,
    cache: RequestCache = 'no-cache',
): Promise<DataIF | null | undefined> => {
    /* ... */
};
```

Обёртки серверных эндпоинтов лежат в `src/api/<domain>/endpoints.ts` (не регистрируются в Redux):

- `fetchMetadata({ type, slug?, param? })` — `/metadata?type=...&slug=...&param=...` + `getMetadata`
- `fetchHomePageData` — `/page/home-page-data`; в `data` рядом с `lastNewsPromoData` приходит `calendarDefaultData` (события сегодняшнего дня, `EventCardModelIF[] | null`) и `topAlbumsListData` (топы альбомов, `TopAlbumsListIF[] | null`, типы в `@/components/sections/TopAlbumsSection/TopAlbumsSection.types`)
- `fetchArchive({ postType, taxonomy?, page })` — `/archive/archive?postType=...&taxonomy=...&page=...`.
  `taxonomy` — slug термина (`clip`), не имя таксономии (`video_cat`); в query попадает только если задан.
  `pagesCount` приходит в `paginationInfo: { currentPage, pagesCount }`, в запрос не передаётся и считается от фильтра.
  `result: 'redirect'` с `redirectUrl` обрабатывает сама обёртка через `redirect()` из `next/navigation` (`fetchApiEnvelope` в `@/helpers/fetchApi`). `fetchApi` по-прежнему возвращает только `data` при `result === 'ok'`
- `fetchArchivePromo({ postType })` — `/archive/promo-data?postType=...`;
  `seoData` (HTML `titleH1` / `description`, `reviewUrl`) и
  `archivePromoData` (посты галереи, активен первый). Без `page`.
  На архивной странице лента и промо грузятся через `Promise.allSettled`
- `fetchArchiveSlugs(postType)` — `/archive/get-slugs?postType=...`
- клиентский `archiveApi.useGetCalendarQuery({ month, day })` — `GET /archive/calendar?month=1&day=23` (`month` 1–12). Серверный `fetchApi` этот роут не вызывает. Сегодняшний день на главной берётся из `calendarDefaultData`, запрос уходит только при смене даты
- клиентский `archiveApi.useGetRockCalendarQuery({ month })` — `GET /archive/rock-calendar?month=9`. Календарь архива `/rock-data`: `data` — `MM-DD` → `PostShortCardModelIF[]` или `null`. Запрос на текущий месяц при открытии и при смене месяца. Клик по дню отдельный запрос не шлёт. Дата на карточке — `eventDate`. На дне до 10 полосок в две колонки, больше 10 — акцентный квадрат
- `fetchPost({ postType, slug })` (`@/api/post/endpoints`) — `/post/{slug}?postType=...`;
  нет записи — `null` (`notfound`), страница вызывает `notFound()`
- `fetchSearchData` / `fetchSearchConfig` — `/search`, `/search/get-search-config`

На странице предпочтительно вызывать обёртку, а не сырой `fetchApi`, если обёртка уже есть.

### 5.2. Клиент: RTK Query

Файл базы: `src/helpers/fetchRestApi/fetchRestApi.ts`.

- `fetchRestApiQuery('/auth')` — REST с JWT из cookie `Token`.
- `fetchJWTTokenQuery()` — отдельная база `/wp-json/jwt-auth/v1` (логин).

Каждый слайс: одна папка на контроллер бэка, `createApi` + `types.ts`. Слайс **обязательно** регистрируется в `src/store/store.ts` (reducer + middleware).

Серверные `endpoints.ts` (`page`, `metadata`, `search`) в store **не** регистрируются.

Хуки: `authApi.useRegisterUserMutation()` — не дублировать типы вручную.

Мутации REST: всегда `.unwrap()` + `parseResponse` + `catchError`. Успех **не** смотреть по HTTP-статусу: бэк почти всегда отдаёт 200, статус в `result`.

JWT `/token` — **другая форма ответа** (`token`, `expires`, `currentUser`), не `ResponseIF`. Для логина `parseResponse` не используется.

### 5.3. `parseResponse` и `catchError`

- `parseResponse` (`src/helpers/fetchRestApi/fetchRestApi.helpers.ts`) — ветки `ok` / `errors` / `redirect` / `logout` / `notfound`.
- `catchError` (`src/helpers/validation/error/error.helpers.ts`) — транспорт и JWT (сеть, 401/403/500).
- Тексты ошибок: `ERRORS_CODES[code] ?? ERRORS_CODES.er900`.
- `result: 'logout'` → `logout()` (`src/helpers/logout/logout.ts`): чистит cookie `Token` и session `CurrentUser`.
- `result: 'redirect'` + `redirectUrl` — пагинация вне диапазона. На сервере (админка пользователей) это же отражается как `filterResult.isRedirect` + `redirect()` из `next/navigation`.

---

## 6. Страницы (App Router)

Серверные компоненты по умолчанию. `'use client'` только там, где хуки, формы, слайдеры, модалки.

Роуты сейчас:

| Путь | Назначение |
| --- | --- |
| `(site)/` | Главная |
| `(site)/[postType]` | Архив типа записи |
| `(site)/[postType]/[...slug]` | Термин кастомной таксономии или пост |
| `(site)/tag/[slug]` | Метка `post_tag` |
| `(site)/search` | Поиск |
| `(auth)/login`, `registration`, `reset-password`, `confirm-account` | Авторизация |

Типы: `article`, `journal`, `music`, `news`, `quiz`, `rock-data`, `site-archive`, `video` (`src/configs/postTypes.config.ts`). Кастомные таксономии — `article_cat`, `music_cat`, `news_cat`, `video_cat` (`src/configs/taxonomies.config.ts`).

Как читается `[...slug]`:

- один сегмент из дефолтных терминов (`/articles/interview`) редиректит на архив термина `/articles/interview/1`;
- `/articles/interview/:id` — архив термина, `:id` это номер страницы (`1`, `2`, …);
- `/article/interview/{слаг}` — запись: термин остаётся в адресе, слаг типа для записи — `article`;
- вложенный термин архива заканчивается номером страницы: `/articles/sport/child/1`;
- у типа без кастомной таксономии (`journal`, `quiz`, `rock-data`, `site-archive`) допустим только один сегмент — запись.

Список постов термина — `fetchArchive({ postType, taxonomy, page })`: `taxonomy` равен slug термина из пути, `page` равен `:id`. Адрес архива статей — `/articles/{term}/{page}` (`/articles/entertaining/2`). В API `postType` остаётся `article`. Фильтр берёт термины из `CUSTOM_TAXONOMIES`. «Все» ведёт на `/articles`, термин — на `/articles/{term}/1`. `/article` и `/article/{term}/{page}` редиректят на `articles`. Query `?taxonomy=` редиректит на этот путь.

Паттерн страницы:

1. `generateMetadata` (или статический `export const metadata`).
2. Загрузка данных через `fetchMetadata` / `fetchApi` / обёртку.
3. Рендер **шаблона** (`*TPL`), не разметки прямо в `page.tsx`.
4. Нет данных у публичной страницы — либо пустой fallback, либо `notFound()`.

SEO:

```tsx
import type { Metadata } from 'next';
import { fetchMetadata } from '@/api/metadata/endpoints';
import { fetchHomePageData } from '@/api/page/endpoints';
import HomePageTPL from '@/templates/HomePageTPL/HomePageTPL.component';

export async function generateMetadata(): Promise<Metadata> {
    return fetchMetadata({ type: 'page' });
}

export default async function HomePage(): Promise<ReactElement> {
    const data = await fetchHomePageData();

    return data ? <HomePageTPL data={data} /> : <div />;
}
```

`getMetadata` (`src/helpers/getMetadata/getMetadata.ts`) мержит ответ бэка с `DEFAULT_METADATA`. Единая обёртка `fetchMetadata` принимает: `{ type: 'page' }` для главной, `{ type: 'archive', slug: postType }` для архива, `{ type: 'post', slug }` для записи, `{ type: 'search', param: phrase }` для поиска. `URLSearchParams` формирует query-string. Если обёртки нет — `fetchApi<SeoDataIF>` + `getMetadata`.

`params` и `searchParams` в Next — `Promise`. Всегда `await params` / `await searchParams`.

Статика постов (`generateStaticParams`):

```ts
export async function generateStaticParams(): Promise<
    { postType: string; slug: string[] }[]
> {
    const slugGroups = await Promise.all(
        POST_TYPE_SLUGS.map(async (postType) => {
            const slugs = await fetchArchiveSlugs(postType);

            return (
                slugs?.map((slug) => ({ postType, slug: [slug] })) ?? []
            );
        }),
    );

    return slugGroups.flat();
}
```

`fetchApi` уже вернул `data`. Не типизировать как `ResponseIF<string[]>`.

Корень: `src/app/layout.tsx` — шрифт Inter, `defaultTheme`, `StoreProvider`, один `ToastContainer`. Хром сегментов — в `layout.tsx`: `(site)` → `CommonLayout`, `(auth)` → свой layout + `auth.module.scss`. `*TPL` собирает только `Content` / `Sidebar` и секции, без повторной обёртки в хром.

---

## 7. Клиентское API и store

Регистрация слайсов (`src/store/store.ts`):

```ts
const rootReducer = combineReducers({
    [archiveApi.reducerPath]: archiveApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [taxonomyApi.reducerPath]: taxonomyApi.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [siteConfig.reducerPath]: siteConfig.reducer,
});
```

UI-состояние — `src/store/slices/siteConfig/` (`isLeftMenuOpened`, `isBottomSheetOpen`, `isGlobalLoading`, `overlayStack`). Хуки:

```ts
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsLeftMenuOpened } from '@/store/slices/siteConfig/siteConfig.slice';

const dispatch = useAppDispatch();
const isMenuOpened = useAppSelector(
    (state) => state.siteConfig.isLeftMenuOpened,
);
dispatch(setIsLeftMenuOpened(!isMenuOpened));
```

`StoreProvider` (`src/app/StoreProvider.tsx`) — `'use client'`, `useState(() => makeStore())`.

Пример REST-слайса:

```ts
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchRestApiQuery('/auth'),
    endpoints: (builder) => ({
        registerUser: builder.mutation<ResponseIF, RegistrationFieldsIF>({
            query: (data) => ({
                url: `/registration`,
                method: 'POST',
                body: data,
            }),
        }),
        confirmEmail: builder.mutation<ResponseIF, ConfirmEmailIF>({
            query: (body) => ({
                url: `/confirm-email`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
```

Имена эндпоинтов RTK совпадают с роутами бэка (`confirmEmail` → `/confirm-email`, `getCurrentUser` → `/users/get-current-user`). Каталог роутов — `.cursor/rules/api-endpoints.mdc`. Не выдумывать URL.

JWT:

```ts
export const jwtApi = createApi({
    reducerPath: 'jwtApi',
    baseQuery: fetchJWTTokenQuery(),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginUserResponseIF, LoginUserIF>({
            query: (data) => ({
                url: `/token`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});
```

Токен: cookie `STORAGE_KEYS.Token`. Профиль: sessionStorage `STORAGE_KEYS.CurrentUser`. Хелперы — `src/helpers/storage/`.

`siteApi.getCommonData` использует `transformResponse` и отдаёт уже `data`, не весь конверт — исключение, не копировать слепо на мутации.

---

## 8. Компоненты и шаблоны

```tsx
import { FC } from 'react';
import styles from '@/layouts/MainWrapper/MainWrapper.module.scss';
import { MainWrapperPropsIF } from '@/layouts/MainWrapper/MainWrapper.types';

const MainWrapper: FC<MainWrapperPropsIF> = ({ children, className = '' }) => (
    <div className={`${styles.mainWrapper} ${className}`}>{children}</div>
);

export default MainWrapper;
```

- Пропсы в `*.types.ts`, дефолты у опциональных (`className = ''`).
- Кнопка — `Button` (`src/components/controls/Button`), не выдуманный `MainButton`.
- Картинки с бэка часто через `Img` (фон + `.bgc` + `normalizeImage`), не обязательно `next/image`.
- Кастомные SVG из `@/images/svg/*.svg` как React-компоненты. Иконки — `react-icons`.
- Даты — `dayjs`.

Шаблон страницы собирает колонки, не хром:

```tsx
const HomePageTPL: FC<HomePageTPLPropsIF> = ({ data }) => {
    const { lastNewsPromoData, calendarDefaultData, topAlbumsListData } =
        data || {};

    return (
        <>
            <Content>
                <RockDatesSection data={calendarDefaultData} />
                {!!lastNewsPromoData?.length && (
                    <LastNewsPromoSection
                        lastNewsPromoData={lastNewsPromoData}
                    />
                )}
                {!!topAlbumsListData?.length && (
                    <TopAlbumsSection data={topAlbumsListData} />
                )}
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </>
    );
};
```

---

## 9. Формы

Всегда `'use client'`. `react-hook-form` + `yup` + `yupResolver`. `mode: 'onSubmit'`.

Схема в `*.config.ts`. Сейчас в проекте схемы **без** `context`: `ObjectSchema<InterfaceIF>`, интерфейс полей — из `src/api/.../types.ts`.

Если появится многошаговая форма с `context` — тип выводить через `InferType<typeof schema>` (как в `rooles.md`). Сейчас таких форм нет.

Паттерн сабмита REST:

```tsx
const [registerUser, { isLoading }] = authApi.useRegisterUserMutation();

const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isValid },
} = useForm<RegistrationFieldsIF>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
});

const onSubmit = async (values: RegistrationFieldsIF): Promise<void> => {
    try {
        const result = await registerUser(values).unwrap();

        parseResponse(result, ({ errors }) => {
            if (errors?.length) {
                for (const { code, fieldName } of errors) {
                    if (fieldName && code) {
                        setError(fieldName as keyof RegistrationFieldsIF, {
                            type: 'manual',
                            message: ERRORS_CODES[code] ?? ERRORS_CODES.er900,
                        });
                    }
                }
                return;
            }

            reset();
            toast.success(SUCCESS_CODES.s104);
        });
    } catch (error) {
        toast.error(catchError(error).message);
    }
};
```

Лимиты полей — `VALIDATOR_FIELD` из `@/helpers/validation/validation.config`. Тексты — `ERRORS_CODES` / `SUCCESS_CODES`. Кнопка сабмита: `type="submit"`, `isLoading`, `disabled={!isValid}`.

Логин (JWT) — отдельный путь: `jwtApi.useLoginUserMutation()`, при успехе `setCookie` + `setSessionStorageItem`, при `403` — `setError('username', { message: ERRORS_CODES.er209 })`.

---

## 10. Стили

- Предпочтительно `*.module.scss`, классы **camelCase**.
- Глобальное — `src/styles/` (`global.scss`, `_variables.scss`, `_mixins.scss`, `_base.scss`, `_reset.scss`).
- Тема: класс `defaultTheme` на `body`, CSS-переменные из `$defaultTheme`.
- Раскладка строится на Flexbox (`display: flex`, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `gap`). CSS Grid (`display: grid`) не используется.
- Сокращение `flex` не писать. `flex-grow`, `flex-shrink` и `flex-basis` не использовать как обычный способ задать размер — только если шириной (`width`, `min-width`, `max-width`) раскладку не выразить.
- Место блока в родителе (`width`, `min-width`, `max-width`, `height`, `position`, `z-index`, внешний `margin` и их адаптив) задаёт SCSS родителя и передаётся пропом `className`. Модуль ребёнка описывает только содержимое.
- Медиа: `@use '@/styles/mixins' as *;` и `@include media(md) { ... }`. Медиамиксин вкладывается внутрь изменяемого класса, а не размещается на верхнем уровне. Брейкпоинты в `_variables.scss` (`xxs` … `desktop`).
- Вложенность селекторов — не больше трёх уровней. Без `!important`, кроме существующих утилит вроде `.d_none`.

Утилиты из `_base.scss` (можно вешать рядом с модулем):

- `.flc` / `.flcol` / `.flrow` — flex
- `.gapBlock` / `.gapLayout` — отступы
- `.bgc` — `background-size: cover; background-position: center`

```scss
@use '@/styles/mixins' as *;

.card {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;

    @include media(md) {
        gap: 12px;
        padding: 30px;
    }
}
```

---

## 11. Изображения и SVG

Бэк отдаёт готовые URL (`img80`, `img500`, `img900`, `origin`). Фронт не ресайзит.

`next/image` — когда нужен оптимизатор Next (есть `remotePatterns`). Часто в UI используется фон:

```tsx
<span
    className={`bgc ${styles.imgWrapper}`}
    style={{ backgroundImage: `url(${normalizeImage(url, type)})` }}
/>
```

SVG:

```tsx
import { IoArrowBackOutline } from 'react-icons/io5';
import MainLogoSVG from '@/images/svg/svg_main_logo.svg';
```

---

## 12. Даты

Бэк отдаёт GMT-строки (`dateGmt`, `modifiedGmt`, `postDate`). Форматирование только `dayjs`. Константы форматов — `src/configs/timeFormats.config.ts`.

```ts
import dayjs from 'dayjs';

const formatted = dayjs(dateString).format('DD MMM YYYY');
```

---

## 13. Хуки

Кастомные хуки в `src/hooks/`: `outsideClick.hook.ts`, `breakpoint/breakpoint.hook.ts`. Не тянуть `useSelector` напрямую, если есть `useAppSelector` — исключение: `useOutsideClick` пока читает `state.siteConfig.overlayStack` через `useSelector`.

---

## 14. Чеклист новой фичи

1. Роут есть в каталоге бэка? Если нет — не придумывать.
2. Публичный vs приватный. Сейчас приватный только `/users/get-current-user`. `/admin/*` на бэке закомментированы (возможно вернутся) — не вызывать.
3. Серверная страница → `endpoints.ts` / `fetchApi`. Клиентская мутация → RTK + регистрация в store.
4. Компонент в правильной категории, абсолютные импорты, `*.types.ts`.
5. Форма: схема в config, `parseResponse` + `catchError`, имена полей как на бэке.
6. Стили — модуль + утилиты, без новых глобальных классов без нужды.
