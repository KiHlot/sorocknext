# Промо последних новостей на главной

## Цель

На главной, в колонке контента, блок по композиции скрина: слева заголовок и вводный текст, справа карусель карточек. Один `h1`. В карусели 5 новостей, видна следующая карточка и точки слайдера. Данные — локальный мок. Запрос к бэку и поля `GET /page/home-page-data` не меняются.

## Контракт данных

Сейчас `lastNewsPromoData` в `D:\OSPanel635\home\sorocknext\src\api\page\types.ts` — массив постов (`titleH1`, `content`, `author: string | null`, `innerImg`, `country`, `readingTime`, `postDate`, `tags`, `taxonomies`). Отдельного заголовка секции, лида, кнопки и счётчиков в контракте нет. У модели промо на бэке нет `url`.

На этом шаге секция не читает проп. Мок лежит рядом с компонентом.

Левая колонка — статические строки в конфиге секции:

- `h1` на русском, одно слово цветом `accent`;
- короткий лид;
- ссылка «К новостям» на `/news`;
- три счётчика-заглушки (число и подпись).

Карточка мока:

- `title` — заголовок новости;
- `url` — внутренняя ссылка на материал;
- `innerImg` — пустая строка, обложка рисуется градиентом, пока нет файла;
- `postDate`, `country`, `readingTime`;
- `author` — `{ fullName, img80: null }` или `null`.

Пять записей. Когда подключим бэк, мок уберём и сопоставим поля с ответом. Для клика по карточке в ответе понадобится `url`; этого поля в текущей модели промо нет.

## UI

Секция остаётся внутри `Content` в `D:\OSPanel635\home\sorocknext\src\templates\HomePageTPL\HomePageTPL.component.tsx`. Сетку `menu | content | sidebar` не ломаем.

Фон блока — `bgColorDark`, скругление и тень как у других секций. По фону — тонкие дуги через inline SVG, без новых картинок и пакетов.

Слева, ширина около 40% от `xxl` и выше:

- один `h1`;
- лид цветом `textColor`;
- `Button` `variant="accent"`, `href="/news"`;
- ряд из трёх счётчиков: крупное число, под ним подпись.

Справа карусель на Swiper (уже в проекте):

- клиентский слайдер, секция может остаться серверной;
- `slidesPerView: auto`, фиксированная ширина слайда, `spaceBetween` из `--gapBlock`, без `loop`;
- на широкой колонке видна одна карточка и край следующей;
- точки под каруселью: неактивные приглушённые, активная — `accent`, это кнопки с `aria-label`;
- регион слайдера с `aria-label`.

Карточка:

- обложка сверху со скруглением;
- заголовок обычным текстом, не вторым `h1` и не `h2` секции;
- строка меты: дата через `formatDate`, страна, время чтения;
- ссылка-пилюля «Читать» на `url` новости;
- автор через `Author`, если есть имя.

Ниже `xxl` колонки друг под другом, как в архивном промо. На узкой ширине слайд на всю колонку, точки остаются.

Цвета только из `D:\OSPanel635\home\sorocknext\src\styles\_variables.scss`: `accent` вместо кораллового со скрина, `bgColorDark`, `white`, `textColor`. Текст NFT, цены в ETH и кнопка BID не переносятся.

## Файлы

- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoSection.component.tsx`
- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoSection.module.scss`
- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoSection.config.ts` — тексты левой колонки
- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoSection.mock.ts`
- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoSlider\LastNewsPromoSlider.component.tsx` — клиентский Swiper
- `D:\OSPanel635\home\sorocknext\src\components\sections\LastNewsPromoSection\LastNewsPromoCard\LastNewsPromoCard.component.tsx`
- стили слайдера и карточки рядом со своими компонентами
- `D:\OSPanel635\home\sorocknext\src\templates\HomePageTPL\HomePageTPL.component.tsx` — рисовать секцию и с пустым `lastNewsPromoData`, иначе мок не появится

`LastNewsPromoSection.types.ts` не переписывать под мок: тип пропсов секции остаётся. Тип карточки мока — в файле мока.

## Не делать

- Не вызывать `/page/home-page-data` по-новому и не править эндпоинты.
- Не обновлять `prompts/pattern-front.md` и `prompts/pattern-back.md`.
- Не ставить новую библиотеку карусели.
- Не выносить блок на всю ширину вьюпорта мимо колонки контента.
- Не делать цены, ставки и стопку чужих аватаров со скрина.
