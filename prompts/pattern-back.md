# Паттерны разработки бэкенда (WordPress) — PHP 8.4

## 0. Общие правила кодирования

### Версия PHP

Проект работает на **PHP 8.4+**. Используются:

- **Типизированные константы класса:** `private const string X = '...'`, `private const array Y = [...]`, `private const int Z = 10`
- **`readonly`-свойства:** `private readonly int $id`
- **`readonly class`:** для неизменяемых моделей (`Post_Model`, `Page_Model`)
- **Конструктор property promotion** — не используется
- **`match` вместо `switch`** — везде, где возможно
- **`??=`** для ленивой инициализации
- **`?->`** для null-safe вызовов
- **First-class callable:** `self::sort_by_date_asc(...)`, `fn(...)`
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
  - `Site_Config`, `Site_Model`, `User_Model`, `Archive_Model` — модели/конфиги
  - `Admin_Controller`, `Auth_Controller` — контроллеры
  - `Api_Helper`, `Validate` — хелперы
- **Файлы** — с префиксом `_` для автозагрузки: `_class-api-helper.php`, `_post-model.php`, `_archive-controller.php`
- **CPT-файлы** — `_pt_{slug}.php` (`_pt_news.php`, `_pt_rock_data.php`)

### Форматирование

- **4 пробела** для отступов (не табы)
- **Открывающая `{` метода** — на следующей строке
- **PHPDoc** — на **всех** публичных методах и функциях
- **Секции** — в больших классах через `// =========`
- **Одинарные кавычки** для строк без интерполяции
- **Интерполяция** — без `{}` для простых переменных: `"Привет, $name"`
- **Отбивка оператора `?->`, `??`, `?:`** — без пробелов вокруг: `$this->user_data?->user_email`

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
- `Пост-типы и категории`
- `Валидация`
- `Справочники`
- `Утилиты`
- `Регистрация роутов`
- `Публичные эндпоинты`
- `Внутренние хелперы`
- `Модели ответа`
- `Статические хелперы`

---

## 1. Архитектура

### Структура папок

```
theme/
├── functions.php                    # Точка входа — подключение всех папок
├── index.php                        # Обязательный файл темы (заглушка)
├── style.css                        # Заголовок темы + CSS
├── readme.txt                       # Описание темы
├── helpers/
│   ├── index.php                    # Автозагрузка helpers
│   ├── _class-api-helper.php        # Регистрация роутов, ответы, JWT
│   ├── _class-site-config.php       # Singleton-конфиг
│   ├── _class-validate.php          # Валидация полей
│   ├── _mail_html.php               # HTML-шаблон писем
│   ├── _upload_image_file.php       # Загрузка и масштабирование
│   └── _utils.php                   # Утилиты
├── configs/
│   └── index.php                    # Автозагрузка конфигов
├── site-setup/
│   ├── index.php                    # Автозагрузка site-setup
│   ├── _debug.php                   # Debug для локального окружения
│   ├── _jwt.php                     # Настройка JWT
│   ├── _media.php                   # Размеры изображений
│   ├── _options_page.php            # ACF-страницы настроек
│   ├── _reset_functions.php         # Отключение лишнего из WP
│   ├── _set_popular_tags.php        # Cron: popular tags JSON
│   ├── _pt_article.php              # Post type: article + article_cat
│   ├── _pt_journal.php              # Post type: journal
│   ├── _pt_music.php                # Post type: music + music_cat
│   ├── _pt_news.php                 # Post type: news + news_cat
│   ├── _pt_quiz.php                 # Post type: quiz
│   ├── _pt_rock_data.php            # Post type: rock-data
│   ├── _pt_site_archive.php         # Post type: site-archive
│   ├── _pt_stars.php                # Post type: stars — ЗАКОММЕНТИРОВАН
│   ├── _pt_video.php                # Post type: video + video_cat
│   └── jsons/                       # JSON-кэш (cron_info_JSON и др.)
├── controllers/
│   ├── index.php                    # Автозагрузка контроллеров
│   ├── _admin-controller.php        # (не регистрируется)
│   ├── _archive-controller.php
│   ├── _auth-controller.php
│   ├── _metadata_controller.php
│   ├── _page-controller.php
│   ├── _post-controller.php
│   ├── _search-controller.php
│   ├── _site-controller.php
│   ├── _taxonomy-controller.php
│   └── _users-controller.php
├── models/
│   ├── index.php                    # Автозагрузка моделей
│   ├── _archive-model.php
│   ├── _auth-model.php
│   ├── _page-model.php
│   ├── _post-model.php
│   ├── _search-model.php
│   ├── _site-model.php
│   ├── _taxonomy-model.php
│   └── _user-model.php
└── api/
    └── routes.php                   # Регистрация всех роутов
```

### Точка входа — `functions.php`

```php
<?php

if (!defined('_S_VERSION')) {
    define('_S_VERSION', '1.0.0');
}

function add_admin_scripts(): void
{
    wp_enqueue_script(
        'custom_js',
        get_template_directory_uri().'/scripts.js',
        [],
        _S_VERSION,
        true
    );
    wp_enqueue_style(
        'custom_css',
        get_template_directory_uri().'/style.css',
        [],
        _S_VERSION
    );
}

add_action('admin_enqueue_scripts', 'add_admin_scripts', 25);

include_once 'helpers/index.php';
include_once 'configs/index.php';
include_once 'site-setup/index.php';
include_once 'controllers/index.php';
include_once 'models/index.php';
include_once 'api/routes.php';
```

### Регистрация роутов — `api/routes.php`

```php
<?php

function register_custom_rest_routes(): void
{
    new Auth_Controller()->register_routes();
    new Metadata_Controller()->register_routes();
    new Archive_Controller()->register_routes();
    new Page_Controller()->register_routes();
    new Post_Controller()->register_routes();
    new Search_Controller()->register_routes();
    new Site_Controller()->register_routes();
    new Taxonomy_Controller()->register_routes();
    new User_Controller()->register_routes();
}

add_action('rest_api_init', 'register_custom_rest_routes');
```

`Admin_Controller` существует, но его регистрация **не вызывается** из `routes.php`. Роуты `/admin/*` сейчас выключены — не вызывать с фронта.

### Автозагрузка через `index.php`

Каждая папка содержит `index.php`, который подключает все файлы с префиксом `_` и все вложенные `index.php`:

```php
<?php
foreach (glob(dirname(__FILE__).'/_*.php') as $file) {
    include_once $file;
}

foreach (glob(dirname(__FILE__).'/**/index.php') as $file) {
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

**Состояние:** конструктор отсутствует, все методы либо статические, либо создают `new self()` при необходимости.

**Методы:**

- `public function public_route(string $route, array $callback): void` — регистрация публичного эндпоинта (без JWT).
- `public function private_route(string $route, array $callback): void` — регистрация приватного эндпоинта (с JWT-проверкой).
- `public static function check_permissions(WP_REST_Request $request): bool|WP_Error` — callback для `permission_callback` приватных роутов.
- `public function get_user_id_from_headers(?WP_REST_Request $request): ?int` — извлечение ID пользователя из JWT в `Authorization: Bearer <token>`.
- `public function response(?array $data = null, ?array $settings = null): array` — формирование стандартизированного ответа.
- `public function set_error(string $code, ?string $field_name = null, ?string $add_info = null): array` — создание структурированной ошибки.

**Пример регистрации роутов:**

```php
$this->api->public_route($this->base_route.'/home-page-data', [$this, 'get_home_page_data']);
$this->api->private_route($this->base_route.'/get-current-user', [$this, 'get_current_user']);
```

### 2.2. `Site_Config` (Singleton)

**Файл:** `helpers/_class-site-config.php`

Класс-конфигурация сайта. Хранит **все** настройки, справочники, пост-типы, правила валидации.

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

- **Публичные настройки** — `$time_format`, `$emails` (`support`, `mail_to`, `test_mail`), `$links` (`reviewUrl`), `$permitted_config`, `$cron_config`, `$admin_id`.
- **Пост-типы и категории** — `$post_types_config`, `$categories_config`.
- **Валидация** — `$VALIDATORS`, `$FIELDS`, `$VALIDATE_SORT`.
- **Справочники** — `$countries_arr`, `$week_days_short_translate`, `$month_days_short_translate`.
- **Утилиты** — методы `is_production()`, `get_mail_to()`, `get_site_url()`, `get_post_type_args()`, `generate_post_type_labels()`.

**Приватное:**

- `private const array PROD_HOSTS = ['sorock.ru', 'www.sorock.ru']`.

**Ключи `$permitted_config`:**

| Ключ | Значение | Описание |
|---|---|---|
| `search_result_max_count` | 24 | Макс. результатов поиска |
| `archive_posts_per_page` | 18 | Постов на странице архива |
| `pageCategoryMode` | 6 | Режим выбора категорий (1/multi) |
| `postTagsCount` | 10 | Тегов у поста |
| `mediaAuthorsCount` | 3 | Авторов у медиа |
| `addPostMinLevel` | 1 | Мин. уровень для добавления |
| `bookmarkFeedCount` | 6 | Закладок в ленте |

**`$cron_config`:**

| Ключ | `action` | `jsonName` |
|---|---|---|
| `popular_tags` | `popular_tags` | `popular_tags_JSON` |
| `users_info` | `users_info` | `users_info_JSON` |

**Методы:**

- `public static function get_instance(): self` — получение singleton.
- `public function is_production(): bool` — `true`, если хост из `PROD_HOSTS`.
- `public function get_mail_to(): string` — email получателя с учётом окружения: на тестовом стенде `test_mail`, на проде `mail_to`.
- `public function get_site_url(?string $type = null): ?string` — URL сайта (`full`, `decorated`, `server_name`, `back_local_domain`).
- `public function get_post_type_args(array $props): array` — генерация аргументов для `register_post_type()`.
- `private function generate_post_type_labels(array $props): array` — генерация labels для CPT (с учётом рода `gender`: `m` / `f`).

**Хосты продакшена:**

```php
private const array PROD_HOSTS = [
    'sorock.ru',
    'www.sorock.ru',
];
```

### 2.3. `Validate`

**Файл:** `helpers/_class-validate.php`

Валидация входящих запросов по правилам из `Site_Config::$FIELDS` и `$VALIDATORS`.

**Константы:**

- `private const int DEFAULT_CODE_LENGTH = 6`

**Конструктор:**

```php
public function __construct(?WP_REST_Request $credentials)
```

Сливает `get_params()` и `get_file_params()` — чтобы валидаторы файлов видели `$_FILES`.

**Методы:**

- `public function check_request(string $route, ?int $user_id = null): array|false` — основная проверка. Возвращает **массив ошибок** или **`false`**, если ошибок нет.

**Принцип работы:**

1. Если маршрут **не описан** в `FIELDS` — возвращает `false` (валидация не требуется).
2. Если задан `$user_id` и у маршрута есть `capability` — вызывает `check_permission()`.
   **Сейчас `check_permission()` всегда возвращает `false`** (TODO), то есть любой маршрут с `capability` упадёт с `er228`.
3. Для каждого поля:
  - Проверяет наличие (`isset`).
  - Если поле обязательно и отсутствует — ошибка `er200`.
  - Нормализует значение (`null`, `'null'`, `'undefined'` → `null`; строка → `sanitize_string`).
  - Прогоняет через валидаторы в порядке `VALIDATE_SORT`.

**Внутренние хелперы:**

- `private function normalize_value(mixed $value): mixed` — нормализация.
- `private function validate(string $field_name, mixed $value): ?array` — прогон через валидаторы.
- `private function run_validator(string $type, mixed $value, string $field_name, array $validator, bool $is_required): ?array` — запуск конкретного валидатора с тип-чекингом (string / numeric / array).

**Валидаторы:**

- **Строки:** `check_required`, `check_min_length`, `check_max_length`, `check_length`, `check_email`, `check_email_uniq`, `check_text_only`, `check_space`, `check_en_numbers_only`, `check_some`.
- **Числа:** `check_is_number`.
- **Телефон / Telegram:** `check_phone`, `check_telegram`.
- **Даты:** `check_less_then_now`.
- **Объекты:** `check_is_user_exist`, `check_is_page_exist`.
- **Файлы:** `check_file_size`, `check_file_type`.

**Пример использования:**

```php
$errors = (new Validate($request))->check_request('registration');

if ($errors) {
    return $this->api->response(null, ['errors' => $errors]);
}
```

### 2.4. Утилиты (`_utils.php`)

**Файл:** `helpers/_utils.php`

Глобальные функции, сгруппированы по секциям: «Идентификаторы и запросы», «Санитизация и работа со строками», «Работа с массивами», «ACF-хелперы», «JSON-файлы (кэш)», «Время».

**Идентификаторы и запросы:**

- `get_entity_id(string $slug, ?string $post_type = null): ?int` — ID поста по слагу или числовому ID. Если `$post_type` не задан — ищет по всем из `Site_Config::$post_types_config`.

**Строки:**

- `sanitize_string(?string $text = null): string` — базовая санитизация (`trim` + `sanitize_text_field` + `strip_tags`).
- `hf_get_first_sentence(string $text, int $max_length = 0): string` — первое предложение с опциональной обрезкой.
- `hf_explode(?string $str, ?string $type = null): ?array` — разбиение строки по запятой; `$type = 'int'` — вернуть целые числа.

**Массивы:**

- `array_or_null(array $array): ?array` — `null`, если массив пуст.

**ACF:**

- `gf(string $name, int|string $id): string|array|bool|WP_Post|null` — получение ACF-поля.
- `uf(string $name, int|string $id, mixed $value): bool` — обновление ACF-поля (массив → `add_row`).
- `gf_img(string $name, int|string $id, string $type = 'img900'): string|int|null` — изображение ACF.

**JSON-кэш:**

- `save_json_file(mixed $data, string $title): bool` — сохранение в `site-setup/jsons/`.
- `get_json_file(string $filename): ?array` — чтение из `site-setup/jsons/`.

**Время:**

- `get_time(?string $type = null, ?int $gmt = null): string|int` — текущее время; `$type = 'timestamp'` — unix timestamp.

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

### 3.1. `Archive_Model`

**Файл:** `models/_archive-model.php`

Модель архива. Отвечает за ленты постов, SEO-интро архива, промо-подборку и оба календаря (день / месяц).

**Константы:**

- `AUTHOR_FALLBACK = 'SorockRu'`
- `FIELD_H1_TITLE = 'archive_h1_title'`
- `FIELD_H1_CONTENT = 'archive_h1_content'`
- `META_PAGE_VIEWS = 'mpf_page_views_count'`
- `PROMO_PERIOD = '2 years ago'`
- `PROMO_POSTS_LIMIT = 6`
- `FEBRUARY = 2`, `FEBRUARY_SHORT_DAY = 28`, `FEBRUARY_LAST_DAY = 29`, `LEAP_YEAR_REFERENCE = 2024`
- `META_EVENT_DATE = 'event_date'`
- `MONTH_MIN = 1`, `MONTH_MAX = 12`

**Маппинг пост-тип → таксономия (`POST_TYPE_TAXONOMY_MAP`):**

```php
'news'    => 'news_cat',
'article' => 'article_cat',
'music'   => 'music_cat',
'video'   => 'video_cat',
```

**Публичные методы:**

- `get_archive_metadata(?string $post_type): ?array` — SEO-метаданные архива (`title`, `description`, `canonical`, `dateGmt`, `modifiedGmt`, `author`).
- `get_archive_seo_data(?string $post_type): ?array` — SEO-интро (`titleH1`, `description`, `reviewUrl`). `null`, если оба ACF-поля пусты.
- `get_archive_promo_data(?string $post_type): ?array` — топ-6 постов по `mpf_page_views_count` за 2 года. Сортировка: просмотры (DESC), затем дата (DESC).
- `get_archive_data(?string $post_type, ?string $taxonomy, int $page, int $per_page): ?array` — посты архива. Возвращает `['postsData' => ..., 'paginationInfo' => ['currentPage' => ..., 'pagesCount' => ...]]`.
- `get_calendar_data(?int $month, ?int $day): ?array` — карточки событий дня (год игнорируется). Источники: `rock-data` + все CPT с `is_calendar` + посты из категорий с `is_calendar`. Для `28 февраля` дополнительно попадают записи `29 февраля`. Сортировка — от новых к старым.
- `get_rock_calendar_data(?int $month): ?array` — карточки событий месяца, сгруппированные по `MM-DD`. Месяц вне 1–12 или пусто — `null`.

**Внутренние хелперы:**

- `build_archive_tax_query(string $post_type, ?string $taxonomy): array|null|false` — `tax_query` для архива по slug термина. `null` — фильтр не нужен; `false` — термин не найден.
- `resolve_archive_page_id(?string $post_type): ?int` — ID страницы-архива из `$post_types_config[$post_type]['page_id']`.
- `resolve_top_level_calendar_types(): array` — CPT с `is_calendar = true` на верхнем уровне (без `cat`). Сейчас это `rock-data`.
- `build_calendar_tax_query(): ?array` — `tax_query` с `relation => OR` из кастомных таксономий с `is_calendar` + рубрики `rock_date_rub`.
- `query_calendar_posts(array $meta_query): array` — сбор из двух источников, дедупликация, сортировка по `event_date` DESC.
- `is_valid_date(?int $month, ?int $day): bool` — проверка даты через `checkdate()` с leap-годом `2024`.

**Фильтр по дате события** — через `meta_query` с `REGEXP` по ACF-полю `event_date` (формат `Ymd`):

```php
// Календарь дня: `(0123)$` или `(0228|0229)$`. Якорь `$` — чтобы
// месяц+день стояли в конце строки.
$meta_query = [
    [
        'key' => self::META_EVENT_DATE,
        'value' => '('.implode('|', $mmdd_list).')$',
        'compare' => 'REGEXP',
    ],
];
```

```php
// Календарь месяца: `^[0-9]{4}MM[0-9]{2}$`. Якоря `^` и `$` — чтобы
// не поймать `MMDD` в середине.
$meta_query = [
    [
        'key'     => self::META_EVENT_DATE,
        'value'   => '^[0-9]{4}'.$mm.'[0-9]{2}$',
        'compare' => 'REGEXP',
    ],
];
```

**Дедупликация:** после объединения выборок по типам и категориям — `$unique[$post->ID] = $post`, затем `usort()` по `post_date` (DESC).

### 3.2. `Post_Model` (readonly class)

**Файл:** `models/_post-model.php`

Модель для работы с постами **всех** типов. **`readonly class`** — все свойства неизменяемы.

**Конструктор:**

```php
public function __construct(int|string|null $page_id = null)
```

**Публичные методы (SEO):**

- `get_seo_title(): string` — SEO-заголовок из Yoast (или fallback на `get_title()`).
- `get_title(?int $page_id = null): string` — заголовок поста (fallback на первое предложение).
- `get_h1(): string` — H1 из ACF или заголовок.
- `get_description(): string` — SEO-описание из Yoast.
- `get_post_metadata(): array` — SEO-данные (`title`, `description`, `canonical`, `innerImg`, `dateGmt`, `modifiedGmt`, `author`, `tags`).

**Медиа:**

- `get_cover_image(string $type = 'img900'): ?string`
- `get_inner_image(string $type = 'img900'): ?string`

**Таксономии:**

- `get_categories(string $type = 'slug'): ?array` — категории (исключая `main_rub`).
- `get_tags(?string $format = null): ?array` — `name_arr`, `id_arr`, `thumb_type` или `[{value, label}]`.

**Автор:**

- `get_post_author(string $format = 'fullname', int $post_count = 5): string|array|null` — `id`, `author_thumb_data`, `name`, `surname`, `fullname`, `logo`, `link`, `about`, `socList`, `posts_id`.

**Дата:**

- `get_post_date(?string $type = null): string|int|null` — `yafeed`, `seo`, `seo_modify` или дефолт из `time_format.date_with_time`.
- `get_event_date(): ?string` — ACF `event_date` (`Ymd` → `Y-m-d`).

**Контент:**

- `get_content(?string $format = null, int $cut_count = 0): string` — `clean`, `autop` или дефолт.

**Страна / ссылка:**

- `get_country(string $type = 'value'): string` — `value` (код) или `label`.
- `get_permalink(?int $page_id = null): string` — относительный URL.

**Модели ответа:**

- `get_post_base(): array` — полные данные поста (`author`, `innerImg`, `country`, `settings.readingTime`, `main`, `taxonomies`, `video`, `music`).
- `get_post_archive_model(): array` — карточка архива (`titleH1`, `content` (20 слов), `author`, `url`, `coverImg` (img500), `postDate`, `tags`, `country`, `categories`, `readingTime`).
- `get_post_event_card_model(): array` — карточка события (`eventDate`, `titleH1`, `content`, `author`, `url`, `coverImg`, `tags`, `country`).
- `get_post_short_model(): array` — короткая карточка (`thumbnail`, `title`, `url`, `author`, `categories`, `postDate`, `eventDate`, `year`).
- `get_latest_news_promo_model(): array` — промо главной (`titleH1`, `content`, `author`, `innerImg`, `country`, `readingTime`, `postDate`, `tags`, `categories`).
- `get_video_models(): ?array` — галерея видео из ACF-повторителя `videogalary`.
- `get_music_model(): ?array` — альбом поста (`musicCode`, `albumInfo`).
- `get_top_album_model(): array` — карточка топа (переиспользует `get_music_model()` + `innerImg`, `country`, `url`).

**Статические хелперы:**

- `public static function get_last_posts_by_type(array $post_type, ?int $posts_per_page = 3): ?array` — последние посты для промо главной. Объединяет CPT с `in_latest_posts = true` + посты с рубрикой `news_rub`. Дедупликация + сортировка по `post_date` DESC.

**Внутренние хелперы:**

- `get_yafeed_time(): string` — время в формате Yandex Feed.
- `get_clean_content()`, `get_autop_content()`, `get_default_content()` — варианты очистки контента.
- `get_reading_time(): int` — время чтения в минутах (`WORDS_PER_MINUTE = 200`).
- `resolve_terms_names(mixed $terms): ?array` — ACF-таксономия (`id` / `object` / `array` / `string`) → массив имён.
- `resolve_acf_image(mixed $image): ?string` — ACF-изображение (`id` / `url` / `array`) → URL.

### 3.3. `Page_Model` (readonly class)

**Файл:** `models/_page-model.php`

Модель для страниц (не постов).

**Константы:**

- `TOP_ALBUMS_LIMIT = 10`
- `OPTIONS_ID = 'options'`
- `OPTION_TOP_LIST = 'ta_list'` — внешний повторитель топов
- `OPTION_TOP_TITLE = 'ta_ls_title'` — заголовок топа
- `OPTION_TOP_TAB_TITLE = 'ta_ls_tabtitle'` — короткое имя для вкладки
- `OPTION_TOP_ITEM = 'ta_ls_top_list'` — вложенный повторитель альбомов
- `OPTION_TOP_ALBUM_ID = 'ta_ls_tl_item'` — Post Object → Post ID

**Конструктор:**

```php
public function __construct(int|string|null $page_id = null)
```

**Методы:**

- `get_page_metadata(): array` — SEO-данные страницы.
- `get_latest_news_promo_data(array $post_type, ?int $posts_per_page = 3): ?array` — промо-данные последних постов.
- `get_calendar_default_data(): ?array` — события на сегодня (тот же сборщик, что `/archive/calendar`, но месяц и день — из `wp_date('n')` / `wp_date('j')`).
- `get_top_albums_list_data(): ?array` — топы альбомов с главной (ACF-опции `ta_list`, `ta_ls_title`, `ta_ls_tabtitle`, `ta_ls_top_list`). У топа ≤ 10 альбомов, у каждого — `position` (1..N).

**Приватные хелперы:**

- `build_top_albums(array $album_rows): array` — сборка карточек топа с нумерацией.

### 3.4. `User_Model`

**Файл:** `models/_user-model.php`

Модель пользователя. Работает с ACF (`user_{id}`).

**Константы:**

- `DEFAULT_FIRST_NAME = 'Автор'`
- `DEFAULT_LAST_NAME = 'Контента'`
- `DEFAULT_ABOUT = 'Молчание — золото'`
- `DEFAULT_COUNTRY = 'sf'`
- `SOC_TYPES = ['vk', 'in', 'fb', 'tt', 'yt']`
- `MESSENGER_TYPES = ['tg', 'wa']`

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
- `get_about(string $type = 'replace'): ?string` — `replace | as_is`
- `get_birthdate(): ?string`, `get_country(): ?string`, `get_city(): ?string`
- `get_email(string $type = 'public'): ?string` — `public | private`
- `get_messenger(string $type): ?string` — `tg | wa`
- `get_phone(): ?string`
- `get_soclink(string $type): ?string` — `vk | in | fb | tt | yt`
- `get_soclist(): ?array`
- `get_author_posts_id(array $post__not_in = [-1], int $posts_per_page = 5): ?array`
- `get_role(): ?string`

**Публичные сеттеры:**

- `update_uname(?string $new_name, string $type): bool` — `first_name | last_name`
- `update_birthdate(?string $new_birthdate): bool`
- `update_country(?string $new_country): bool`
- `update_city(?string $new_city): bool`
- `update_email(?string $new_email, string $type = 'public'): bool`
- `update_messenger(?string $new_contact, string $type): bool` — `tg | wa`
- `update_phone(?string $new_phone): bool`
- `update_signature(?string $new_signature): bool`
- `update_soclink(?string $new_link, string $type): bool` — `vk | in | fb | tt | yt`

**Подтверждение аккаунта:**

- `is_confirmed(): bool`
- `confirm_user(?string $confirm_code): bool`
- `set_new_password(string $new_password, string $confirm_code): bool`

**Миграция:**

- `migrate_user(): void`

**Модели ответа:**

- `get_user_model(): array` — полный публичный профиль (`userId`, `userLogin`, `avatarUrl`, `role`, `userUrl`, `metrics`, `contacts`, `socLinks`, `activity`).
- `get_current_user_model(): array` — сокращённый профиль текущего пользователя (`userId`, `role`, `fullName`, `avatarUrl` (img80), `isActivated`, `isCookieAccepted`).

### 3.5. `Taxonomy_Model`

**Файл:** `models/_taxonomy-model.php`

Модель для работы с таксономиями.

**Константы:** `JSON_POPULAR_TAGS = 'popular_tags_JSON'`, `TYPE_JSON = 'json'`, `MIN_TAG_POSTS_COUNT = 15`, `TAGGED_POST_TYPES = ['news']`.

**Методы:**

- `get_posts_by_tag(int $tag_id): ?array` — посты по тегу, сгруппированные по годам.
- `get_published_posts_by_tag(int $tag_id): ?array` — ID опубликованных постов по тегу.
- `get_popular_tags(?string $type = null): ?array` — популярные теги. `json` — из кэша, иначе — из БД (фильтр `count >= 15`).

**Приватные методы:**

- `group_by_year(array $items): array`
- `sort_by_date_asc(array $a, array $b): int` (static)
- `get_popular_tags_from_json(): ?array`
- `get_popular_tags_from_db(): ?array`
- `get_tag_data(WP_Term|WP_Error|int|null $tag): ?array`

### 3.6. `Search_Model`

**Файл:** `models/_search-model.php`

Модель глобального поиска.

**Константы:** `AUTHOR_FALLBACK = 'SorockRu'`.

**Методы:**

- `get_search_data(?string $post_types, ?string $phrase): ?array` — данные поиска (посты + метаинформация).
- `get_search_metadata(?string $phrase): array` — SEO-метаданные страницы поиска.

**Приватные методы:**

- `get_searched_post_types(?string $requested_types): array`
- `get_searched_categories(?string $requested_categories): array`
- `get_allowed_post_types(): array`
- `get_allowed_category_ids(): array`
- `parse_requested_list(string $value): array`

### 3.7. `Auth_Model`

**Файл:** `models/_auth-model.php`

Модель авторизации и писем.

**Константы:** `MAIL_HEADERS = 'Content-type: text/html; charset="UTF-8";'`, `CONFIRM_CODE_FIELD = 'usrmain_confirm_code'`, `CODE_MIN = 100000`, `CODE_MAX = 999999`.

**Методы:**

- `send_confirm_account_mail(string $email, int $user_id): bool` — письмо для подтверждения аккаунта.
- `send_reset_password_code_mail(string $email, int $user_id): bool` — письмо для сброса пароля.
- `send_changed_password_info_mail(string $email): bool` — уведомление о смене пароля.
- `get_default_user_data(array $credentials): array` — данные для регистрации (`loginEmail`, `password`, `name`, `surname`). **Роль — `subscriber`** (хардкод).

**Приватные методы:**

- `generate_code(): int` — 6-значный код.
- `save_confirm_code(int $user_id, int $code): void`

### 3.8. `Site_Model`

**Файл:** `models/_site-model.php`

Модель общих данных сайта.

**Константы:** `MAIL_HEADERS`, `JSON_CRON_INFO = 'cron_info_JSON'`, `JSON_POPULAR_TAGS = 'popular_tags_JSON'`, `JSON_USERS_INFO = 'users_info_JSON'`, `STATUS_SUCCESS = 'success'`, `STATUS_ERROR = 'error'`, `UPDATED_BY = 'user'`.

**Методы:**

- `send_contact_form_mail(array $params): bool` — отправка контактной формы.
- `get_trends_data(): ?array` — тренды (последние 10 постов из `video`, `music`, `article`).
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

    private const string ROUTE_SINGLE = '/(?P<slug>[a-zA-Z0-9_-]+)';
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
        $this->api->public_route(
            $this->base_route.self::ROUTE_SINGLE,
            [$this, 'some_method'],
        );
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

**`Admin_Controller`** — `/admin/*` (приватные), **не зарегистрирован** в `routes.php`. Регистрация не вызывается. Не вызывать с фронта, пока роуты не включат. Список для справки:

- `/get-cron-info` — читает `cron_info_JSON`.
- `/update-cron-info` — обновляет `cron_info_JSON`.
- `/update-cron-task` — `taskName` = `popular_tags` \| `users_info`.
- `/get-users-info` — `jsonData`, `siteRoles`, `filterResult`.
- `/update-users` — миграция (`usersIds`).
- `/delete-users` — удаление (`usersIds`).
- `/update-roles` — обновление ролей.

**`Auth_Controller`** — `/auth/*` (публичные):

- `/registration`
- `/send-confirm-code-mail`
- `/confirm-email` — две ветки: без параметров (по JWT) → `['isConfirmed' => bool]`; с `email` + `confirmCode` → подтверждение.
- `/send-reset-pass-code-mail`
- `/reset-password`

**`Metadata_Controller`** — `/metadata` (публичный):

- `/metadata` — единая точка SEO. Query: обязательный `type`
  (`page` / `archive` / `post` / `search`), опциональные `slug` и `param`.
  Для `page` пустой `slug` — главная; для `archive` в `slug` передаётся
  post type; для `post` — слаг записи; для `search` фраза — в `param`.

**`Archive_Controller`** — `/archive/*` (публичные):

- `/archive` — архив. Query: обязательный `postType`, опциональные `taxonomy` (slug термина, не имя таксономии; один) и `page`.
  Имя таксономии бэк выводит из `postType` через `POST_TYPE_TAXONOMY_MAP`.
  У типа без кастомной таксономии `taxonomy` игнорируется.
  Неизвестный slug — `postsData: null`, `pagesCount: 1`, не 404.
  `page` отсутствует или `< 1` → первая; `page > pagesCount` → последняя, `currentPage` уже поправлен.
  `pagesCount` считается от фильтра и от клиента не принимается.
  `data`: `postsData` + `paginationInfo: { currentPage, pagesCount }`.
- `/get-slugs` — слаги для `generateStaticParams`. Query: обязательный `postType`.
- `/promo-data` — промо раздела. Query: обязательный `postType`. `data`: `seoData` (`titleH1`, `description`, `reviewUrl`) и `archivePromoData`. Отсутствие данных — `null` в полях, не 404.
- `/calendar` — события календарного дня. Query: `month` (1–12) и `day` (1–31). `data` — `EventCardModel[]` или `null`. Поля карточки: `eventDate`, `titleH1`, `content`, `author`, `url`, `coverImg`, `tags`, `country`. Небывалая дата — `data: null`. 29 февраля допустим; в невисокосном году записи 29 февраля отдаются вместе с `month=2&day=28`.
- `/rock-calendar` — календарь месяца архива `/rock-data`. Query: `month` (1–12). `data` — объект `MM-DD` → `PostShortCard[]` (`thumbnail`, `title`, `url`, `author`, `categories`, `postDate`, `eventDate` (`YYYY-MM-DD`), `year`). Дней без постов в объекте нет. `02-28` и `02-29` — отдельные ключи.

**`Page_Controller`** — `/page/*` (публичные):

- `/home-page-data`. `data` содержит `lastNewsPromoData`, `calendarDefaultData` (тот же массив, что `/archive/calendar` на сегодня, или `null`), `topAlbumsListData` (массив топов или `null`). Топ: `title`, `tabTitle`, `albums` (до 10 с `position` 1..N; альбом — `musicCode`, `title`, `artists`, `year`, `country`, `coverImg`, `innerImg`, `url`).

**`Post_Controller`** — `/post/*` (публичный):

- `/(?P<slug>[a-zA-Z0-9_-]+)` — базовая карточка поста. Path: `slug`. Query: обязательный `postType`. Нет поста → `data: null`, `['notfound' => true]`.

**`Search_Controller`** — `/search/*` (публичные):

- `/` — поиск. Query: обязательный `phrase`, опциональный `post_types`.
- `/get-search-config` — конфиг поиска (`searchResultMaxCount`, `postTypes` только с `is_searched`).

**`Site_Controller`** — `/site/*` (публичные):

- `/common-data` — тренды, `base.supportEmail`, `popularTags` (из JSON).
- `/send-contact-form` — контактная форма. Валидация `send-contact-form`. Возвращает `['isSent' => bool]`.

**`Taxonomy_Controller`** — `/taxonomy/*` (публичные):

- `/search-posts-by-tag` — посты по тегу. Валидация `search-posts-by-tag`. Query: `tagId`.

**`User_Controller`** — `/users/*`:

- `/filter` (public) — пагинация юзеров. Query: `page`, `offset`.
- `/get-user-data` (public) — публичный профиль. Валидация `get-user-data`. Query: `userId`.
- `/get-current-user` (private) — профиль по JWT.

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

- `result` определяется по наличию `errors`, `redirect`, `logout`, `notfound` (через `match(true)`).
- При `result === 'errors'` — массив нормализуется: если у ошибки есть `code` — оборачивается в `[$errors]`.
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

**Актуальный список полей:**

| Поле | Правила |
|---|---|
| `name` | `required`, `min_length: 2`, `max_length: 30`, `text_only` |
| `surname` | `required`, `min_length: 2`, `max_length: 30`, `text_only` |
| `message` | `required`, `min_length: 10`, `max_length: 200` |
| `password` | `required`, `min_length: 8`, `max_length: 30`, `no_spaces`, `en_numbers_spec_symbols_only` |
| `passwordConfirm` | то же + `some: password` |
| `email` | `required`, `min_length: 8`, `max_length: 100`, `email` |
| `loginEmail` | `required`, `min_length: 8`, `max_length: 100`, `email`, `is_uniq_email` |
| `userId` | `required`, `min_length: 1`, `max_length: 6`, `is_user_exist` |
| `confirmCode` | `required`, `number` |
| `image` | `max_size: 2`, `accept: ['image/png', 'image/jpeg', 'image/jpg']` |
| `phrase` | `required`, `min_length: 3`, `max_length: 30` |
| `tagId` | `required`, `number` |

### Маршруты (`Site_Config::$FIELDS`)

| Ключ | Поля | `capability` |
|---|---|---|
| `registration` | `name`, `surname`, `password`, `loginEmail`, `passwordConfirm` | — |
| `send-confirm-code-mail` | `email` | — |
| `send-reset-pass-code-mail` | `email` | — |
| `reset-password` | `password`, `passwordConfirm`, `email`, `confirmCode` | — |
| `get-user-data` | `userId` | — |
| `send-contact-form` | `name`, `email`, `message` | — |
| `search-posts-by-tag` | `tagId` | — |
| `search` | `phrase` | — |
| `example-with-capability` | `userId` | `['edit_employee']` |

**Про `capability`:** `Validate::check_permission()` пока не реализован и **всегда возвращает `false`** (TODO). Любой вызов маршрута с `capability` (сейчас это только `example-with-capability`) упадёт с `er228`.

### Порядок валидации (`Site_Config::$VALIDATE_SORT`)

```php
['required', 'min_length', 'max_length', 'email', 'text_only', 'number', 'no_spaces', 'en_numbers_spec_symbols_only', 'some', 'max_size', 'accept', 'is_uniq_email', 'is_user_exist', 'is_page_exist', 'length', 'telegram', 'less_then_now', 'phone']
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
$about = gf('prf_about', 'user_'.$user_id);
$cover = gf('tgg_cover_img', 'post_tag_'.$tag_id);
```

### `uf()` — обновление поля

```php
function uf(string $name, int|string $id, mixed $value): bool
```

Если `$value` — массив, используется `add_row()` (добавление строки в repeater).

**Примеры:**

```php
uf('main_h1', $post_id, 'Новый заголовок');
uf('is_activated', 'user_'.$user_id, true);
uf('usrmain_confirm_code', 'user_'.$user_id, null); // удаление
```

### `gf_img()` — изображение

```php
function gf_img(string $name, int|string $id, string $type = 'img900'): string|int|null
```

**Размеры:** `img80`, `img500`, `img900`, `thumbnail`, `origin`, `id`.

**Примеры:**

```php
$cover = gf_img('cover_img', $post_id);
$avatar = gf_img('avatar', 'user_'.$user_id, 'img80');
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

### Активные CPT

| Slug | Label | `in_latest_posts` | `is_searched` | `is_calendar` | `page_id` | Кастомная таксономия |
| --- | --- | --- | --- | --- | --- | --- |
| `news` | Новости | ✅ | ✅ | — | 209 | `news_cat` |
| `rock-data` | Рок-дата | ✅ | ✅ | ✅ | 213 | — |
| `journal` | Журнал | ❌ | ❌ | ❌ | 46507 | — |
| `quiz` | Тесты | ❌ | ❌ | ❌ | 46510 | — |
| `site-archive` | Архивные материалы | ❌ | ❌ | ❌ | 46513 | — |
| `article` | Статьи | ✅ | ✅ | — | 210 | `article_cat` |
| `music` | Музыка | ❌ | ✅ | — | 46486 | `music_cat` |
| `video` | Видео | ✅ | ✅ | — | 212 | `video_cat` |
| `stars` | Звёзды | — | — | — | — | **ЗАКОММЕНТИРОВАН** |

`stars` (`_pt_stars.php`) — весь файл закомментирован, в `$post_types_config` отсутствует.

### Таксономии

**Стандартные** (все CPT): `post_tag` (метки). Рубрики `category` в публичной иерархии не используются.

**Кастомные**, `hierarchical => true`. Дефолтные термины плоские (`parent = 0`), вложенность задаётся в админке WP. Дефолтные термины создаются один раз по флагу в `wp_options` (`{taxonomy}_terms_created`).

| Таксономия | CPT | `rewrite.slug` | Дефолтные термины |
| --- | --- | --- | --- |
| `article_cat` | `article` | `article-cat` | `interview`, `review`, `sport`, `game`, `fact`, `entertaining`, `event` |
| `music_cat` | `music` | `music-cat` | `album`, `single`, `ep`, `playlist`, `live` |
| `news_cat` | `news` | `news-cat` | `society`, `sport`, `celebrities`, `interesting`, `advertisement` |
| `video_cat` | `video` | `video-cat` | `clip`, `concert`, `live`, `film`, `cool` |

### Флаги `is_calendar` для календаря

**Верхний уровень CPT:**

- `rock-data` — `is_calendar = true`.

**Термины кастомных таксономий** (в `$post_types_config[$post_type]['cat'][$term]['is_calendar']`):

- `article` → `event`
- `music` → `album`, `single`, `ep`
- `video` → `clip`, `concert`

**Сквозной маркер** — рубрика `rock_date_rub` (`categories_config`, ID `2043`).

### `$categories_config`

Две записи со старыми ID рубрик:

| Slug | Label | `id` |
|---|---|---|
| `rock_date_rub` | Рок дата | `2043` |
| `news_rub` | Новость | `2044` |

Используются в `Archive_Model::build_calendar_tax_query()` (`rock_date_rub`) и `Post_Model::get_last_posts_by_type()` (`news_rub`).

### Правило `singular` / `plural`

- `singular` — **единственное** число (`'Новость'`, `'Рок дата'`)
- `plural` — **множественное** число (`'Новости'`, `'Рок даты'`)
- `gender` (опционально) — `m` / `f` для согласования «не найдено / не найдены»

**Пример:**

```php
register_post_type(
    $post_type,
    Site_Config::get_instance()->get_post_type_args([
        'singular'  => 'Новость',
        'plural'    => 'Новости',
        'icon'      => 'dashicons-pressthis',
        'post_type' => $post_type,
    ])
);
```

### Регистрация CPT

Файлы `_pt_{slug}.php` в `site-setup/`. Если у типа есть кастомная таксономия, файл дополнительно регистрирует `register_{taxonomy}_taxonomy()` и `create_{taxonomy}_default_terms()`.

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

1. Создать `site-setup/_pt_new_type.php` (см. шаблон выше). Если нужна кастомная таксономия — добавить `register_taxonomy` + `create_default_terms`.
2. Добавить в `Site_Config::$post_types_config`:

   ```php
   'new_type' => [
       'label'           => 'Новые типы',
       'in_latest_posts' => true,
       'is_searched'     => true,
       'is_calendar'     => false,
       'page_id'         => 123,
       'cat'             => [],
   ],
   ```

3. Если есть кастомная таксономия — добавить маппинг в `Archive_Model::POST_TYPE_TAXONOMY_MAP`.
4. Зарегистрировать `Site_Config::$FIELDS`, если нужны свои эндпоинты с валидацией.
5. Использовать существующие `Archive_Controller` / `Post_Controller` — отдельный контроллер не требуется.

---

## 9. Конфигурация

Все настройки — в **`Site_Config`** (singleton).

### Публичные настройки

| Свойство | Тип | Описание |
|---|---|---|
| `$time_format` | array | `date_with_time` (`Y-m-d H:i:s`), `date` (`Y-m-d`) |
| `$emails` | array | `support`, `mail_to`, `test_mail` |
| `$links` | array | `reviewUrl` |
| `$permitted_config` | array | Настройки сайта (см. §2.2) |
| `$cron_config` | array | `popular_tags`, `users_info` |
| `$admin_id` | int | `23` |
| `$post_types_config` | array | Конфиг пост-типов |
| `$categories_config` | array | Конфиг рубрик (`rock_date_rub`, `news_rub`) |
| `$VALIDATORS` | array | Правила валидации |
| `$FIELDS` | array | Поля для маршрутов |
| `$VALIDATE_SORT` | array | Порядок валидации |
| `$countries_arr` | array | Список стран |
| `$week_days_short_translate` | array | Дни недели (перевод) |
| `$month_days_short_translate` | array | Месяцы (перевод) |

Приватные: `PROD_HOSTS`.

### Справочники

Статические данные (страны, дни недели, месяцы) хранятся **внутри `Site_Config`**.

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
- **`is_valid()`** — для моделей, которые могут быть «пустыми» (`User_Model`).

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

- **Все константы класса** — с типом: `private const string X = '...'`, `private const array Y = [...]`, `private const int Z = 10`.
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
   $this->api->public_route($this->base_route.'/my-endpoint', [$this, 'my_method']);
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

### Добавление нового пост-типа

См. §8 «Добавление нового CPT (пошагово)».

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

**Обновление:** cron-задачами на сервере. Роуты `/admin/update-cron-task` и `/admin/update-cron-info` не зарегистрированы (весь `Admin_Controller` на паузе).

Также в `site-setup/_set_popular_tags.php` есть отдельная cron-функция `cron_set_site_popular_tags_JSON()`, которая пишет файл `site_popular_tags_JSON`. Это **дублирующий канал** — публичный `Taxonomy_Model::get_popular_tags('json')` читает `popular_tags_JSON`. Не путать.

**Чтение:**

- `get_json_file('popular_tags_JSON')` — утилита из `_utils.php`.

**Структура JSON:**

```json
{
    "modifyData": {
        "lastUpdate": "2024-10-15 12:00:00",
        "lastUpdateStatus": "success",
        "updatedBy": "user",
        "itemsCount": 42,
        "label": "Популярные теги"
    },
    "data": [ ... ]
}
```

---

## 14. JWT и авторизация

- **Плагин:** JWT Authentication for WP-API.
- **Секретный ключ:** `JWT_AUTH_SECRET_KEY` (в `wp-config.php`).
- **Алгоритм:** HS256 (по умолчанию), через фильтр `jwt_auth_algorithm`.
- **Время жизни:** 1 час (`JWT_TOKEN_LIFETIME = 3600` в `_jwt.php`).

**Кастомизация в `_jwt.php`:**

- `jwt_auth_expire` — возвращает глобальный `$expires` (`get_time('timestamp', -3) + JWT_TOKEN_LIFETIME`; параметр `-3` в `get_time()` фактически не используется, `timestamp` возвращает `time()`).
- `jwt_auth_token_before_dispatch` — отдаёт `['token' => ..., 'expires' => $expires * 1000]`, то есть `expires` **в миллисекундах**.

**Получение токена:**

```
POST /wp-json/jwt-auth/v1/token
{ "username": "...", "password": "..." }
```

**Ответ:**

```json
{
    "token": "...",
    "expires": 1728993600000
}
```

`expires` — **в миллисекундах**.

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

- **1.1.0** — синхронизация с актуальной структурой бэкенда:
  - Новый контроллер **`Archive_Controller`** (`/archive/archive`, `/get-slugs`, `/promo-data`, `/calendar`, `/rock-calendar`).
  - Новый контроллер **`Post_Controller`** (`/post/{slug}`).
  - Новый контроллер **`Metadata_Controller`** (`/metadata` — единая точка SEO).
  - `News_Controller` удалён.
  - `Users_Controller` → **`User_Controller`** (`/users/*`).
  - Новая модель **`Archive_Model`** (ленты, промо, календари).
  - `Post_Model` расширена: `get_post_event_card_model`, `get_post_short_model`, `get_latest_news_promo_model`, `get_video_models`, `get_music_model`, `get_top_album_model`, `get_event_date`, `get_reading_time`, `resolve_terms_names`, `resolve_acf_image`.
  - `Page_Model` расширена: `get_calendar_default_data`, `get_top_albums_list_data`.
  - `Auth_Model` — добавлен `send_changed_password_info_mail`.
  - `Site_Config` — добавлены `$links`, `PROD_HOSTS`, `is_production()`, `get_mail_to()`, новые ключи `$permitted_config` и `$emails`.
  - JWT: `expires` в ответе `/token` — в миллисекундах.

- **1.2.0** — актуализация по коду:
  - **`stars`** исключён из активных CPT (файл `_pt_stars.php` закомментирован, в `$post_types_config` отсутствует).
  - **`$categories_config`** сокращён до двух записей (`rock_date_rub`, `news_rub`). Старый список `alboms_rub`, `interview_rub`, … удалён.
  - **`Site_Config`** — убраны `$base_cap` и `get_roles()` (в коде их нет).
  - **`Auth_Model::get_default_user_data`** — роль `subscriber` (хардкод), не первая из `get_roles`.
  - **`Archive_Model`** — актуальный публичный метод `get_archive_data()` (не `get_posts_archive()`), добавлен `POST_TYPE_TAXONOMY_MAP`.
  - **`Page_Model`** — константы `OPTION_TOP_LIST = 'ta_list'`, `OPTION_TOP_ITEM = 'ta_ls_top_list'`, `OPTION_TOP_ALBUM_ID = 'ta_ls_tl_item'`.
  - **`Search_Model`** — только `post_types` и `phrase`; `categories` не принимает (упоминания `get_searched_categories()` — внутренний мёртвый код).
  - **`Search_Controller::get_search_config`** отдаёт только `postTypes` (без `categories`).
  - **`Site_Controller`** — нет `/site/filter-params`; `get_filter_params()` в `Site_Config` отсутствует.
  - **`Admin_Controller`** — все 7 роутов описаны, но `register_routes()` не вызывается из `routes.php`.
  - **`Validate::check_permission()`** — заглушка, всегда `false` (маршруты с `capability` упадут с `er228`).
  - **`$FIELDS`** — актуальный список маршрутов, добавлен `example-with-capability`.
  - **`$VALIDATORS`** — актуальный список полей.
  - **`Validate::check_less_then_now`** — парсит `get_time()` форматом `'Y-m-d'`, но `get_time()` возвращает `'Y-m-d H:i:s'`; валидатор сейчас всегда отдаёт `er223`. Описано как есть.
  - **`Taxonomy_Model::sort_by_date_asc`** — читает `postDateNumber`, но `Post_Model::get_post_short_model()` его не отдаёт; сортировка фактически по `0`.
  - **Cron popular tags:** `_set_popular_tags.php` пишет `site_popular_tags_JSON`, публичный `Taxonomy_Model::get_popular_tags('json')` читает `popular_tags_JSON`. Два разных файла.
  - **`_jwt.php`** — `get_time('timestamp', -3)`: параметр `-3` не применяется.
  - **`_options_page.php`** — ACF Options: `theme-general-settings` + подстраницы `Users rating`, `Users awards`, `Top Alboms`.
  - **`_media.php`** — размеры: `img80` (80×80 crop), `img500` (500×500), `img900` (900×500 crop); стандартные `1536x1536`, `2048x2048`, `medium_large`, `large` удалены.