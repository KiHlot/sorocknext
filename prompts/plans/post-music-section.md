# Музыкальный альбом в посте

## Цель

Если у поста есть `postBase.music` с непустым `musicCode`, под видео (или сразу под промо, если видео нет) показать плеер альбома на всю ширину колонки. Высота блока 400px на всех ширинах. Подпись, обложку и прочие поля `albomInfo` не выводить.

## Контракт данных

Новых запросов нет. В `src/types/post.ts` поле уже есть:

```ts
music: MusicIF | null;
```

`MusicIF`: `musicCode` (готовый HTML iframe, как `videoCode` у видео) и `albomInfo` (`title`, `artists`, `year`, `coverImg`). `musicCode` не разбираем и не оборачиваем во второй iframe.

`null` и пустой `musicCode` — секцию не рендерить.

## UI

Одна секция `section` с `aria-label="Альбом"`. Внутри контейнер на 100% ширины и 400px высоты, скругление как у видео (`--borderRadius`), фон `--bgColorDark`. HTML из `musicCode` вставляется как есть, без постера и клика. Подпись `albomInfo` не показывается.

iframe растягивается на контейнер: у Яндекса в коде стоит своя высота 450px, её перекрываем стилем элемента, чтобы блок оставался 400px.

Часть кодов — не iframe, а виджет ВК (`div` + `script`). Скрипты из `innerHTML` браузер не запускает, поэтому секция клиентская и поднимает их по порядку: сначала внешний `src`, потом inline.

## Файлы

Создать:

- `src/components/sections/PostMusicSection/PostMusicSection.types.ts` — проп `music: MusicIF`
- `src/components/sections/PostMusicSection/PostMusicSection.component.tsx` — секция и вставка `musicCode`
- `src/components/sections/PostMusicSection/PostMusicSection.helpers.ts` — растянуть iframe и запустить скрипты виджета
- `src/components/sections/PostMusicSection/PostMusicSection.module.scss` — ширина 100%, высота 400px, iframe на весь контейнер

Изменить:

- `src/templates/PostTPL/PostTPL.component.tsx` — после `PostVideoSection`, до `PostContentSection`, рендер секции только при непустом `musicCode`

## Не делать

- Показывать `albomInfo` (название, артисты, год, обложка).
- Постер, кнопку play, отложенную подгрузку iframe.
- Парсить iframe и дописывать параметры.
- Отдельную высоту для мобильных: 400px на всех брейкпоинтах.
