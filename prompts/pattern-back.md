# Паттерны разработки бэкенда

## Текущий бэкенд: WordPress REST API
**Базовый URL**: `/rest/` (локально `https://st.sorockwp.local/rest/`, продакшн `https://sorock.ru/rest/`).
**Все публичные эндпоинты** (без авторизации) перечислены в контроллерах:
- `Page_Controller`: `/page/home-page-data` – данные для главной.
- `News_Controller`, `Music_Controller`, `Sport_Controller`, `Video_Controller`, `Shorts_Controller`, `Publications_Controller`, `Calendar_Controller`:
    - `/archive` – список последних записей (пока без пагинации, 10 штук).
    - `/(?P<slug>.+)` – одиночная запись (возвращает `postBase`).
    - `Taxonomy_Controller`: `/taxonomy/search-posts-by-tag` – поиск по тегу.
    - `Site_Controller`: `/site/common-data` – тренды, популярные теги, supportEmail; `/site/search` – глобальный поиск.

**Формат ответа**: все ответы проходят через `Api_Helper::response()`:
```json
  {
    "result": "ok" | "errors" | "redirect" | "logout" | "notfound",
    "data": { ... },          // если result === "ok"
    "errors": [ ... ]         // если result === "errors"
  }
```

## Изображения: 
у постов есть featured_image с размерами img80, img500, img900. Используй их в next/image с указанием width и height.