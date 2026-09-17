# Паттерны разработки бэкенда (WordPress) — PHP 8.4

## 0. Общие правила кодирования

### Версия PHP

Проект работает на **PHP 8.4+**. Используются:

- **Типизированные константы класса:** `private const string X = '...'`
- **`readonly`-свойства:** `private readonly int $id`
- **`readonly class`:** для неизменяемых моделей (`Post_Model`, `Page_Model`)
- **Конструктор property promotion** — не используется
- **`match` вместо `switch`** — везде, где возможно
- **`??=`** для ленивой инициализации
- **`?->`** для null-safe вызовов
- **First-class callable:** `self::method(...)`
- **`catch (Exception)` без переменной** — когда `$e` не нужна

### Namespace

Проект **без namespace'ов**. Все классы и функции в **глобальном пространстве**.

**Следствие:** перед глобальными классами (`DateTime`, `Exception`, `WP_Error`, `WP_Query`, `WP_Post`, `WP_Term`, `WP_User`, `RuntimeException`, `InvalidArgumentException`) **не ставим `\`**.

```php
// ✅ Правильно
throw new RuntimeException('...');
$date = DateTime::createFromFormat('Y-m-d', $value);
} catch (Exception) {
    return null;
}

// ❌ Неправильно
throw new \RuntimeException('...');
$date = \DateTime::createFromFormat('Y-m-d', $value);
} catch (\Exception $e) {
    return null;
}
```

### Именование

- **Методы** — `snake_case`: `get_post_author()`, `update_email()`
- **Параметры** — `snake_case`: `$user_id`, `$post__not_in`, `$is_redirect`
- **Переменные** — `snake_case`: `$post_types`, `$is_valid`
- **Ключи JSON** — `camelCase`: `userId`, `avatarUrl`, `fullName`
- **Классы** — `PascalCase` с префиксами категорий:
    - `Site_Config`, `Site_Model`, `User_Model` — модели/конфиги
    - `Admin_Controller`, `Auth_Controller` — контроллеры
    - `Api_Helper`, `Validate` — хелперы
- **Файлы** — с префиксом `_` для автозагрузки: `_class-api-helper.php`, `_post-model.php`

### Форматирование

- **4 пробела** для отступов (не табы)
- **Открывающая `{` метода** — на следующей строке
- **PHPDoc** — на **всех** публичных методах и функциях
- **Секции** — в больших классах через `// =========`
- **Одинарные кавычки** для строк без интерполяции
- **Интерполяция** — без `{}` для простых переменных: `"Привет, $name"`

### Секции в классах

Большие классы (> 100 строк) разбиваются на **логические секции** с заголовками:

```php
// =====================================================================
// Название секции
// =====================================================================
```

Типичные секции:

- `Singleton` (для `Site_Config`)
- `Константы`
- `Состояние`
- `Публичные настройки` (для `Site_Config`)
- `Регистрация роутов`
- `Публичные эндпоинты`
- `Внутренние хелперы`
- `Модели ответа`

---

## 1. Архитектура

### Структура папок

```
theme/
├── functions.php              # Точка входа — подключение всех папок
├── index.php                  # Обязательный файл темы (заглушка)
├── style.css                  # Заголовок темы + CSS
├── readme.txt                 # Описание темы
├── helpers/
│   ├── index.php              # Автозагрузка helpers
│   ├── _class-api-helper.php  # Регистрация роутов, ответы, JWT
│   ├── _class-site-config.php # Singleton-конфиг
│   ├── _class-validate.php    # Валидация полей
│   ├── _mail_html.php         # HTML-шаблон писем
│   ├── _upload_image_file.php # Загрузка и масштабирование
│   └── _utils.php             # Утилиты
├── configs/
│   └── index.php              # Автозагрузка конфигов
├── site-setup/
│   ├── index.php              # Автозагрузка site-setup
│   ├── _debug.php             # Debug для локального окружения
│   ├── _jwt.php               # Настройка JWT
│   ├── _media.php             # Размеры изображений
│   ├── _options_page.php      # ACF-страницы настроек
│   ├── _reset_functions.php   # Отключение лишнего из WP
│   ├── _pt_autors.php         # Post type: autors
│   ├── _pt_cool.php           # Post type: cool
│   ├── _pt_news.php           # Post type: news
│   ├── _pt_nocommerce.php     # Post type: nocommerce
│   ├── _pt_reviews.php        # Post type: reviews
│   ├── _pt_rock_data.php      # Post type: rock-data
│   ├── _pt_stars.php          # Post type: stars (экспериментальный)
│   └── jsons/                 # JSON-кэш (cron_info_JSON и др.)
├── controllers/
│   ├── index.php              # Автозагрузка контроллеров
│   ├── _admin-controller.php
│   ├── _auth-controller.php
│   ├── _metadata_controller.php
│   ├── _news-controller.php
│   ├── _page-controller.php
│   ├── _search-controller.php
│   ├── _site-controller.php
│   ├── _taxonomy-controller.php
│   └── _users-controller.php
├── models/
│   ├── index.php              # Автозагрузка моделей
│   ├── _auth-model.php
│   ├── _page-model.php
│   ├── _post-model.php
│   ├── _search-model.php
│   ├── _site-model.php
│   ├── _taxonomy-model.php
│   └── _user-model.php
└── api/
    └── routes.php             # Регистрация всех роутов
```

### Точка входа — `functions.php`

```php
<?php

if (!defined('_S_VERSION')) {
    define('_S_VERSION', '1.0.0');
}

function add_admin_scripts(): void
{
    wp_enqueue_script('custom_js', get_template_directory_uri() . '/scripts.js', [], _S_VERSION, true);
    wp_enqueue_style('custom_css', get_template_directory_uri() . '/style.css', [], _S_VERSION);
}

add_action('admin_enqueue_scripts', 'add_admin_scripts', 25);

include_once 'helpers/index.php';
include_once 'configs/index.php';
include_once 'site-setup/index.php';
include_once 'controllers/index.php';
include_once 'models/index.php';
include_once 'api/routes.php';
```

### Автозагрузка через `index.php`

Каждая папка содержит `index.php`, который подключает все файлы с префиксом `_` и все вложенные `index.php`:

```php
<?php
foreach (glob(dirname(__FILE__) . '/_*.php') as $file) {
    include_once $file;
}

foreach (glob(dirname(__FILE__) . '/**/index.php') as $file) {
    include_once $file;
}
```

**Правило:** все PHP-классы и функции в папках — с префиксом `_` в имени файла.

### Принципы

- **Контроллеры** (`controllers/`) — обрабатывают HTTP-запросы, валидируют, вызывают модели, формируют ответ через `Api_Helper::response()`.
- **Модели** (`models/`) — бизнес-логика, работа с БД, ACF, WordPress API.
- **Хелперы** (`helpers/`) — вспомогательные классы и утилиты.
- **Конфигурация** — централизована в `Site_Config` (singleton).
- **Роуты** — регистрируются в `api/routes.php`.

### Поток данных

```
HTTP-запрос
  ↓
WP REST API (register_rest_route)
  ↓
Controller::method()
  ↓
Validate::check_request()  ← валидация
  ↓
Model::method()             ← бизнес-логика
  ↓
Api_Helper::response()      ← стандартизированный ответ
  ↓
JSON
```

---

## 2. Ядро (helpers/)

### 2.1. `Api_Helper`

**Файл:** `helpers/_class-api-helper.php`

Основной класс для работы с REST API.

**Константы:**

- `private const string API_ENDPOINT = '/rest'` — базовый префикс всех роутов

**Методы:**

- `public function public_route(string $route, array $callback): void` — регистрация публичного эндпоинта (без JWT).
- `public function private_route(string $route, array $callback): void` — регистрация приватного эндпоинта (с JWT-проверкой).
- `public static function check_permissions(WP_REST_Request $request): bool|WP_Error` — callback для `permission_callback` приватных роутов.
- `public function get_user_id_from_headers(?WP_REST_Request $request): ?int` — извлечение ID пользователя из JWT в `Authorization: Bearer <token>`.
- `public function response(?array $data = null, ?array $settings = null): array` — формирование стандартизированного ответа.
- `public function set_error(string $code, ?string $field_name = null, ?string $add_info = null): array` — создание структурированной ошибки.

**Пример регистрации роутов:**

```php
$this->api->public_route('/page/home-page-data', [$this, 'get_home_page_data']);
$this->api->private_route('/users/get-current-user', [$this, 'get_current_user']);
```

### 2.2. `Site_Config` (Singleton)

**Файл:** `helpers/_class-site-config.php`

Класс-конфигурация сайта. Хранит **все** настройки, справочники, пост-типы, правила валидации, роли.

**Singleton:**

```php
private static ?self $instance = null;

private function __construct() {}
private function __clone() {}

public function __wakeup(): void
{
    throw new RuntimeException('Cannot unserialize singleton');
}

public static function get_instance(): self
{
    return self::$instance ??= new self();
}
```

**Использование:**

```php
$config = Site_Config::get_instance();
$support_email = $config->emails['support'];
```

**Секции:**

- **Публичные настройки** — `$query_latest_posts_types`, `$time_format`, `$emails`, `$permitted_config`, `$cron_config`, `$admin_id`.
- **Пост-типы и категории** — `$post_types_config`, `$categories_config`.
- **Валидация** — `$VALIDATORS`, `$FIELDS`, `$VALIDATE_SORT`.
- **Роли и capabilities** — `$base_cap`, метод `get_roles()`.
- **Справочники** — `$countries_arr`, `$week_days_short_translate`, `$month_days_short_translate`.
- **Утилиты** — методы `get_site_url()`, `get_post_type_args()`, `generate_post_type_labels()`.

**Методы:**

- `public static function get_instance(): self` — получение singleton.
- `public function get_roles(): array` — список ролей с capabilities.
- `public function get_site_url(?string $type = null): ?string` — URL сайта (`full`, `decorated`, `server_name`, `back_local_domain`).
- `public function get_post_type_args(array $props): array` — генерация аргументов для `register_post_type()`.
- `private function generate_post_type_labels(array $props): array` — генерация labels для CPT.

### 2.3. `Validate`

**Файл:** `helpers/_class-validate.php`

Валидация входящих запросов по правилам из `Site_Config::$FIELDS` и `$VALIDATORS`.

**Конструктор:**

```php
public function __construct(?WP_REST_Request $credentials)
```

**Методы:**

- `public function check_request(string $route, ?int $user_id = null): array|false` — основная проверка. Возвращает **массив ошибок** или **`false`**, если ошибок нет.

**Принцип работы:**

1. Если маршрут **не описан** в `FIELDS` — возвращает `false` (валидация не требуется).
2. Если `$user_id` передан и в маршруте есть `capability` — проверяет права.
3. Для каждого поля:
    - Проверяет наличие (`isset`).
    - Если поле обязательно и отсутствует — ошибка `er200`.
    - Нормализует значение (`null`, `'null'`, `'undefined'` → `null`; строка → `sanitize_string`).
    - Прогоняет через валидаторы в порядке `VALIDATE_SORT`.

**Внутренние хелперы:**

- `private function normalize_value(mixed $value): mixed` — нормализация.
- `private function validate(string $field_name, mixed $value): ?array` — прогон через валидаторы.
- `private function run_validator(string $type, mixed $value, string $field_name, array $validator, bool $is_required): ?array` — запуск конкретного валидатора с тип-чекингом.

**Валидаторы:**

- `check_required`, `check_min_length`, `check_max_length`, `check_length`
- `check_email`, `check_email_uniq`, `check_text_only`, `check_space`
- `check_en_numbers_only`, `check_some`
- `check_is_number`, `check_phone`, `check_telegram`
- `check_less_then_now`
- `check_is_user_exist`, `check_is_page_exist`
- `check_file_size`, `check_file_type`

**Пример использования:**

```php
$errors = (new Validate($request))->check_request('registration');

if ($errors) {
    return $this->api->response(null, ['errors' => $errors]);
}
```

### 2.4. Утилиты (`_utils.php`)

**Файл:** `helpers/_utils.php`

Глобальные функции:

- `get_entity_id(string $slug, ?string $post_type = null): ?int` — ID поста по слагу или числовому ID.
- `sanitize_string(?string $text = null): string` — базовая санитизация (`trim` + `sanitize_text_field` + `strip_tags`).
- `hf_get_first_sentence(string $text, int $max_length = 0): string` — первое предложение.
- `hf_explode(?string $str, ?string $type = null): ?array` — разбиение строки по запятой.
- `array_or_null(array $array): ?array` — `null`, если массив пуст.
- `gf(string $name, int|string $id): string|array|bool|WP_Post|null` — получение ACF-поля.
- `uf(string $name, int|string $id, mixed $value): bool` — обновление ACF-поля.
- `gf_img(string $name, int|string $id, string $type = 'img900'): string|int|null` — изображение ACF.
- `save_json_file(mixed $data, string $title): bool` — сохранение в `site-setup/jsons/`.
- `get_json_file(string $filename): ?array` — чтение из `site-setup/jsons/`.
- `get_time(?string $type = null, ?int $gmt = null): string|int` — текущее время.

### 2.5. Почта (`_mail_html.php`)

**Файл:** `helpers/_mail_html.php`

```php
function _mail_html(string $title, string $body): string
```

Оборачивает контент письма в HTML-шаблон через **heredoc**. Использует `Site_Config::get_instance()->get_site_url('decorated')` для `<title>`.

**Правило:** интерполяция простых переменных без `{}`.

### 2.6. Загрузка изображений (`_upload_image_file.php`)

**Файл:** `helpers/_upload_image_file.php`

Глобальные константы:

- `UPLOAD_IMAGE_DEFAULT_QUALITY = 75`
- `UPLOAD_IMAGE_DEFAULT_RATIO = 0.6`

Функции:

- `upload_image_file(array $file, int $max_width = 1100, ?int $max_height = null): ?array` — загрузка + масштабирование + вставка в медиатеку. Возвращает `['attach_id' => int, 'url' => string]` или `null`.
- `_scale_image_file_to_blob(string $file, int $max_width, int $max_height): ?string` — масштабирование в бинарную строку.

Поддерживаемые типы: **GIF, JPEG, PNG, WebP**.

---

## 3. Модели (models/)

### 3.1. `Post_Model` (readonly class)

**Файл:** `models/_post-model.php`

Модель для работы с постами **всех** типов. **`readonly class`** — все свойства неизменяемы.

**Конструктор:**

```php
public function __construct(int|string|null $page_id = null)
```

**Публичные методы:**

- `get_seo_title(): string` — SEO-заголовок из Yoast (или fallback на `get_title()`).
- `get_title(?int $page_id = null): string` — заголовок поста (fallback на первое предложение).
- `get_h1(): string` — H1 из ACF или заголовок.
- `get_description(): string` — SEO-описание из Yoast.
- `get_post_metadata(): array` — SEO-данные для `generateMetadata`.
- `get_cover_image(string $type = 'img900'): ?string` — обложка.
- `get_inner_image(string $type = 'img900'): ?string` — внутреннее изображение.
- `get_categories(string $type = 'slug'): ?array` — категории поста (исключая `main_rub`).
- `get_tags(?string $format = null): ?array` — теги поста.
- `get_post_author(string $format = 'fullname', int $post_count = 5): string|array|null` — данные автора.
- `get_post_date(?string $type = null): string|int|null` — дата поста.
- `get_content(?string $format = null, int $cut_count = 0): string` — контент с очисткой.
- `get_country(string $type = 'value'): string` — страна события.
- `get_permalink(?int $page_id = null): string` — относительный URL.
- `get_post_base(): array` — полные данные поста для фронта.
- `get_latest_news_promo_model(): array` — данные поста для промо-блока.
- `public static function get_last_posts_by_type(array $post_type, ?int $posts_per_page = 3): ?array` — последние посты по типам.

**Приватные методы:**

- `get_yafeed_time(): string` — время в формате Yandex Feed.
- `get_clean_content()`, `get_autop_content()`, `get_default_content()` — варианты очистки контента.
- `get_reading_time(): int` — время чтения в минутах.

### 3.2. `User_Model`

**Файл:** `models/_user-model.php`

Модель пользователя. Работает с ACF (`user_{id}`).

**Конструктор:**

```php
public function __construct(int $user_id)
```

Если пользователь **не найден** — модель переходит в **«пустое» состояние** (`$user_data = null`, `$user_id = 0`). **Не бросает исключений.**

**Метод проверки:**

- `public function is_valid(): bool` — `true`, если модель связана с существующим пользователем.

**Принцип guard'ов:**

- **Единая точка проверки** — `get_acf()` / `set_acf()`. Все геттеры и сеттеры через ACF **не имеют** собственных guard'ов.
- **Методы с `wp_update_user` / `wp_set_password`** — guard **есть**.
- **Методы с `WP_Query`** — guard **есть**.
- **Чтение `$this->user_data->...` напрямую** — guard **есть** или null-safe `?->`.

**Публичные геттеры:**

- `get_id(): int`, `get_page_url(): string`
- `get_avatar(string $type = 'img500'): string|int|null`
- `get_uname(string $type = 'full'): ?string` — `full | name | last_name | as_is_name`
- `get_about(string $type = 'replace'): ?string`
- `get_birthdate(): ?string`, `get_country(): ?string`, `get_city(): ?string`
- `get_email(string $type = 'public'): ?string`
- `get_messenger(string $type): ?string` — `tg | wa`
- `get_phone(): ?string`
- `get_soclink(string $type): ?string` — `vk | in | fb | tt | yt`
- `get_soclist(): ?array`
- `get_author_posts_id(array $post__not_in = [-1], int $posts_per_page = 5): ?array`
- `get_role(): ?string`

**Публичные сеттеры:**

- `update_uname(?string $new_name, string $type): bool` — `first_name | last_name`
- `update_birthdate()`, `update_country()`, `update_city()`
- `update_email(?string $new_email, string $type = 'public'): bool`
- `update_messenger(?string $new_contact, string $type): bool`
- `update_phone()`, `update_signature()`, `update_soclink()`

**Подтверждение аккаунта:**

- `is_confirmed(): bool`
- `confirm_user(?string $confirm_code): bool`
- `set_new_password(string $new_password, string $confirm_code): bool`

**Миграция:**

- `migrate_user(): void`

**Модели ответа:**

- `get_user_model(): array` — полный публичный профиль.
- `get_current_user_model(): array` — сокращённый профиль текущего пользователя.

### 3.3. `Page_Model` (readonly class)

**Файл:** `models/_page-model.php`

Модель для страниц (не постов).

**Конструктор:**

```php
public function __construct(int|string|null $page_id = null)
```

**Методы:**

- `get_page_metadata(): array` — SEO-данные страницы.
- `get_latest_news_promo_data(array $post_type, ?int $posts_per_page = 3): ?array` — промо-данные последних постов.

### 3.4. `Taxonomy_Model`

**Файл:** `models/_taxonomy-model.php`

Модель для работы с таксономиями.

**Методы:**

- `get_posts_by_tag(int $tag_id): ?array` — посты по тегу, сгруппированные по годам.
- `get_published_posts_by_tag(int $tag_id): ?array` — ID опубликованных постов по тегу.
- `get_popular_tags(?string $type = null): ?array` — популярные теги. `json` — из кэша, иначе — из БД.

**Приватные методы:**

- `group_by_year(array $items): array`
- `sort_by_date_asc(array $a, array $b): int` (static)
- `get_popular_tags_from_json(): ?array`
- `get_popular_tags_from_db(): ?array`
- `get_tag_data(WP_Term|WP_Error|int|null $tag): ?array`

### 3.5. `Search_Model`

**Файл:** `models/_search-model.php`

Модель глобального поиска.

**Методы:**

- `get_search_data(WP_REST_Request $request): ?array` — данные поиска (посты + метаинформация).

**Приватные методы:**

- `get_searched_post_types(?string $requested_types): array`
- `get_searched_categories(?string $requested_categories): array`
- `get_allowed_post_types(): array`
- `get_allowed_category_ids(): array`
- `parse_requested_list(string $value): array`
- `format_post_data(WP_Post $post): array`

### 3.6. `Auth_Model`

**Файл:** `models/_auth-model.php`

Модель авторизации и писем.

**Методы:**

- `send_confirm_account_mail(string $email, int $user_id): bool` — письмо для подтверждения аккаунта.
- `send_reset_password_code_mail(string $email, int $user_id): bool` — письмо для сброса пароля.
- `send_changed_password_info_mail(string $email): bool` — уведомление о смене пароля.
- `get_default_user_data(array $credentials): array` — данные для регистрации.

**Приватные методы:**

- `generate_code(): int` — 6-значный код.
- `save_confirm_code(int $user_id, int $code): void`

### 3.7. `Site_Model`

**Файл:** `models/_site-model.php`

Модель общих данных сайта.

**Методы:**

- `send_contact_form_mail(array $params): bool` — отправка контактной формы.
- `get_trends_data(): ?array` — тренды (последние 10 постов).
- `set_cron_info(): ?array` — обновление cron-сводки.
- `set_popular_tags(): array` — обновление JSON популярных тегов.
- `set_users_info(): array` — обновление JSON пользователей.
- `pagination_model(?array $filtered_data, ?array $pagination, bool $is_redirect = false): array` — модель пагинации.

**Приватные методы:**

- `build_json_data_model(?array $data, string $label): array`

---

## 4. Контроллеры (controllers/)

### 4.1. Общая структура

Все контроллеры:

- Наследуют **`WP_REST_Controller`**.
- Имеют **`private readonly`** свойства: `$base_route`, `$api`, модели, `$site_config`.
- Регистрируют роуты в **`register_routes(): void`**.
- Публичные методы — **эндпоинты**.
- Приватные методы — **хелперы**.
- `Site_Config::get_instance()` — в конструкторе.
- Магические значения — в **константах класса**.

### 4.2. Шаблон контроллера

```php
<?php

class Some_Controller extends WP_REST_Controller
{
    // =====================================================================
    // Константы
    // =====================================================================

    private const string SOME_CONST = '...';
    private const int    SOME_LIMIT = 10;

    // =====================================================================
    // Состояние
    // =====================================================================

    private readonly string $base_route;
    private readonly Api_Helper $api;
    private readonly Site_Config $site_config;

    public function __construct()
    {
        $this->base_route  = '/some';
        $this->api         = new Api_Helper();
        $this->site_config = Site_Config::get_instance();
    }

    // =====================================================================
    // Регистрация роутов
    // =====================================================================

    public function register_routes(): void
    {
        $this->api->public_route($this->base_route . '/endpoint', [$this, 'some_method']);
    }

    // =====================================================================
    // Публичные эндпоинты
    // =====================================================================

    public function some_method(WP_REST_Request $request): array
    {
        $errors = (new Validate($request))->check_request('some-route');

        if ($errors) {
            return $this->api->response(null, ['errors' => $errors]);
        }

        return $this->api->response([
            'result' => 'data',
        ]);
    }
}
```

### 4.3. Список контроллеров

**`Admin_Controller`** — `/admin/*` (приватные), **пауза:** регистрация роутов на бэке закомментирована, фронт админки снят. Возможно вернутся. Не вызывать, пока снова не включат:

- `/get-cron-info`, `/update-cron-info`, `/update-cron-task`
- `/get-users-info`, `/update-users`, `/delete-users`
- `/update-roles`

**`Auth_Controller`** — `/auth/*` (публичные):

- `/registration`, `/send-confirm-code-mail`, `/confirm-email`
- `/send-reset-pass-code-mail`, `/reset-password`

**`Metadata_Controller`** — `/metadata` (публичный):

- `/metadata` — единая точка SEO-метаданных. Query: обязательный `type`
  (`page` / `archive` / `post` / `search`), опциональные `slug` и `param`.
  Для `page` пустой `slug` означает главную; для `archive` в `slug`
  передаётся post type; для `post` — слаг записи; для `search` поисковая
  фраза передаётся в `param`.

**`Archive_Controller`** — `/archive/*` (публичные), общий для всех пост-типов:

- `/archive` — архив. Query: обязательный `postType`, опциональный `page`.
  `page` отсутствует или `< 1` → первая; `page > archive_pages_count` → последняя.
- `/get-slugs` — слаги для SSG. Query: обязательный `postType`.
- `/metadata/{post_type}` — legacy SEO поста. Query: `slug`; новый фронт
  использует единый `/metadata`.
- `/{slug}` — одна запись. Query: `postType`. Временно здесь, будет перенесено
  в `Single_Controller`.
- `/archive` не принимает `pagesCount` от клиента. `data` содержит:

```php
[
    'postsData' => $archive_model->get_posts_archive(
        $post_type,
        $page_num,
    ),
    'paginationInfo' => [
        'currentPage' => $page_num,
        'pagesCount'  => $pages_max,
    ],
]
```

**`Page_Controller`** — `/page/*` (публичные):

- `/home-page-data`.

**`Search_Controller`** — `/search/*` (публичные):

- `/` (поиск), `/get-search-config`.

**`Site_Controller`** — `/site/*` (публичные):

- `/common-data`, `/filter-params`, `/send-contact-form`.

**`Taxonomy_Controller`** — `/taxonomy/*` (публичные):

- `/search-posts-by-tag`.

**`User_Controller`** — `/users/*`:

- `/filter` (public), `/get-user-data` (public)
- `/get-current-user` (private)

---

## 5. Формат ответа API

Все ответы проходят через **`Api_Helper::response()`**.

### Структура ответа

```json
{
    "result": "ok" | "errors" | "redirect" | "logout" | "notfound",
    "data": { ... } | null,
    "errors": [ ... ] | null,
    "redirectUrl": "..." | null
}
```

**Поля:**

| Поле | Тип | Описание |
|------|-----|----------|
| `result` | string | Статус ответа |
| `data` | object/null | Данные (при `result === 'ok'`) |
| `errors` | array/null | Массив ошибок (при `result === 'errors'`) |
| `redirectUrl` | string/null | URL для редиректа (при `result === 'redirect'`) |

### Структура ошибки

```json
{
    "code": "er200",
    "fieldName": "email",
    "addInfo": "Мин: 8"
}
```

| Поле | Тип | Описание |
|------|-----|----------|
| `code` | string | Код ошибки (`er200`, `er201`, ...) |
| `fieldName` | string/null | Имя поля (опционально) |
| `addInfo` | string/null | Доп. информация (опционально) |

### Примеры ответов

**Успех:**

```json
{
    "result": "ok",
    "data": {
        "userId": 23,
        "fullName": "Автор Контента"
    }
}
```

**Ошибки:**

```json
{
    "result": "errors",
    "data": null,
    "errors": [
        { "code": "er200", "fieldName": "email" },
        { "code": "er201", "fieldName": "password", "addInfo": "Мин: 8" }
    ]
}
```

**Редирект:**

```json
{
    "result": "redirect",
    "data": null,
    "redirectUrl": "https://sorock.ru/profile"
}
```

**Логаут:**

```json
{
    "result": "logout",
    "data": null
}
```

**404:**

```json
{
    "result": "notfound",
    "data": null
}
```

### Метод `response()`

```php
public function response(?array $data = null, ?array $settings = null): array
```

**Параметры:**

- `$data` — данные ответа (для `result: 'ok'`).
- `$settings` — настройки:
    - `errors` — массив ошибок (или одна ошибка).
    - `redirect` — URL для редиректа.
    - `logout` — флаг принудительного выхода.
    - `notfound` — флаг 404.

**Логика:**

- `result` определяется по наличию `errors`, `redirect`, `logout`, `notfound`.
- При `result === 'errors'` — массив нормализуется (одна ошибка → `[ошибка]`).
- При `result === 'redirect'` — добавляется `redirectUrl`.

### Метод `set_error()`

```php
public function set_error(
    string $code,
    ?string $field_name = null,
    ?string $add_info = null
): array
```

**Примеры:**

```php
$this->api->set_error('er900');
$this->api->set_error('er200', 'email');
$this->api->set_error('er201', 'password', 'Мин: 8');
```

### Правило вызова

**Всегда** передавайте ошибки массивом:

```php
// ✅ Правильно
return $this->api->response(null, [
    'errors' => [$this->api->set_error('er404')],
]);

// ✅ Тоже правильно (для одиночной ошибки)
return $this->api->response(null, [
    'errors' => $this->api->set_error('er200', 'email'),
]);

// ❌ Неправильно — ошибка потеряется
return $this->api->response(null, $this->api->set_error('er200'));
```

---

## 6. Валидация

Валидация — через класс **`Validate`**, правила — в **`Site_Config`**.

### Правила (`Site_Config::$VALIDATORS`)

Для каждого поля:

```php
'name' => [
    'min_length' => 2,
    'max_length' => 30,
    'text_only'  => true,
    'required'   => true,
],
```

### Маршруты (`Site_Config::$FIELDS`)

Для каждого маршрута:

```php
'registration' => [
    'fields' => ['name', 'surname', 'password', 'loginEmail', 'passwordConfirm'],
],
```

Если `capability` указан — проверяются права пользователя.

### Порядок валидации (`Site_Config::$VALIDATE_SORT`)

```php
['required', 'min_length', 'max_length', 'email', 'text_only', ...]
```

Валидаторы применяются **в этом порядке** — первый упавший возвращает ошибку.

### Типы валидации

- `required` — обязательное поле
- `min_length` / `max_length` / `length` — длина строки
- `email` / `is_uniq_email` — email
- `text_only` / `no_spaces` / `en_numbers_spec_symbols_only`
- `number` / `phone` / `telegram`
- `is_user_exist` / `is_page_exist`
- `some` — совпадение с другим полем
- `max_size` / `accept` — файлы
- `less_then_now` — дата меньше текущей

### Пример использования

```php
$errors = (new Validate($request))->check_request('registration');

if ($errors) {
    return $this->api->response(null, ['errors' => $errors]);
}
```

---

## 7. Работа с ACF

Используются обёртки: **`gf()`**, **`uf()`**, **`gf_img()`**.

### `gf()` — получение поля

```php
function gf(string $name, int|string $id): string|array|bool|WP_Post|null
```

**Примеры:**

```php
$h1 = gf('main_h1', $post_id);
$about = gf('prf_about', 'user_' . $user_id);
$cover = gf('tgg_cover_img', 'post_tag_' . $tag_id);
```

### `uf()` — обновление поля

```php
function uf(string $name, int|string $id, mixed $value): bool
```

Если `$value` — массив, используется `add_row()` (добавление строки в repeater).

**Примеры:**

```php
uf('main_h1', $post_id, 'Новый заголовок');
uf('is_activated', 'user_' . $user_id, true);
uf('usrmain_confirm_code', 'user_' . $user_id, null); // удаление
```

### `gf_img()` — изображение

```php
function gf_img(string $name, int|string $id, string $type = 'img900'): string|int|null
```

**Размеры:** `img80`, `img500`, `img900`, `origin`, `id`.

**Примеры:**

```php
$cover = gf_img('cover_img', $post_id);
$avatar = gf_img('avatar', 'user_' . $user_id, 'img80');
$image_id = gf_img('cover_img', $post_id, 'id');
```

### Префиксы ID

| Тип объекта | Формат ID | Пример |
|---|---|---|
| Пост | `{post_id}` | `123` |
| Пользователь | `user_{user_id}` | `user_23` |
| Таксономия | `{taxonomy}_{term_id}` | `post_tag_456` |
| Опции | `options` | `options` |

---

## 8. Пост-типы и таксономии

### Список CPT

- `news` — Новости
- `reviews` — Рецензии
- `cool` — Видео
- `autors` — Статьи
- `nocommerce` — Новый рок
- `rock-data` — Рок-дата

### Правило `singular` / `plural`

- `singular` — **единственное** число (`'Статья'`, `'Новость'`, `'Рецензия'`)
- `plural` — **множественное** число (`'Статьи'`, `'Новости'`, `'Рецензии'`)

**Пример:**

```php
register_post_type(
    $post_type,
    Site_Config::get_instance()->get_post_type_args([
        'singular'  => 'Статья',
        'plural'    => 'Статьи',
        'icon'      => 'dashicons-businessman',
        'post_type' => 'autors',
    ])
);
```

### Регистрация CPT

Файлы `_pt_{slug}.php` в `site-setup/`:

```php
<?php

function add_{slug}_post_type(): void
{
    $post_type = '{slug}';

    register_post_type(
        $post_type,
        Site_Config::get_instance()->get_post_type_args([
            'singular'  => '...',
            'plural'    => '...',
            'icon'      => 'dashicons-...',
            'post_type' => $post_type,
        ])
    );
}

add_action('init', 'add_{slug}_post_type');
```

### Добавление нового CPT (пошагово)

1. Создать `site-setup/_pt_new_type.php` (см. шаблон выше).
2. Добавить в `Site_Config::$post_types_config`:

   ```php
   'new_type' => [
       'label'           => 'Новые типы',
       'in_latest_posts' => true,
       'is_searched'     => true,
       'page_id'         => ...,
   ],
   ```

3. Создать контроллер `controllers/_new-type-controller.php` (если нужны свои эндпоинты).
4. Зарегистрировать роуты в `api/routes.php`.

### Таксономии

Проект использует **стандартные** таксономии:

- `category` — рубрики
- `post_tag` — теги

Дополнительные категории описаны в `Site_Config::$categories_config`.

---

## 9. Конфигурация

Все настройки — в **`Site_Config`** (singleton).

### Публичные настройки

| Свойство | Тип | Описание |
|---|---|---|
| `$query_latest_posts_types` | array | Типы для ленты последних постов |
| `$time_format` | array | Форматы дат (`date_with_time`, `date`) |
| `$emails` | array | Email-адреса (`support`) |
| `$permitted_config` | array | Настройки сайта |
| `$cron_config` | array | Конфигурация cron |
| `$admin_id` | int | ID администратора |
| `$post_types_config` | array | Конфиг пост-типов |
| `$categories_config` | array | Конфиг категорий |
| `$VALIDATORS` | array | Правила валидации |
| `$FIELDS` | array | Поля для маршрутов |
| `$VALIDATE_SORT` | array | Порядок валидации |
| `$countries_arr` | array | Список стран |
| `$week_days_short_translate` | array | Дни недели (перевод) |
| `$month_days_short_translate` | array | Месяцы (перевод) |

### Справочники

Статические данные (страны, дни недели, месяцы) хранятся **внутри `Site_Config`** (раньше были в `Site_Constants`).

### Использование

```php
$config = Site_Config::get_instance();

$support_email = $config->emails['support'];
$post_types = array_keys($config->post_types_config);
$validator = $config->VALIDATORS['email'] ?? null;
```

---

## 10. Правила и соглашения

### Код-стайл

- **PSR-12** + правила проекта.
- **4 пробела** — отступы.
- **Открывающая `{` метода** — на новой строке.
- **`(int)$x` без пробела** — правило проекта (принято в код-стайле).
- **Одинарные кавычки** для строк.
- **PHPDoc** — на всех публичных методах.
- **Секции** — в классах > 100 строк.

### Логика

- **`wp_reset_postdata()` — после чтения постов** (не до).
- **`array_map` вместо `foreach + array_push`** — где возможно.
- **Guard'ы на `null`** — где нужно.
- **`is_valid()`** — для моделей, которые могут быть «пустыми» (User_Model).

### Ошибки

- **Всегда `['errors' => [...]]`** — ошибки передаются массивом.
- **Коды ошибок `erXXX`** — единый префикс.
- **`er404`** — для not found (не `e404`).

### Singleton

- **`Site_Config::get_instance()`** — единственный доступ к конфигу.
- **`new Site_Config()`** — запрещено (конструктор приватный).

### Модели

- **`readonly class`** — для неизменяемых (`Post_Model`, `Page_Model`).
- **Nullable user_data** — в `User_Model` (без throw).
- **Единая точка guard** — в `get_acf()` / `set_acf()` для `User_Model`.

### Контроллеры

- **`extends WP_REST_Controller`** — все.
- **`register_routes(): void`** — единый формат.
- **`Site_Config::get_instance()`** — в конструкторе.
- **Приватные методы** — после публичных.

### Константы

- **Все константы класса** — с типом: `private const string X = '...'`.
- **Глобальные `const`** — без типа (или с типом, если PHP 8.3+).

---

## 11. Примеры типичных задач

### Регистрация нового публичного эндпоинта

1. В контроллере — метод:

   ```php
   public function my_method(WP_REST_Request $request): array
   {
       $errors = (new Validate($request))->check_request('my-route');

       if ($errors) {
           return $this->api->response(null, ['errors' => $errors]);
       }

       return $this->api->response([
           'result' => $this->my_model->do_something($request->get_params()),
       ]);
   }
   ```

2. В `register_routes()`:

   ```php
   $this->api->public_route($this->base_route . '/my-endpoint', [$this, 'my_method']);
   ```

3. В `Site_Config::$FIELDS`:

   ```php
   'my-route' => [
       'fields' => ['field1', 'field2'],
   ],
   ```

4. В `Site_Config::$VALIDATORS` — правила для полей.

### Добавление нового метода в модель

```php
public function my_method(int $param): ?array
{
    $result = ...;

    return array_or_null($result);
}
```

### Добавление нового поля ACF

1. В админке ACF — создать группу полей.
2. В коде — использовать через `gf()` / `uf()` / `gf_img()`.

---

## 12. Внешние зависимости

- **PHP** — 8.4+
- **WordPress** — 6.0+
- **Advanced Custom Fields (ACF)** — для кастомных полей
- **Yoast SEO** — для SEO-метаданных
- **JWT Authentication for WP-API** — для JWT
- **Firebase PHP-JWT** — библиотека для работы с JWT

---

## 13. Cron и JSON-кэш

В проекте есть **cron-задачи** для обновления JSON-файлов:

- `popular_tags_JSON` — популярные теги
- `users_info_JSON` — информация о пользователях
- `cron_info_JSON` — сводка по cron

**Расположение:** `site-setup/jsons/`.

**Обновление (пауза):** роуты `/admin/update-cron-task` и `/admin/update-cron-info` на бэке закомментированы, возможно вернутся. Пока JSON обновляется только cron-задачами на сервере, не через REST.

**Чтение:**

- `get_json_file('popular_tags_JSON')` — утилита из `_utils.php`.

---

## 14. JWT и авторизация

- **Плагин:** JWT Authentication for WP-API.
- **Секретный ключ:** `JWT_AUTH_SECRET_KEY` (в `wp-config.php`).
- **Алгоритм:** HS256 (по умолчанию), через фильтр `jwt_auth_algorithm`.
- **Время жизни:** 1 час (`JWT_TOKEN_LIFETIME = 3600`).

**Получение токена:**

```
POST /wp-json/jwt-auth/v1/token
{ "username": "...", "password": "..." }
```

**Использование:**

```
Authorization: Bearer <token>
```

**Извлечение ID:**

```php
$user_id = (new Api_Helper())->get_user_id_from_headers($request);
```

**TODO:** в будущем авторизация **будет удалена** (портал публичный).

---

## 15. Changelog паттернов

- **1.0.0** — первая версия паттернов после рефакторинга:
    - `Site_Config` — singleton.
    - Типизированные константы.
    - `readonly class` для `Post_Model` / `Page_Model`.
    - `User_Model::is_valid()` + nullable `user_data`.
    - Единая точка guard в `get_acf()` / `set_acf()`.
    - `Api_Helper` — убран `__construct`, `const string API_ENDPOINT`.
    - `Validate` — `array|false`, `run_validator()`.
    - Все контроллеры — секции, константы, `register_routes(): void`.
    - Post-types — правильные `singular` / `plural`.