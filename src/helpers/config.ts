//TODO .env

export const WP_URL = "http://stage.sorockgb.local"

export const SITE_URL = "http://localhost:3000"
// export const SITE_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000"
//     : "https://sorock.ru";

export const ADDRESS = {
  WP_AJAX_URL: WP_URL + "/wp-admin/admin-ajax.php",
  WP_API_URL: WP_URL + "/wp-json/sr/v1",
}
