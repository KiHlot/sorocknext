# Паттерны разработки бэкенда (WordPress) PHP 8.4

## Общая архитектура

_Структура папок:_

```
theme/
├── functions.php # Точка входа — подключение всех основных папок
├── helpers/
│ ├── index.php # Автозагрузка всех _*.php и **/index.php
│ ├── _class-api-helper.php # Регистрация роутов, формирование ответов, JWT
│ ├── _class-site-config.php # Конфигурация сайта (роли, пост-типы, валидаторы)
│ ├── _class-site-constants.php # Статические данные (страны, месяцы, дни недели)
│ ├── _class-validate.php # Валидация полей
│ ├── _mail_html.php # HTML-шаблон для писем
│ ├── _upload_image_file.php # Загрузка и масштабирование изображений
│ └── _utils.php # Утилиты: gf(), uf(), gf_img(), sanitize_string() и др.
├── configs/
│ └── index.php # Автозагрузка конфигураций
├── site-setup/
│ ├── index.php # Автозагрузка site-setup
│ └── jsons/ # JSON-файлы для кэширования (cron_info_JSON и др.)
├── controllers/
│ ├── index.php # Автозагрузка всех контроллеров
│ ├── _admin-controller.php
│ ├── _auth-controller.php
│ ├── _calendar-controller.php
│ ├── _music-controller.php
│ ├── _news-controller.php
│ ├── _page-controller.php
│ ├── _post-controller.php
│ ├── _publications-controller.php
│ ├── _shorts-controller.php
│ ├── _site-controller.php
│ ├── _sport-controller.php
│ ├── _taxonomy-controller.php
│ ├── _users-controller.php
│ └── _video-controller.php
├── models/
│ ├── index.php # Автозагрузка всех моделей
│ ├── _auth-model.php
│ ├── _feed-model.php
│ ├── _page-model.php
│ ├── _post-model.php
│ ├── _site-model.php
│ ├── _taxonomy-model.php
│ └── _user-model.php
└── api/
└── routes.php # Регистрация всех REST-роутов

```

_Загрузка файлов: `functions.php` (точка входа):_

```php
include_once('helpers/index.php');
include_once('configs/index.php');
include_once('site-setup/index.php');
include_once('controllers/index.php');
include_once('models/index.php');
include_once('api/routes.php');
```

#### Автозагрузка через `index.php`

_Каждая папка содержит `index.php`, который подключает все файлы с префиксом _ и все вложенные `index.php`:_

```php
foreach (glob((dirname(__FILE__) . '/_*.php')) as $file) {
    include_once $file;
}

foreach (glob((dirname(__FILE__) . '/**/index.php')) as $file) {
    include_once $file;
}
```

#### Принцип:

- Все файлы с префиксом _ загружаются автоматически.
- Все вложенные папки, содержащие index.php, также подключаются.

#### Принципы организации

- Контроллеры — обрабатывают HTTP-запросы, валидируют данные, вызывают модели, формируют ответ через Api_Helper::response().
- Модели — содержат бизнес-логику, работают с БД, ACF, WordPress API.
- Хелперы — вспомогательные классы и утилиты.
- Конфигурация — хранится в Site_Config и Site_Constants.
- Роуты — регистрируются в api/routes.php.

---

## Классы и их ответственность

### Хелперы (`helpers/`)

#### `Api_Helper`

Основной класс для работы с REST API.

**Методы:**

- `public_route(string $route, array $callback)` — регистрация публичного эндпоинта (без JWT).
- `private_route(string $route, array $callback)` — регистрация приватного эндпоинта (с JWT-проверкой).
- `response(?array $data = null, ?array $settings = null): array` — формирование стандартизированного ответа.
- `set_error(string $code, ?string $field_name = null, ?string $add_info = null): array` — создание структурированной ошибки.
- `get_user_id_from_headers(?WP_REST_Request $request): ?int` — извлечение ID пользователя из JWT-токена.
- `get_post_type_args(array $props): array` — генерация аргументов для регистрации CPT.

_Пример регистрации роута:_

```php
// Публичный
$this->api->public_route('/page/home-page-data', [$this, 'get_home_page_data']);

// Приватный (с JWT)
$this->api->private_route('/jwt/login', [$this, 'login']);
```

#### Site_Config

- Хранит конфигурацию сайта: роли, пост-типы, валидаторы, email-адреса, настройки.
- Основные свойства:
- $site_url — URL сайта (full, short, decorated, api_endpoint).
- $time_format — форматы дат.
- $emails — email-адреса (support).
- $roles — роли пользователей.
- $post_types — список пользовательских типов записей.
- $VALIDATORS — правила валидации для полей.
- $FIELDS — поля для каждого маршрута.
- $permitted_pages_types — разрешённые типы страниц.
- $permitted_pages_categories — разрешённые категории страниц.
- $permitted_settings — настройки сайта.

_Пример использования:_

```php
$site_config = new Site_Config();
$support_email = $site_config->emails['support'];
```

_Основные статические свойства:_

- $countries_arr — список стран (код → название).
- $month_ui — названия месяцев.
- $week_titles_full — названия дней недели.
- $user_menu — пункты меню пользователя.
- $query_post_types — типы записей для поиска/выборки.
- $global_post_types_ui — отображение пост-типов в интерфейсе.

#### Validate - Класс для валидации данных.

_Методы:_

- check_request(string $route, ?int $user_id = null): bool|array — проверка запроса по маршруту.
- Правила валидации (из Site_Config::$VALIDATORS):
- required — поле обязательно.
- min_length — минимальная длина.
- max_length — максимальная длина.
- email — проверка на email.
- is_uniq_email — проверка на уникальность email.
- is_user_exist — проверка существования пользователя.
- is_page_exist — проверка существования страницы.
- no_spaces — запрет пробелов.
- en_numbers_spec_symbols_only — только латиница, цифры и спецсимволы.
- text_only — только буквы.
- number — только цифры.
- length — точная длина.
- some — совпадение с другим полем (для пароля).
- max_size — максимальный размер файла.
- accept — допустимые MIME-типы файлов.

_Пример использования:_

```php
if ($errors = (new Validate($request))->check_request('registration')) {
    return $this->api->response(null, ['errors' => $errors]);
}
```

#### `utils.php` (глобальные функции):

_Функция и Описание:_

- gf(string $name, int $id): mixed - Получение ACF-поля.
- uf(string $name, int $id, mixed $value): bool - Обновление ACF-поля.
- gf_img(string $name, int $id, string $type): ?string - Получение изображения с указанным размером.
- get_entity_id(string $slug, ?string $post_type): ?int - Получение ID поста по слагу.
- sanitize_string(?string $text): string - Санитизация строки.
- hf_get_first_sentence(string $text, int $max_length): string - Извлечение первого предложения из текста.
- array_or_null(array $array): ?array - Возвращает null, если массив пуст.
- get_time(?string $type): string|int - Получение текущего времени.
- save_json_file(mixed $data, string $title): bool - Сохранение данных в JSON-файл.
- get_json_file(string $filename): ?array - Получение данных из JSON-файла.
- upload_image_file(array $file, int $max_width, ?int $max_height): ?array - Загрузка и масштабирование изображения.

---

## Контроллеры (controllers/)

Базовый принцип - Все контроллеры наследуют `WP_REST_Controller` и используют `Api_Helper` для регистрации роутов и формирования ответов.

#### Структура контроллера:

```php

class Some_Controller extends WP_REST_Controller
{
    private readonly string $base_route;
    private readonly Api_Helper $api;

    public function __construct()
    {
        $this->base_route = '/some';
        $this->api = new Api_Helper();
    }

    public function register_routes(): void
    {
        $this->api->public_route($this->base_route . '/endpoint', [$this, 'method']);
    }
}
```

#### Admin_Controller - Администрирование сайта.

_Приватные эндпоинты:_

- /admin/get-cron-info — получение информации о cron-задачах.
- /admin/update-cron-info — обновление информации о cron.
- /admin/update-cron-task — выполнение cron-задачи.
- /admin/get-users-info — получение информации о пользователях.
- /admin/update-roles — обновление ролей.
- /admin/update-users — миграция пользователей.
- /admin/delete-users — удаление пользователей.

#### Auth_Controller - Регистрация, подтверждение email, сброс пароля.

_Публичные эндпоинты:_

- /auth/registration — регистрация пользователя.
- /auth/send-confirm-code-mail — отправка кода подтверждения.
- /auth/confirm-email — подтверждение email (GET с email и confirmCode).
- /auth/send-reset-pass-code-mail — отправка кода для сброса пароля.
- /auth/reset-password — сброс пароля.

#### Site_Controller - Общие данные сайта.

Публичные эндпоинты:

- /site/common-data — тренды, популярные теги, supportEmail.
- /site/search — глобальный поиск.
- /site/send-contact-form — отправка контактной формы.

---

## Модели (models/)

#### Post_Model

Модель для работы с постами всех типов.

```php
- get_seo_title(): string	SEO-заголовок из Yoast (или fallback на get_title()).
- get_title(?int $page_id): string	Заголовок поста (с fallback на первое предложение).
- get_h1(): string	H1 из ACF или заголовок.
- get_description(): string	SEO-описание из Yoast.
- get_permalink(?int $page_id): string	Относительный URL поста.
- get_post_date(?string $type): string|int|null	Дата поста (для SEO — c, для фидов — yafeed).
- get_cover_image(string $type): ?string	Обложка поста.
- get_inner_image(string $type): ?string	Внутреннее изображение поста.
- get_post_author(string $format, int $post_count): string|array|null	Данные автора (fullname, avatar, ссылка).
- get_categories(string $type): ?array	Категории поста (исключая main_rub).
- get_tags(?string $format): ?array	Теги поста (name_arr, id_arr, thumb_type).
- get_content(?string $format, int $cut_count): string	Контент с очисткой (clean, autop).
- get_post_metadata(): array	SEO-данные для generateMetadata.
- get_post_base(): array	Полные данные поста для фронта.
```

#### User_Model

Модель для работы с пользователями.

```php
- get_user_model(): array Полный публичный профиль.
- get_current_user_model(): array Сокращённый профиль для текущего пользователя.
- get_avatar(string $type): string|int|null	Аватар пользователя.
- get_uname(string $type): ?string Имя пользователя (full, name, last_name).
- get_about(string $type): ?string	Описание пользователя.
- get_soclist(): ?array	Список соцсетей.
- get_author_posts_id(array, int): ?array	ID постов автора.
- is_confirmed(): bool	Проверка активации аккаунта.
- confirm_user(?string $confirm_code): bool Подтверждение аккаунта по коду.
- set_new_password(string, string): bool Установка нового пароля.
- migrate_user(): array Миграция данных пользователя из старых ACF-полей.
```

#### Page_Model

Модель для страниц (не постов).

```php
get_page_metadata(): array — SEO-данные для страницы.
```

Auth_Model
Модель для авторизации и отправки писем.

```php
- send_confirm_account_mail(string $email, int $user_id): bool — отправка письма для подтверждения аккаунта.
- send_reset_password_code_mail(string $email, int $user_id): bool — отправка кода для сброса пароля.
- send_changed_password_info_mail(string $email): bool — уведомление о смене пароля.
- get_default_user_data(array $credentials): array — подготовка данных для регистрации.
```

Site_Model
Модель для общих данных сайта.

```php
- get_trends_data(): ?array — последние 10 постов для трендов.
- get_search_data(WP_REST_Request $request): ?array — глобальный поиск.
- send_contact_form_mail(array $params): bool — отправка контактной формы.
- set_cron_info(): ?array — сохранение информации о cron-задачах.
- set_popular_tags(): array — сохранение популярных тегов.
- set_users_info(): array — сохранение информации о пользователях.
- pagination_model(?array, ?array, bool): array — модель пагинации.
```

Taxonomy_Model
Модель для работы с таксономиями.

```php
- get_posts_by_tag(int $tag_id): ?array — посты по тегу.
- get_popular_tags(?string $type): ?array — популярные теги (из JSON или из БД).
- get_published_posts_by_tag(int $tag_id): ?array — ID опубликованных постов по тегу.
```

---

## Формат ответа API

Все ответы API проходят через `Api_Helper::response()`. Это гарантирует единообразную структуру для всех эндпоинтов.

### Структура ответа

```json
{
    "result": "ok" | "errors" | "redirect" | "logout" | "notfound",
    "data": { ... } | null,
    "errors": [ ... ] | null,
    "redirectUrl": "..." | null
}
```

Поля:

| Поле |Тип | Описание|
| result | string |Статус ответа (ok, errors, redirect, logout, notfound)|
| data | object/null |Основные данные (при result === 'ok')|
| errors | array/null |Массив ошибок (при result === 'errors')|
| redirectUrl |string/null| URL для редиректа (при result === 'redirect')|

#### Структура ошибки

- Каждая ошибка в массиве errors имеет следующую структуру:

```json
{
    "code": "er200",
    "fieldName": "email",
    "addInfo": "Дополнительная информация"
}
```

_Примеры ответов_

- Успешный ответ (result: "ok")

```json
{
    "result": "ok",
    "data": {
        "userId": 23,
        "fullName": "Автор Контента",
        "email": "user@email.com"
    }
}
```

- Ответ с ошибками валидации (result: "errors")

```json
{
    "result": "errors",
    "data": null,
    "errors": [
        {
            "code": "er200",
            "fieldName": "email"
        },
        {
            "code": "er201",
            "fieldName": "password",
            "addInfo": "Мин: 8"
        }
    ]
}
```

- Ответ с редиректом (result: "redirect")

```json
{
    "result": "redirect",
    "data": null,
    "redirectUrl": "https://sorock.ru/profile"
}
```

- Ответ с логаутом (result: "logout")

```json
{
    "result": "logout",
    "data": null
}
```

- Ответ с 404 (result: "notfound")

```json
{
    "result": "notfound",
    "data": null
}
```

### Метод response()

Сигнатура:

```php
public function response(?array $data = null, ?array $settings = null): array
```

#### Параметры:

- $data — основные данные ответа (для result: "ok").
- $settings — настройки ответа:
- errors — массив ошибок (или одна ошибка).
- redirect — URL для редиректа.
- logout — флаг для принудительного выхода.
- notfound — флаг для 404.

#### Логика:

- Определяется result на основе переданных настроек.
- Формируется стандартизированный ответ.
- При result === 'errors' — массив errors нормализуется.
- При result === 'redirect' — добавляется redirectUrl.

#### Метод set_error()

Сигнатура:

```php
public function set_error(string $code, ?string $field_name = null, ?string $add_info = null): array
```

Примеры использования:

```php
// Ошибка без поля
$this->api->set_error('er900');
```

```php
// Ошибка с полем
$this->api->set_error('er200', 'email');
```

```php
// Ошибка с полем и доп. информацией
$this->api->set_error('er201', 'password', 'Мин: 8');
```

---

## Валидация

Валидация данных выполняется через класс `Validate`. Он проверяет входящие запросы по заранее описанным правилам.

### Класс Validate

**Сигнатура:**

```php
new Validate(WP_REST_Request $request)
```

#### Основной метод:

```php
public function check_request(string $route, ?int $user_id = null): bool|array
```

Параметры:

- $route — имя маршрута (ключ в Site_Config::$FIELDS).
- $user_id — ID пользователя для проверки прав (опционально).

Возвращает:

- true — если валидация прошла успешно.
- array — массив ошибок, если валидация не прошла.

#### Типы валидации

- required — поле обязательно для заполнения, код ошибки er200.
- min_length — минимальная длина строки, код ошибки er201.
- max_length — максимальная длина строки, код ошибки er202.
- email — проверка формата email, код ошибки er203.
- is_uniq_email — проверка уникальности email в БД, код ошибки er208.
- is_user_exist — проверка существования пользователя, код ошибки er209.
- is_page_exist — проверка существования страницы, код ошибки er214.
- text_only — только буквы (без цифр), код ошибки er206.
- number — только цифры, код ошибки er219.
- no_spaces — без пробелов, код ошибки er206.
- en_numbers_spec_symbols_only — только латиница, цифры и спецсимволы, код ошибки er206.
- some — совпадение с другим полем (для пароля), код ошибки er204.
- length — точная длина строки, код ошибки er221.
- max_size — максимальный размер файла (в МБ), код ошибки er215.
- accept — допустимые MIME-типы файлов, код ошибки er216.
- phone — проверка формата телефона, код ошибки er224.
- telegram — проверка Telegram-логина, код ошибки er225.
- less_then_now — дата меньше текущей, код ошибки er226.

### Ошибки валидации

Все ошибки валидации возвращаются в формате:

```json
{
    "result": "errors",
    "data": null,
    "errors": [
        {
            "code": "er200",
            "fieldName": "email"
        },
        {
            "code": "er201",
            "fieldName": "password",
            "addInfo": "Мин: 8"
        }
    ]
}
```

---

## Работа с ACF

В проекте используется Advanced Custom Fields (ACF) для хранения дополнительных данных.
Для работы с ACF созданы обёртки: `gf()`, `uf()` и `gf_img()`.

### Основные функции

#### `gf()` — получение ACF-поля:

```php
function gf(string $name, int|string $id): string|array|bool|WP_Post|null
```

_Параметры:_

- $name — название ACF-поля.
- $id — ID поста, пользователя (user_{id}) или таксономии (post_tag_{id}).
- Возвращает: значение ACF-поля или null, если поля нет.

_Примеры:_

```php
// Получение поля у поста
$h1 = gf('main_h1', $post_id);

// Получение поля у пользователя
$about = gf('prf_about', 'user_' . $user_id);

// Получение поля у тега
$cover = gf('tgg_cover_img', 'post_tag_' . $tag_id);
```

#### `uf()` — обновление ACF-поля

```php
function uf(string $name, int|string $id, mixed $value): bool
```

_Параметры:_

- $name — название ACF-поля.
- $id — ID поста, пользователя или таксономии.
- $value — новое значение.
- Возвращает: true при успехе, false при ошибке.

_Примеры:_

```php
// Обновление поля у поста
uf('main_h1', $post_id, 'Новый заголовок');

// Обновление поля у пользователя
uf('is_activated', 'user_' . $user_id, true);

// Удаление поля
uf('usrmain_confirm_code', 'user_' . $user_id, null);
```

#### `gf_img()` — получение изображения с размерами

```php
function gf_img(string $name, int|string $id, string $type = 'img900'): string|int|null
```

_Параметры:_

- $name — название ACF-поля (тип "Изображение").
- $id — ID поста, пользователя или таксономии.
- $type — размер изображения (img80, img500, img900, origin, id).
- Возвращает: URL изображения, ID или null.

_Примеры:_

```php
// Получение изображения в размере img900
$cover = gf_img('cover_img', $post_id);

// Получение изображения в размере img80
$avatar = gf_img('avatar', 'user_' . $user_id, 'img80');

// Получение ID изображения
$image_id = gf_img('cover_img', $post_id, 'id');

// Получение оригинального URL
$original = gf_img('cover_img', $post_id, 'origin');
```

### Префиксы для ID

_В ACF ID может быть разным в зависимости от типа объекта:_

| Тип объекта  | Формат ID              | Пример         |
| ------------ | ---------------------- | -------------- |
| Пост         | `{post_id}`            | `123`          |
| Пользователь | `user_{user_id}`       | `user_23`      |
| Таксономия   | `{taxonomy}_{term_id}` | `post_tag_456` |
| Опции        | `options`              | `options`      |

---

## Миграция ACF-полей

В User_Model есть метод migrate_user(), который переносит данные из старых ACF-полей в новые:

```php
public function migrate_user(): array
{
// Перенос основных полей
$this->update_uname(gf('prf_public_name', $this->user_ACF), 'first_name');
$this->update_uname(gf('prf_public_last_name', $this->user_ACF), 'last_name');
$this->update_birthdate(gf('prf_birthdate', $this->user_ACF));
$this->update_country(gf('prf_profile_bcountry', $this->user_ACF));
$this->update_city(gf('prf_profile_bcity', $this->user_ACF));
$this->update_email(gf('prf_public_mail', $this->user_ACF));
$this->update_phone(gf('prf_public_phone', $this->user_ACF));

    // Активация пользователя
    uf('is_activated', $this->user_ACF, true);

    // Перенос соцсетей
    foreach (['vk', 'in', 'fb', 'tt', 'yt'] as $type) {
        $this->update_soclink(gf('prf_profile_' . $type, $this->user_ACF), $type);
    }

    // Перенос аватара
    if ($image = get_field('prf_profile_img', $this->user_ACF)) {
        update_field('avatar', $image['id'], $this->user_ACF);
    }

    return [];
}
```

## Пост-типы и таксономии

В проекте используются стандартные и пользовательские типы записей (CPT) для организации контента. Управление пост-типами и таксономиями централизовано в `Site_Config` и `Site_Constants`.

---

### Список пост-типов

В `Site_Config::$post_types` перечислены все пользовательские типы записей:

```php
public array $post_types = [
    'archive' => [],
    'calendar' => [],
    'music' => [],
    'news' => [],
    'publications' => [],
    'shorts' => [],
    'sport' => [],
    'video' => [],
];
```

Каждый пост-тип имеет свой контроллер и модель, а также эндпоинты для получения данных.

Пост-типы для поиска и выборки

В Site_Constants::$query_post_types задаются типы записей, которые участвуют в поиске и выборках:

```php
static array $query_post_types = [
    "news",
    "reviews",
    "cool",
    "autors",
    "nocommerce",
    "rock-data",
];
```

Разрешенные типы страниц
В Site_Config::$permitted_pages_types и Site_Constants::$permitted_pages_types описаны типы страниц, доступные на сайте:

```php
static array $permitted_pages_types = [
    [
        "slug" => "news",
        "title" => "Новости",
        "accessLevel" => 1,
        "isSearched" => 1,
        "showForAddPost" => true,
        "hasArchive" => true,
        "id" => 209
    ],
    [
        "slug" => "reviews",
        "title" => "Рецензии",
        "accessLevel" => 3,
        "isSearched" => 1,
        "showForAddPost" => true,
        "hasArchive" => true,
        "id" => 211
    ],
];
```

Поля:

- slug — уникальный идентификатор.
- title — название для интерфейса.
- accessLevel — минимальный уровень доступа.
- isSearched — участвует в поиске.
- showForAddPost — показывать при добавлении поста.
- hasArchive — есть архивная страница.
- id — ID страницы в WordPress.

Разрешенные категории
В Site_Config::$permitted_pages_categories и Site_Constants::$permitted_pages_categories описаны категории для страниц:

```php
static array $permitted_pages_categories = [
    [
        "slug" => "alboms_rub",
        "uri" => "alboms",
        "title" => "Альбомы",
        "accessLevel" => 1,
        "isSearched" => 1,
        "showForAddPost" => true,
        "hasArchive" => true,
        "id" => 18,
        "pageId" => 15465
    ],
];
```

Поля:

- slug — слаг категории в админке.
- uri — слаг категории на фронте (для архивов).
- title — название категории.
- accessLevel — минимальный уровень доступа.
- isSearched — участвует в поиске.
- showForAddPost — показывать при добавлении поста.
- hasArchive — есть архивная страница.
- id — ID рубрики в WordPress.
- pageId — ID страницы архива.

Отображение в интерфейсе
В Site_Constants::$global_post_types_ui задаются названия пост-типов для интерфейса:

```php
static array $global_post_types_ui = [
    "news" => 'Новости',
    "reviews" => 'Рецензии',
    "cool" => 'Видео',
    "autors" => 'Посты',
    "nocommerce" => 'Новый рок',
    "rock-data" => 'Рок дата',
    "users" => 'Пользователи',
    "alboms" => 'Альбомы',
    "clips" => 'Клипы',
    "concerts" => 'Концерты',
    "rock-films" => 'Кино',
    "intervju" => 'Интервью',
    "okolorock" => 'Вокруг рока',
    "page" => 'Страница',
    "post" => 'Пост'
];
```

Регистрация пост-типов
Для регистрации пользовательских типов записей используется метод Api_Helper::get_post_type_args():

```php
public function get_post_type_args(array $props): array
{
    $defaults = [
        'labels' => $this->generate_post_type_labels($props),
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'query_var' => true,
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'has_archive' => true,
        'hierarchical' => false,
        'menu_position' => null,
        'menu_icon' => $props['icon'] ?? 'dashicons-admin-post',
        'supports' => ['title', 'editor', 'thumbnail', 'comments', 'author'],
        'taxonomies' => array_merge(
            ['category', 'post_tag'],
            $props['additional_taxonomies'] ?? []
        ),
        'show_in_rest' => true,
        'show_in_nav_menus' => true,
        'rewrite' => [
            'slug' => sanitize_title($props['rewrite']['slug'] ?? $props['post_type']),
            'with_front' => $props['rewrite']['with_front'] ?? false
        ],
    ];

    return wp_parse_args($props['args'] ?? [], $defaults);
}
```

Пример регистрации:

```php
register_post_type('music', (new Api_Helper())->get_post_type_args([
    'post_type' => 'music',
    'singular' => 'Музыка',
    'plural' => 'Музыка',
    'icon' => 'dashicons-format-audio',
    'args' => [
        'menu_position' => 5,
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    ],
]));
```

Таксономии
Проект использует стандартные таксономии WordPress:

- Категории (category) — для группировки постов.
- Теги (post_tag) — для ключевых слов и поиска.
- Категории дополнительно настраиваются через permitted_pages_categories, где задаются:
- Слаг для фронта (uri).
- Уровень доступа (accessLevel).
- Участие в поиске (isSearched).
- Использование в контроллерах

Получение категорий поста:

```php
public function get_categories(string $type = 'slug'): ?array
{
    $categories = get_the_category($this->page_id);

    if (empty($categories)) {
        return null;
    }

    $filtered = array_filter($categories, fn($cat) => $cat->slug !== 'main_rub');

    if (empty($filtered)) {
        return null;
    }

    return array_map(fn($cat) => $cat->$type, $filtered);
}
```

Получение тегов поста:

```php
public function get_tags(?string $format = null): ?array
{
    $tag_list = get_the_tags($this->page_id);

    if (!$tag_list) {
        return null;
    }

    return match ($format) {
        'name_arr' => array_map(fn($tag) => $tag->name, $tag_list),
        'id_arr' => array_map(fn($tag) => $tag->term_id, $tag_list),
        default => array_map(
            fn($tag) => [
                'value' => $tag->slug,
                'label' => $tag->name,
            ],
            $tag_list
        ),
    };
}
```

Добавление нового пост-типа

1. Добавить в Site_Config::$post_types:

```php
public array $post_types = [
    // ...
    'new_type' => [],
];
```

2. Добавить в Site_Constants::$query_post_types (если нужно):

```php
static array $query_post_types = [
    // ...
    "new_type",
];
```

3. Создать контроллер:

```php
// controllers/_new-type-controller.php
class New_Type_Controller extends WP_REST_Controller
{
    private readonly string $base_post_type;
    private readonly string $base_route;
    private readonly Api_Helper $api;

    function __construct()
    {
        $this->base_post_type = 'new_type';
        $this->base_route = '/new-type';
        $this->api = new Api_Helper();
    }

    public function register_routes()
    {
        $this->api->public_route($this->base_route.'/archive', [$this, 'get_archive']);
        $this->api->public_route($this->base_route.'/(?P<slug>.+)', [$this, 'get_single']);
    }

    public function get_single(WP_REST_Request $request): array
    {
        // ...
    }

    public function get_archive(): array
    {
        // ...
    }
}
```

4. Добавить в routes.php:

```php
(new New_Type_Controller())->register_routes();
```

5. Зарегистрировать пост-тип в WordPress (в functions.php или отдельном файле):

```php
register_post_type('new_type', (new Api_Helper())->get_post_type_args([
    'post_type' => 'new_type',
    'singular' => 'Новый тип',
    'plural' => 'Новые типы',
    'icon' => 'dashicons-admin-post',
]));
```

## Конфигурация

Вся конфигурация сайта централизована в двух классах: `Site_Config` и `Site_Constants`. Это позволяет легко управлять настройками, не разбрасывая их по всему коду.

---

### Site_Config

Класс для хранения изменяемой конфигурации сайта.

**Основные свойства:**

| Свойство                      | Тип   | Описание                                         |
| ----------------------------- | ----- | ------------------------------------------------ |
| `$site_url`                   | array | URL сайта (full, short, decorated, api_endpoint) |
| `$time_format`                | array | Форматы дат (date_with_time, date)               |
| `$emails`                     | array | Email-адреса (support)                           |
| `$roles`                      | array | Роли пользователей                               |
| `$post_types`                 | array | Список пользовательских типов записей            |
| `$VALIDATORS`                 | array | Правила валидации для полей                      |
| `$FIELDS`                     | array | Поля для каждого маршрута                        |
| `$permitted_pages_types`      | array | Разрешённые типы страниц                         |
| `$permitted_pages_categories` | array | Разрешённые категории страниц                    |
| `$permitted_settings`         | array | Настройки сайта                                  |
| `$cron_config`                | array | Конфигурация cron-задач                          |
| `$admin_id`                   | int   | ID администратора                                |

---

#### Настройки сайта

В `Site_Config::$permitted_settings` хранятся основные настройки:

```php
public array $permitted_settings = [
    'pageCategoryMode' => 6,        // режим выбора категорий
    'postTagsCount' => 10,          // количество тегов у поста
    'mediaAuthorsCount' => 3,       // количество авторов в медиа
    'addPostMinLevel' => 1,         // минимальный уровень для добавления поста
    'searchResultMaxCount' => 21,   // количество результатов поиска
    'bookmarkFeedCount' => 6,       // количество закладок в ленте
];
```

#### Cron-конфигурация

```php
public array $cron_config = [
'popular_tags' => [
'action' => 'popular_tags',
'jsonName' => 'popular_tags_JSON',
],
'users_info' => [
'action' => 'users_info',
'jsonName' => 'users_info_JSON',
]
];
Email-адреса
php
public array $emails = [
'support' => 'spirit.ofrock@bk.ru',
];
```

####Site_Constants
Класс для хранения статической конфигурации (данные, которые редко меняются).

Основные статические свойства:

Свойство Описание

- $countries_arr Список стран (код → название)
- $month_ui Названия месяцев
- $month_noun Названия месяцев в родительном падеже
- $month_ui_short Короткие названия месяцев
- $week_titles_full Названия дней недели
- $week_days_short_translate Перевод дней недели на английский
- $month_days_short_translate Перевод месяцев на английский
- $user_menu Пункты меню пользователя
- $query_post_types Типы записей для поиска/выборки
- $global_post_types_ui Отображение пост-типов в интерфейсе
- $archive_slugs Слаги архивных страниц

#### Страны

```php
static array $countries_arr = [
'sf' => 'World',
'us' => 'США',
'gb' => 'Великобритания',
'ua' => 'Украина',
'ru' => 'Россия',
// ...
];
```

#### Месяцы и дни недели

```php
static array $month_ui = [
"Январь",
"Февраль",
"Март",
"Апрель",
"Май",
"Июнь",
"Июль",
"Август",
"Сентябрь",
"Октябрь",
"Ноябрь",
"Декабрь",
];

static array $week_titles_full = [
"воскресенье",
"понедельник",
"вторник",
"среда",
"четверг",
"пятница",
"суббота"
];
```

#### Меню пользователя

```php
static array $user_menu = [
[
'slug' => 'overview',
'isPrivate' => false,
'label' => 'Обзор',
],
[
'slug' => 'commonFeed',
'isPrivate' => true,
'label' => 'Все новости',
],
// ...
];
```

### Использование конфигурации

В контроллерах:

```php
$site_config = new Site_Config();
$support_email = $site_config->emails['support'];
```

В моделях:

```php
$date = current_time($this->site_config->time_format['date_with_time']);
```

В хелперах:

```php
$country_label = Site_Constants::$countries_arr[$country_code] ?? 'World';
```

В валидации:

```php
$rules = $this->site_config->VALIDATORS[$field_name] ?? null;
```

Добавление новой настройки

1. Добавить в Site_Config:

```php
public array $permitted_settings = [
// ...
'new_setting' => 'default_value',
];
```

2. Использовать в коде:

```php
$value = $this->site_config->permitted_settings['new_setting'];
```

3. Если настройка статическая — добавить в Site_Constants:

```php
static array $new_data = [
'key' => 'value',
];
```
