# Паттерны разработки фронтенда (Next.js)

## Типы и интерфейсы

- Все интерфейсы должны иметь постфикс IF, например UserIF, PageIF и так далее
- Все типы должны иметь постфикс T, например StepT, PageIF

_Наиболее важные типы и интерфейсы:_

```tsx
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

export interface Metadata {
    title: string;
    description: string;
    alternates: {
        canonical: string;
    };
    metadataBase: URL;
    openGraph: {
        title: string;
        description: string;
        url: string;
        images?: { url: string }[];
        type: string;
        publishedTime: string;
        modifiedTime: string;
        authors: string[];
        tags: string;
        locale: string;
        siteName: string;
    };
    twitter: {
        card: 'summary_large_image';
        title: string;
        description: string;
        images?: string[];
    };
    verification: {
        yandex: string;
    };
    other: {
        'article:publisher': string;
    };
}

export type ValueOfT<T> = T[keyof T];

export interface OptionIF {
    label: string;
    value: string;
}

export interface PageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        [key: string]: string | undefined;
    }>;
}

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

export interface RTQErrorIF {
    data?: string;
    error: string;
    originalStatus?: ValueOfT<typeof SERVER_CODES>;
    status: ValueOfT<typeof SERVER_CODES>;
}

export interface ServerErrorDetailsIF {
    data: {
        code?: string; //[jwt_auth] invalid_username
        message?: string;
        data: {
            status: ValueOfT<typeof SERVER_CODES>;
        };
    };
    status: ValueOfT<typeof SERVER_CODES>;
}

export interface CatchErrorIF {
    status: ValueOfT<typeof SERVER_CODES>;
    message: string;
}
```

---

## Серверное АПИ (получение и использование)

- Все страницы – серверные компоненты (по умолчанию).
- Для получения данных для страницы используй `fetchApi` внутри компонента.
- Для генерации SEO (metadata) используй `generateMetadata` до объявления функции страницы.
  Внутри используй вспомогательную функцию `getMetadata`
- Для генерации статических параметров используй `generateStaticParams` (например, для всех постов)

_Функция `fetchApi`:_

```tsx
export const fetchApi = async <DataIF = null,>(
    route: string,
    cache: RequestCache = 'force-cache',
): Promise<DataIF | null | undefined> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REST_DOMAIN_URL}${process.env.NEXT_PUBLIC_REST_BASE}${route}`,
            {
                cache,
                ...(token
                    ? {
                          credentials: 'include',
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                    : {}),
            },
        );

        const { result, data }: ResponseIF<DataIF> = await response.json();

        return result === 'ok' ? data : null;
    } catch (error) {
        console.error('error', error);
    }
};
```

_Функция `getMetadata`:_

```tsx
import { Metadata, SeoDataIF } from '@/types/post';

const DEFAULT_METADATA = {
    title: 'Sorock - Музыкальный портал',
    description: 'Новости, события и музыкальная культура на sorock.ru',
    canonical: 'https://sorock.ru',
    dateGmt: '',
    modifiedGmt: '',
    tags: ['события', 'музыка', 'новости'],
    author: 'SoRock Админ',
    innerImg: ogimg.src,
};

export const getMetadata = (seoData?: SeoDataIF | null): Metadata => {
    const data = {
        ...DEFAULT_METADATA,
        ...seoData,
    };

    return {
        metadataBase: new URL('https://sorock.ru'),
        title: data.title,
        description: data.description,
        alternates: {
            canonical: data.canonical,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            url: data.canonical,
            images: [{ url: data.innerImg }],
            type: 'article',
            publishedTime: data.dateGmt,
            modifiedTime: data.modifiedGmt,
            authors: [data.author],
            tags: data.tags?.join(','),
            locale: 'ru_RU',
            siteName: 'Музыкальный портал sorock.ru',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: data.innerImg ? [data.innerImg] : undefined,
        },
        verification: {
            yandex: '888427e5981495e7',
        },
        other: {
            'article:publisher': 'https://vk.com/spirit_rock_culture',
        },
    };
};
```

_Пример генерации СЕО и получения данных на странице `app/page.tsx` (здесь и далее не несущественные импорты специально убраны):_

```tsx
import type { Metadata } from 'next';
import { SeoDataIF } from '@/types/post';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import ...

export async function generateMetadata(): Promise<Metadata> {
    const data = await fetchApi<SeoDataIF>(`/page/metadata/home`);

    return getMetadata(data);
}

export default async function HomePage(): Promise<ReactElement> {
    const homePageData = await fetchApi<HomePageDataIF>('/page/home-page-data');

    return (
        <CommonLayout>
            <Content>
                <LastNewsPromoSection
                    className={styles.latestNews}
                    data={homePageData}
                />
            </Content>
            <Sidebar>
                <LoginWidget />
            </Sidebar>
        </CommonLayout>
    );
}
```

_Для статической генерации используй generateStaticParams (например, для всех постов)`app/news/[slug]/page.tsx`:_

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResponseIF } from '@/types/api';
import { PageProps } from '@/types/common';
import { PostIF, SeoDataIF } from '@/types/post';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    try {
        // Запрашиваем последние 100 новостей (можно увеличить или добавить пагинацию)
        const data = await fetchApi<ResponseIF<string[]>>(`/news/get-slugs`);

        if (data?.data?.length) {
            return data.data.map((slug) => ({
                slug,
            }));
        }
    } catch (error) {
        // Логируем ошибку, но не прерываем сборку
        console.warn(
            'Не удалось получить список слаг-ов для статической генерации',
            error,
        );
    }

    // Если нет данных, возвращаем пустой массив — всё будет работать динамически
    return [];
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const data = await fetchApi<SeoDataIF>(`/news/metadata/${slug}`);

    return getMetadata(data);
}

export default async function Page({
    params,
}: PageProps): Promise<ReactElement> {
    const { slug } = await params;

    try {
        const data = await fetchApi<PostIF>(`news/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
}
```

---

## Клиентское АПИ (получение и использование)

### Основные принципы

- Для клиентских запросов (с авторизацией и без) используется **RTK Query**.
- Клиентское апи (query и mutation) находятся в `src/api`.
- Все вспомогательные API-слайсы находятся в `src/store/slices`.
- RTK Query автоматически управляет кэшированием, состоянием загрузки и ошибками.
- Для запросов используется `fetchBaseQuery` с базовым URL из переменных окружения.
- Каждый API-слайс (query и mutation) из `src/api` состоит из:
    - `createApi` — создание экземпляра API.
    - `reducerPath` — уникальное имя для редюсера.
    - `baseQuery` — базовая конфигурация запросов.
    - `endpoints` — описание эндпоинтов (мутации и запросы).

_Пример объявления API-слайса (query и mutation) из `src/api/auth/auth.ts`_

```tsx
import { createApi } from '@reduxjs/toolkit/query/react';
import { ResponseIF } from '@/types/api';
import { RegistrationFieldsIF } from '@/api/auth/types';
import { fetchRestApiQuery } from '@/helpers/fetchRestApi/fetchRestApi';

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
    }),
});
```

_Пример использования хука RTK Query из `src/api/auth/auth.ts`:_

```tsx
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { RegistrationFieldsIF } from '@/api/auth/types';
import { MAGIC_NUMBERS } from '@/configs/config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { schema } from '@/components/forms/RegistrationForm/RegistrationForm.config';

const RegistrationForm: FC = () => {
    const router = useRouter();

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
                                message: ERRORS_CODES[code],
                            });
                        }
                    }

                    return;
                }

                reset();
                toast.success(SUCCESS_CODES.s104);
                setTimeout(
                    () => router.push('/login'),
                    MAGIC_NUMBERS.RedirectDelay,
                );
            });
        } catch (error) {
            const { message } = catchError(error);
            toast.error(message);
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                label="Имя"
                control={control}
                isTextsOnly
                maxLength={VALIDATOR_FIELD.name.maxLength}
                isDisabled={isLoading}
                isRemoveSpaces
            />
            //...
            <MainButton type="submit" isLoading={isLoading} disabled={!isValid}>
                Регистрация
            </MainButton>
        </form>
    );
};

export default RegistrationForm;
```

_Функция `parseResponse`:_

```tsx
import { toast } from 'react-toastify';
import { ResponseIF } from '@/types/api';
import { ParseResponseCallbackIF } from '@/helpers/fetchRestApi/fetchRestApi.types';
import { logout } from '@/helpers/logout/logout';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';

export const parseResponse = <DataT = null,>(
    data: ResponseIF<DataT>,
    callback: (payload: ParseResponseCallbackIF<DataT>) => void,
): void => {
    if (!data || !data.result) {
        toast.error(ERRORS_CODES.er900);
        return;
    }

    switch (data.result) {
        case 'ok':
        case 'errors': {
            callback({
                data: data?.data || null,
                errors: data?.errors || null,
            });
            break;
        }
        case 'logout': {
            toast.error(ERRORS_CODES.er222);
            logout();
            break;
        }
        case 'redirect': {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                toast.error(ERRORS_CODES.er900);
            }
            break;
        }
        case 'notfound': {
            toast.error(ERRORS_CODES.er900);
            break;
        }
        default: {
            toast.error(ERRORS_CODES.er900);
            break;
        }
    }
};
```

_Функция `catchError`:_

```tsx
import { ValueOfT } from '@/types/common';
import {
    SERVER_CODES,
    SERVER_ERRORS,
} from '@/helpers/validation/codes/codes.config';
import {
    CatchErrorIF,
    RTQErrorIF,
    ServerErrorDetailsIF,
} from '@/helpers/validation/error/error.types';

const isRTQError = (error: unknown): error is RTQErrorIF =>
    !!error &&
    typeof error === 'object' &&
    ('originalStatus' in error ||
        'error' in error ||
        ('data' in error && typeof error.data === 'string'));

const isServerError = (error: unknown): error is ServerErrorDetailsIF =>
    !!error &&
    typeof error === 'object' &&
    'data' in error &&
    !!error.data &&
    typeof error.data === 'object' &&
    'data' in error.data &&
    typeof error.data?.data === 'object';

export const catchError = (error: unknown): CatchErrorIF => {
    let status = null;

    if (isRTQError(error)) {
        status = error.originalStatus || error.status;
    }

    if (isServerError(error)) {
        status = error.status || error.data?.data?.status;
    }

    return {
        status: String(status || SERVER_CODES.C500) as ValueOfT<
            typeof SERVER_CODES
        >,
        message: SERVER_ERRORS[status || SERVER_CODES.C500],
    };
};
```

_Образец вспомогательного слайса (данные обновляются через хук useAppDispatch() и
получаем доступ к значению через useAppSelector()):_

```tsx
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
    isLeftMenuOpened: boolean;
}

const initialState: InitialState = {
    isLeftMenuOpened: false,
};

export const globalDataSlice = createSlice({
    name: 'globalDataSlice',
    initialState,
    reducers: {
        setIsLeftMenuOpened: (state, action) => {
            state.isLeftMenuOpened = action.payload;
        },
    },
});

export const { setIsLeftMenuOpened } = globalDataSlice.actions;
```

_Регистрация API-слайсов в Store (`src/store/store.ts`):_

```tsx
import {
    combineReducers,
    configureStore,
    EnhancedStore,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { globalDataSlice } from '@/store/slices/globalDataSlice';
import { adminApi } from '@/api/admin/admin';
import { authApi } from '@/api/auth/auth';
import { jwtApi } from '@/api/jwt/jwt';
import { pageApi } from '@/api/page/page';
import { siteApi } from '@/api/site/site';
import { taxonomyApi } from '@/api/taxonomy/taxonomy';
import { usersApi } from '@/api/users/users';

const rootReducer = combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [siteApi.reducerPath]: siteApi.reducer,
    [taxonomyApi.reducerPath]: taxonomyApi.reducer,
    [jwtApi.reducerPath]: jwtApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [pageApi.reducerPath]: pageApi.reducer,
    [globalDataSlice.reducerPath]: globalDataSlice.reducer,
});

export const makeStore = (): EnhancedStore<RootState> =>
    configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat([
                siteApi.middleware,
                taxonomyApi.middleware,
                jwtApi.middleware,
                authApi.middleware,
                usersApi.middleware,
                adminApi.middleware,
                pageApi.middleware,
            ]),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => ReturnType<typeof useDispatch> = () =>
    useDispatch();
```

### Рекомендации

- Всегда используй `unwrap()` для обработки ошибок в мутациях.
- Типизируй все ответы и тела запросов.
- Используй `catchError` для единообразной обработки ошибок.
- Для форм используй `parseResponse` — он обрабатывает errors, redirect, logout.
- Не используй RTK Query в серверных компонентах — только на клиенте.

---

## Компоненты

- Все компоненты лежат в `src/components/` по категориям:
    - `blocks/` – крупные составные блоки (секции, промо-блоки).
    - `controls/` – элементы форм (инпуты, кнопки, чекбоксы).
    - `elems/` – мелкие переиспользуемые элементы (аватар, логотип, иконка).
    - `interactive/` – интерактивные элементы (модалки, пагинация, табы).
    - `menus/` – меню (верхнее, левое).
    - `sections/` – секции страниц (футер, хедер, промо-секции).
    - `widgets/` – виджеты (последние новости, популярные теги).
- Каждый компонент может иметь модули:
    - `*.component.tsx` – сам компонент (только этот обязательно).
    - `*.module.scss` – стили (SCSS-модуль).
    - `*.types.ts` – типы пропсов и другие типы.
    - `*.helpers.ts/tsx` – вспомогательные функции для этого компонента.
    - `*.config.ts/tsx` – конфигурации/константы.
- В папке `src/layouts` лежат общие компоненты-обёртки.
- В папке `src/templates` лежат общие компоненты шаблонов для страниц (вероятнее всего будет переработано и удалено).
- Импорты: только абсолютные (@/components/...), без относительных (./, ../).

_Компонент `layouts/MainWrapper/MainWrapper.component.tsx`:_

```tsx
import { FC } from 'react';
import styles from '@/layouts/MainWrapper/MainWrapper.module.scss';
import { MainWrapperPropsIF } from '@/layouts/MainWrapper/MainWrapper.types';

const MainWrapper: FC<MainWrapperPropsIF> = ({ children, className = '' }) => (
    <div className={`${styles.mainWrapper} ${className}`}>{children}</div>
);

export default MainWrapper;
```

_Компонент `layouts/Layout/Layout.component.tsx`:_

```tsx
import { FC } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { LayoutPropsIF } from '@/layouts/Layout/Layout.types';

const Layout: FC<LayoutPropsIF> = ({ children }) => (
    <>
        {children}
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
        />
    </>
);

export default Layout;
```

_Компонент `app/layout.tsx` (App Router):_

```tsx
import { ReactElement } from 'react';
import { Inter } from 'next/font/google';
import '@/styles/global.scss';
import Layout from '@/layouts/Layout/Layout.component';
import StoreProvider from '@/app/StoreProvider';
import { LayoutIF } from '@/app/types';

const inter = Inter({ subsets: ['cyrillic'] });

export default async function RootLayout({
    children,
}: LayoutIF): Promise<ReactElement> {
    return (
        <html lang="ru">
            <body className={`${inter.className} defaultTheme`}>
                <StoreProvider>
                    <Layout>{children}</Layout>
                </StoreProvider>
            </body>
        </html>
    );
}
```

### Рекомендации по созданию компонентов

- Используй FC<Props> для типизации компонентов.
- Все пропсы должны быть типизированы в *.types.ts.
- Используй дефолтные значения для опциональных пропсов.
- Стили через SCSS-модули (.module.scss) с camelCase-классами.
- Клиентские компоненты (с хуками, формами) помечай 'use client'.
- Серверные компоненты — по умолчанию (без 'use client').
- Именование файлов — в kebab-case (кроме компонентов, они в PascalCase).

---

## Работа с датами

- Для форматирования используй библиотеку `dayjs`:

```ts
import dayjs from 'dayjs';
const formatted = dayjs(dateString).format('DD MMM YYYY');
```

---

## Изображения

- Все картинки хранятся на стороне бэкенда и приходят как прямые ссылки.
- Используй `next/image` с указанием `width` и `height`.
- Используй изображения как `background-image` инлайново через `style={{ backgroundImage: ... }}`.
    - Используй вспомогательный класс `.bgc` из `src/styles/_base.scss` для центрирования изображения как бэкграунда
- Для фоновых изображений — инлайн-стили с backgroundImage.

_Класс `.bgc`:_

```css
.bgc {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
```

_Пример использования `next/image`:_

```tsx
import Image from 'next/image';

const PostCard = ({ image, title }: PostCardProps) => (
    <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className={styles.image}
    />
);
```

_Пример использования как `background-image`:_

```tsx
<div
    className="bgc"
    style={{
        backgroundImage: `url(${imageUrl})`,
    }}
>
    <h1>{title}</h1>
</div>
```

---

## SVG

- SVG бывают двух типов:
    - Кастомные — хранятся в папке src/images/svg.
    - Из библиотеки react-icons — используются как готовые иконки.
- В проекте настроено использование SVG как React-компонентов.
- SVG импортируются как компоненты и используются напрямую в JSX.

_Пример: SVG из библиотеки `react-icons`:_

```tsx
import { IoArrowBackOutline } from 'react-icons/io5';
import ...

export default async function Layout({
    children,
}: LayoutIF): Promise<ReactElement> {
    return (
        <div className={authStyles.authLayout}>
	        <Link href="/" className={authStyles.backButton}>
		        <IoArrowBackOutline />
		        На главную
	        </Link>
	        {children}
        </div>
    );
}

```

_Пример: Кастомное SVG:_

```tsx
import MainLogoSVG from '@/images/svg/svg_main_logo.svg';
import ...

const MainLogo: FC<MainLogoPropsIF> = ({ className = '' }) => (
    <div className={`flc ${styles.mainLogoWrapper} ${className}`}>
        <MainLogoSVG />
        <Link href="/" aria-label="На главную" />
    </div>
);

export default MainLogo;
```

### Рекомендации

- Для иконок используй react-icons (библиотека уже установлена).
- Для логотипов и сложных SVG — кастомные файлы в src/images/svg/.
- Не используй dangerouslySetInnerHTML для SVG — используй компоненты.
- Все SVG должны быть оптимизированы (без лишних тегов и мусора).
- Для react-icons используй только необходимые иконки (они tree-shakeable).

---

## Стили

SCSS-модули (.module.scss) — предпочтительный способ.

Глобальные стили (сброс, переменные, миксины) – в src/styles/.

Именование классов – camelCase.

## Формы (если используются)

Для обратной связи и поиска можно использовать react-hook-form + yup (но они пока не обязательны, так как авторизация удалена).

Если формы есть, они должны быть клиентскими компонентами ('use client').
