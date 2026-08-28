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

## Переменные окружения

```
//.env
NEXT_PUBLIC_REST_BASE=/wp-json/rest
NEXT_PUBLIC_JWT_BASE=/wp-json/jwt-auth/v1

//.env.development
NEXT_PUBLIC_DOMAIN_URL=http://sorockwp.local
NEXT_PUBLIC_WP_HOST=st.sorockwp.local
NEXT_PUBLIC_REST_DOMAIN_URL=http://st.sorockwp.local

.env.production
NEXT_PUBLIC_DOMAIN_URL=https://sorock.ru
NEXT_PUBLIC_WP_HOST=st.sorock.ru
NEXT_PUBLIC_REST_DOMAIN_URL=https://st.sorock.ru
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

_Пример генерации СЕО и получения данных на странице `app/page.tsx` (здесь и далее несущественные импорты специально убраны):_

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
- Для работы со вспомогательными слайсами используй хуки `useAppDispatch()` и `useAppSelector()`
  - Важно: хуки уже типизированы — не нужно указывать типы вручную.
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

_Пример использования useAppDispatch() и useAppSelector():_

```tsx
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setIsLeftMenuOpened } from '@/store/slices/globalDataSlice';

const Component = () => {
    const dispatch = useAppDispatch();
    const isMenuOpened = useAppSelector(
        (state) => state.globalData.isLeftMenuOpened,
    );

    const toggleMenu = () => {
        dispatch(setIsLeftMenuOpened(!isMenuOpened));
    };

    return <button onClick={toggleMenu}>Toggle</button>;
};
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

## Формы (если используются)

- Все формы в проекте используют `react-hook-form` + `yup` для валидации.
- Формы всегда являются клиентскими компонентами (`'use client'`).
- Тип данных формы берется из интерфейса, который прокидывается в форму через дженерик, и прокидывается в форму через `ObjectSchema<InterfaceIF>`
- Тип может выводится из схемы Yup через `InferType` если в форме добавлен `context`.
- Каждая форма должна иметь:
    - `*.component.tsx` – сам компонент формы.
    - `*.config.ts` – схема валидации, константы, дефолтные значения.
    - `*.types.ts` – типы пропсов (если есть).

_Образец объявления формы без `context`:_

```tsx
const {
    handleSubmit,
    control,
    formState: { isValid },
    setError,
} = useForm<SendConfirmCodeMailIF>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
});
```

_Образец schema:_

```tsx
import { object, ObjectSchema, string } from 'yup';
import { SendConfirmCodeMailIF } from '@/api/auth/types';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';

export const schema: ObjectSchema<SendConfirmCodeMailIF> = object({
    email: string()
        .required(ERRORS_CODES.er200)
        .email(ERRORS_CODES.er203)
        .min(
            VALIDATOR_FIELD.email.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.email.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.email.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.email.maxLength}`,
        ),
});
```

_Образец формы с `context`:

```tsx
'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import { catchError } from '@/helpers/validation/error/error.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import CodeInput from '@/components/controls/CodeInput/CodeInput.component';
import {
    REGISTRATION_FORM_STEP,
    INPUT_NAMES,
    schema,
    RegistrationFormIF,
} from './RegistrationForm.config';

const RegistrationForm: FC = () => {
    const router = useRouter();
    const [step, setStep] = useState<keyof typeof REGISTRATION_FORM_STEP>(
        REGISTRATION_FORM_STEP.SetMail,
    );

    const [sendConfirmCode, { isLoading: isSendLoading }] =
        authApi.useSendConfirmCodeMutation();
    const [registerUser, { isLoading: isRegisterLoading }] =
        authApi.useRegisterUserMutation();

    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        reset,
        formState: { isValid },
    } = useForm<RegistrationFormIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        context: { step },
    });

    const onSubmit = async (values: RegistrationFormIF): Promise<void> => {
        if (step === REGISTRATION_FORM_STEP.SetMail) {
            // Первый шаг: отправка кода на email
            try {
                const result = await sendConfirmCode({
                    email: values.loginEmail,
                }).unwrap();

                parseResponse(result, ({ errors }) => {
                    if (errors?.length) {
                        for (const { code, fieldName } of errors) {
                            if (fieldName) {
                                setError(
                                    fieldName as keyof RegistrationFormIF,
                                    {
                                        type: 'manual',
                                        message: ERRORS_CODES[code] || code,
                                    },
                                );
                            }
                        }
                        return;
                    }
                    setStep(REGISTRATION_FORM_STEP.SetPassword);
                    toast.success('Код отправлен на ваш email');
                });
            } catch (error) {
                const { message } = catchError(error);
                toast.error(message);
            }
            return;
        }

        // Второй шаг: регистрация
        try {
            const result = await registerUser(values).unwrap();

            parseResponse(result, ({ errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName) {
                            setError(fieldName as keyof RegistrationFormIF, {
                                type: 'manual',
                                message: ERRORS_CODES[code] || code,
                            });
                        }
                    }
                    return;
                }
                reset();
                toast.success(SUCCESS_CODES.s104);
                setTimeout(() => router.push('/'), 2000);
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
                maxLength={30}
                isRemoveSpaces
                isRequired
            />
            <Input
                name="surname"
                label="Фамилия"
                control={control}
                isTextsOnly
                maxLength={30}
                isRemoveSpaces
                isRequired
            />
            <Input
                name="loginEmail"
                label="Email"
                control={control}
                isRemoveSpaces
                isRequired
            />

            {step === REGISTRATION_FORM_STEP.SetPassword && (
                <>
                    <Input
                        name="password"
                        label="Пароль"
                        control={control}
                        type="password"
                        isRequired
                        isPassword
                    />
                    <Input
                        name="passwordConfirm"
                        label="Подтверждение пароля"
                        control={control}
                        type="password"
                        isRequired
                        isPassword
                    />
                    <CodeInput
                        names={INPUT_NAMES}
                        name="confirmCode"
                        control={control}
                        clearErrors={clearErrors}
                        isDisabled={isSendLoading || isRegisterLoading}
                    />
                </>
            )}

            <MainButton
                type="submit"
                isLoading={isSendLoading || isRegisterLoading}
                disabled={!isValid}
            >
                {step === REGISTRATION_FORM_STEP.SetPassword
                    ? 'Зарегистрироваться'
                    : 'Получить код'}
            </MainButton>
        </form>
    );
};

export default RegistrationForm;
```

_Валидация формы с `context` и использование `InferType`:_

```tsx
import { object, ref, string, InferType } from 'yup';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';

export const REGISTRATION_FORM_STEP = {
    SetMail: 'setMail',
    SetPassword: 'setPassword',
} as const;

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema = object({
    name: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.name.minLength,
            `Мин: ${VALIDATOR_FIELD.name.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.name.maxLength,
            `Макс: ${VALIDATOR_FIELD.name.maxLength}`,
        ),
    surname: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.surname.minLength,
            `Мин: ${VALIDATOR_FIELD.surname.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.surname.maxLength,
            `Макс: ${VALIDATOR_FIELD.surname.maxLength}`,
        ),
    loginEmail: string()
        .required(ERRORS_CODES.er200)
        .email(ERRORS_CODES.er203)
        .min(
            VALIDATOR_FIELD.email.minLength,
            `Мин: ${VALIDATOR_FIELD.email.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.email.maxLength,
            `Макс: ${VALIDATOR_FIELD.email.maxLength}`,
        ),
    password: string().when(['$step'], ([step], schema) =>
        step === REGISTRATION_FORM_STEP.SetPassword
            ? schema
                  .required(ERRORS_CODES.er200)
                  .matches(
                      /^[a-zA-Z0-9!@#$%^()&*_-]+$/,
                      `${ERRORS_CODES.er206}. Допустимы латинские буквы, цифры и символы !@#$%^()&*_-`,
                  )
                  .min(
                      VALIDATOR_FIELD.password.minLength,
                      `Мин: ${VALIDATOR_FIELD.password.minLength}`,
                  )
                  .max(
                      VALIDATOR_FIELD.password.maxLength,
                      `Макс: ${VALIDATOR_FIELD.password.maxLength}`,
                  )
            : schema.optional(),
    ),
    passwordConfirm: string().when(['$step'], ([step], schema) =>
        step === REGISTRATION_FORM_STEP.SetPassword
            ? schema
                  .required(ERRORS_CODES.er200)
                  .oneOf([ref('password')], ERRORS_CODES.er204)
            : schema.optional(),
    ),
    confirmCode: string().when(['$step'], ([step], schema) =>
        step === REGISTRATION_FORM_STEP.SetPassword
            ? schema
                  .required(ERRORS_CODES.er200)
                  .length(
                      INPUT_NAMES.length,
                      `Введите ${INPUT_NAMES.length} цифр!`,
                  )
            : schema.optional(),
    ),
});

export type RegistrationFormIF = InferType<typeof schema>;
```

#### Ключевые моменты

- yupResolver(schema) — связывает react-hook-form с Yup.
- mode: 'onSubmit' — валидация только при отправке.
- context: { step } — передача дополнительных данных в схему.
- setError — ручная установка ошибок на поля (из ответа API).
- fieldName as keyof FormFields — приведение типа для TypeScript.
- parseResponse — стандартизированная обработка ответов.
- catchError — единообразная обработка ошибок.

#### Рекомендации

- Всегда используй `yupResolver` для валидации.
- Используй `context` для передачи переменных в схему.
- Для ошибок API используй `setError` с приведением типа.
- Формы всегда клиентские (`use client`).
- Разделяй схему, типы и компонент в разные файлы.
- Используй `parseResponse` для обработки ответов.
- Используй `catchError` для обработки ошибок.
- Состояние загрузки (`isLoading`) передавай в MainButton.
- Кнопка отправки дизейблится при `!isValid`.

---

## Стили

- **SCSS-модули** (`.module.scss`) — предпочтительный способ стилизации.
- Глобальные стили (сброс, переменные, миксины) находятся в `src/styles/`.
- Именование классов – **camelCase**.
- Вложенность селекторов — не более 3 уровней.
- Для медиа-запросов импортируй миксин из `@use '@/styles/mixins' as *;` и используй как `@include media(любой брейкпоинт){//some css}`.

---

_Пример использования стилей в компоненте `authlayout.module.scss`:_

```scss
@use '@/styles/mixins' as *;

.authLayout {
    display: flex;
    min-height: 100vh;
    background-color: var(--bg-primary);

    .content {
        flex: 1;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @include media(md) {
            padding: 30px;
        }
    }

    .backButton {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--text-secondary);
        transition: color 0.2s;

        &:hover {
            color: var(--text-primary);
        }
    }
}

.title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;

    h1 {
        font-size: 24px;
        font-weight: 600;
    }
}
```

_variables.scss:_

```scss
@use 'sass:map';

$colors: (
    white: #ffffff,
    black: #000000,
    textColor: #a8b6bb,
    colorPrimary: #0bb197,
    colorSecondary: #74788d,
    accent: #cf304d,
    bgColor: #303841,
    bgColorSecondary: #283039,
    bgColorDark: #21282f,
    blockQuoteBg: #272a31,
    grayDark: #1f2426,
    error: #8a4139,
    correct: #267873,
    info: #21495a,
    active: #1f2329,
);

$defaultThemeSettings: (
    boxShadow: 0 5px 12px rgba(map.get($colors, black), 0.1),
    elemShadow: rgba(map.get($colors, black), 0.24) 0px 3px 8px,
    textShadow: 1px 1px 2px map.get($colors, black),
    svgShadow: drop-shadow(1px 1px 0px rgba(map.get($colors, black), 0.5)),
    loadingGradient: linear-gradient(
            90deg,
            map.get($colors, bgColor),
            map.get($colors, bgColorSecondary),
            map.get($colors, bgColor)
        ),
    borderRadius: 8px,
    border: 1px solid rgba(map.get($colors, textColor), 0.05),
    borderError: 1px solid rgba(map.get($colors, error), 0.6),
    zIndexPopup: 70,
    zIndexMenu: 50,
    gapDesktop: 30px,
    gapBlock: 20px,
);

$defaultTheme: map.merge($colors, $defaultThemeSettings);

$breakpoints: (
    xxs: 340px,
    xs: 420px,
    sm: 576px,
    md: 768px,
    xmd: 890px,
    lg: 992px,
    xl: 1200px,
    xxl: 1500px,
    xxxl: 1700px,
    desktop: 2200px,
);
```

_В global.scss существуют утилитарные классы:_

```scss
// Flex
.flc {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flcol {
    display: flex;
    flex-direction: column;
}

.flrow {
    display: flex;
    flex-direction: row;
}

// Отступы
.gapBlock {
    gap: 16px;
}

.gapLayout {
    gap: 24px;
}

// Текст
.text-center {
    text-align: center;
}

.text-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

#### Рекомендации

- Предпочитай SCSS-модули глобальным стилям.
- Именуй классы в camelCase — authLayout, backButton, title.
- Используй переменные для цветов, размеров, шрифтов.
- Выноси повторяющиеся стили в миксины.
- Глобальные стили — только для сброса и базовых элементов (body, h1-h6, a).
- Вложенность селекторов — не более 3 уровней.
- Не используй !important без крайней необходимости.
- Проверяй стили на всех экранах (мобильные, планшеты, десктопы).
- Используй CSS-переменные для темной/светлой темы.
- Удаляй неиспользуемый CSS (используй модули, чтобы избежать конфликтов).

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

## Работа с датами

- Для форматирования используй библиотеку `dayjs`:

```ts
import dayjs from 'dayjs';
const formatted = dayjs(dateString).format('DD MMM YYYY');
```

---
