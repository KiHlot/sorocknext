# Карточка события

## Цель

Превью дня в секции рок-дат показывает карточки как на скрине: обложка на всю карточку, тёмный градиент справа. Сверху вниз в текстовом блоке: заголовок, автор, теги, отрывок. Внизу футер: страна и «Скопировать ссылку» слева, «Читать» справа.

Имя компонента остаётся `EventCard`. Папка переезжает из секции в `src/components/cards/EventCard/`.

## Контракт данных

Эндпоинта нет. `GET /page/home-page-data` и `src/app/(site)/page.tsx` не меняем.

Мок по-прежнему в `src/components/sections/RockDatesSection/RockDatesSection.mock.ts`. Календарь на весь год не переписываем: на каждый день по-прежнему `RockDatesEventsPerDay` карточек. Поля карточки берутся из короткого каталога (4–5 записей в духе скрина) и чередуются по индексу события. Первая запись каталога — пример со скрина.

```ts
interface RockDateEventIF {
    id: string;
    monthDay: string; // MM-DD
    title: string;
    text: string;
    authorName: string;
    tags: string[];
    country: string; // код флага, как у Country, например gb
    cover: string;
    url: string;
}
```

Обложек в репозитории нет. В каталоге — URL картинок-заглушек (внешние стабильные картинки). Локальные файлы альбомов не кладём.

`url` — строка для кнопки «Читать» и копирования ссылки. Отдельной страницы под неё нет.

## UI

Карточка — `article` на всю ширину колонки. Высота по содержимому, скругление `--borderRadius`, обрезка по радиусу.

Фон — одно изображение на всю карточку (`background-size: cover`, слева). Справа поверх него градиент в `--bgColorDark`, чтобы текст читался. На `md` и уже градиент закрывает всю карточку, текст на всю ширину.

Блок сверху вниз, по центру правой части (на узком экране — по центру карточки):

- заголовок, `h2`, белый, жирный, по центру;
- имя автора, `--textColor`, по центру, без аватара;
- теги, `ul`, по центру, перенос. Чипы как у архивной карточки: фон `--bgColorDark`, текст `--colorSecondary`, без решётки и без ссылок;
- отрывок, до 4 строк, хвост обрезается многоточием, выравнивание по левому краю текстового блока.

Футер на всю ширину карточки. Слева страна (`Country` по коду из мока, круглая ячейка, подпись «Страна») и кнопка «Скопировать ссылку» (`Button`, `variant="sq"`, иконка ссылки, фон `--colorPrimary`). Справа «Читать» — `Button` с `href={url}`, вариант `secondary`, ширина по тексту.

«Скопировать ссылку» копирует `url` в буфер, если браузер даёт `clipboard`. Страна не кнопка.

На `sm` ряд футера переносится, «Читать» остаётся справа.

Секция рок-дат: импорт карточки из `cards`. Список событий дня — колонка с `gap`, не ряд узких карточек по 240px. Fade при смене дня и пустое состояние «В этот день событий нет» не трогаем.

## Файлы

Создать:

- `src/components/cards/EventCard/EventCard.component.tsx`
- `src/components/cards/EventCard/EventCard.module.scss`
- `src/components/cards/EventCard/EventCard.types.ts`

Удалить:

- `src/components/sections/RockDatesSection/EventCard/`

Изменить:

- `src/components/sections/RockDatesSection/RockDatesSection.types.ts` — поля карточки
- `src/components/sections/RockDatesSection/RockDatesSection.mock.ts` — каталог и подстановка полей
- `src/components/sections/RockDatesSection/RockDatesSection.component.tsx` — импорт и пропсы
- `src/components/sections/RockDatesSection/RockDatesSection.module.scss` — колонка карточек

## Не делать

- Кнопки «Нравится» и «В закладки», `aria-pressed`, лайки и закладки.
- Строка исполнителя.
- Запрос к бэку, новая страница по `url`.
- Новый вариант `Button`, CSS Grid, `clsx`, цвета вне токенов.
- Правки месяцев, дней, стрелок и логики високосного года.
- Обновление `prompts/pattern-front.md` и `prompts/pattern-back.md`.
