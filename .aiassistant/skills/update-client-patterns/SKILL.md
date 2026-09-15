---
name: update-client-patterns
description: Syncs third-party pattern docs in prompts/ (pattern-front.md, pattern-back.md, rooles.md, structure.txt) after API, architecture, or coding-convention changes. Use when adding or renaming REST endpoints, changing ResponseIF/parseResponse/fetchApi, component/file conventions, forms, styles, or when the user mentions prompts, patterns, pattern-front, pattern-back, сторонние клиенты, or asks to update documentation for other agents/clients.
---

# Обновление клиентских паттернов

Файлы в `prompts/` пишутся **для сторонних клиентов** (другие агенты, подрядчики, внешние чаты). Агент в этом репозитории работает по `.cursor/rules/*.mdc` и по коду.

Не подменять правила Cursor текстом из `prompts/`. Наоборот: сначала код и `.mdc`, потом выровнять `prompts/`.

## Когда обновлять

Обязательно, если изменилось любое из:

- каталог REST-роутов, публичный/приватный доступ, JWT;
- конверт `ResponseIF`, `parseResponse` / `catchError`, `fetchApi`;
- слои сервер (`endpoints.ts`) vs клиент (RTK);
- имена полей форм, постфиксы `IF`/`T`, раскладка файлов компонента;
- стек, env, SEO/`generateMetadata`, store.

Не трогать `prompts/` из‑за локального бага, копирайта, одноразового рефакторинга без смены паттерна.

## Источники истины

| Тема | Источник | Клиентский файл |
| --- | --- | --- |
| REST, ошибки, JWT, эндпоинты | бэкенд + `api-contract.mdc`, `api-endpoints.mdc`, `backend-reference.mdc` | `prompts/pattern-back.md` (контракт), фрагменты API во `pattern-front.md` |
| Фронт: страницы, RTK, формы, стили, компоненты | `src/` + `react-*.mdc`, `scss-*.mdc` | `prompts/pattern-front.md` |
| Роли ассистента, общие запреты | согласовать с `00-project.mdc` | `prompts/rooles.md` |
| Дерево `src/` | факт в репозитории | `prompts/structure.txt` (`npm run prompt`) |

Если код и `.mdc` разошлись — править `.mdc` под код (или спросить). В `prompts/` не закреплять баги.

## Как писать клиентские файлы

- Аудитория не видит `.cursor/rules`. Паттерн должен читаться отдельно: принцип + короткий пример из текущего `src/`.
- Не копировать `.mdc` целиком и не раздувать до 1000+ строк устаревших листингов.
- Реальные пути (`@/configs/magicNumbers.config`, `Button`, `siteConfig`, `STORAGE_KEYS.Token`).
- Роуты — только из каталога бэка. Несуществующий URL не документировать «на вырост».
- `pattern-front.md`: как писать Next-фронт. `pattern-back.md`: как устроен WP-бэк (его правит тот, у кого актуальная PHP-тема; здесь — только если пользователь дал свежий контракт).

## Порядок работы

1. Список фактов, которые изменились (роуты, имена, слои).
2. Обновить соответствующий `.mdc`, если правило агента тоже устарело.
3. Внести те же факты в нужный файл `prompts/`.
4. Если менялась структура папок `src/` — `npm run prompt` (пишет `prompts/structure.txt`).
5. Кратко сказать пользователю, какие клиентские файлы обновлены.

## Не делать

- Не считать `prompts/` руководством для правок в этом репо, если оно противоречит `.mdc` или бэкенду.
- Не обновлять паттерны «за компанию» в каждом PR с UI-текстом или фиксом опечатки.
