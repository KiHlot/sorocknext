# Паттерны разработки фронтенда (Next.js)

## Структура страниц (App Router)
- Все страницы – серверные компоненты (по умолчанию).
- Для получения данных используй `fetch` внутри компонента (или вынесенные функции из `src/api/`).
- Пример получения данных на странице:

```tsx
  import { fetchNewsArchive } from '@/api/news/endpoints';

  export default async function NewsPage() {
    const data = await fetchNewsArchive({ page: 1, perPage: 10 });
    // ...
  }
  ```
Для статической генерации используй generateStaticParams (например, для всех постов):
```tsx
export async function generateStaticParams() {
const posts = await fetchAllPosts();
return posts.map((post) => ({ slug: post.slug }));
}
```
Для обновления контента используй revalidate в fetch или в next.config.js.

## Компоненты
Все компоненты лежат в src/components/ по категориям:
- blocks/ – крупные составные блоки (секции, промо-блоки).
- controls/ – элементы форм (инпуты, кнопки, чекбоксы).
- elems/ – мелкие переиспользуемые элементы (аватар, логотип, иконка).
- interactive/ – интерактивные элементы (модалки, пагинация, табы).
- menus/ – меню (верхнее, левое).
- sections/ – секции страниц (футер, хедер, промо-секции).
- widgets/ – виджеты (последние новости, популярные теги).

Каждый компонент должен иметь:

- *.component.tsx – сам компонент.
- *.module.scss – стили (SCSS-модуль).
- *.types.ts – типы пропсов и другие типы.

Импорты: только абсолютные (@/components/...), без относительных (./, ../).

## Работа с API
Все функции для работы с WordPress REST API находятся в src/api/.

Каждый тип контента (news, music, sport, video, shorts, publications, calendar, taxonomy, site, page) имеет свою папку с endpoints.ts, types.ts, urls.ts.

Эндпоинты используют базовый URL из конфига (переменная окружения).

Ответы от API стандартизированы: { result: 'ok' | 'errors', data: ... }. На фронте проверяй result === 'ok'.

## Изображения

Используй next/image с указанием width и height.

В next.config.ts настроены remotePatterns для доменов WordPress.

Для SVG используй импорт с ?url и передавай в src компонента Image.

## Стили
SCSS-модули (.module.scss) — предпочтительный способ.

Глобальные стили (сброс, переменные, миксины) – в src/styles/.

Именование классов – camelCase.

## SEO
Метаданные генерируются на сервере через export const metadata в layout.tsx и страницах.

Для динамических страниц используй generateMetadata.

Используй хелперы из src/helpers/seo.ts (если есть).

## Формы (если используются)
Для обратной связи и поиска можно использовать react-hook-form + yup (но они пока не обязательны, так как авторизация удалена).

Если формы есть, они должны быть клиентскими компонентами ('use client').

## Обработка ошибок
На страницах используй not-found.tsx для 404.

Для ошибок API показывай заглушку или сообщение.