module.exports = {
  LOCALE: "en-EN",
  ENV: process.env.NODE_ENV,
  API_URL_WP: process.env.GRIDSOME_API_URL_WP,
  API_URL_AUTH: process.env.GRIDSOME_API_URL_AUTH,
  API_URL_NEWSLETTER: process.env.GRIDSOME_API_URL_NEWSLETTER,
  API_STRIPE_CHECKOUT: process.env.GRIDSOME_API_STRIPE_CHECKOUT,
  LOCAL_STORAGE_PREFIX: process.env.GRIDSOME_LOCAL_STORAGE_PREFIX,
  AUTH_TOKEN: process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + "auth_token",
  CURR_USER: process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + "curr_user",
  CART: process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + "cart",
  STRIPE_SECRET_KEY: process.env.GRIDSOME_STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY: process.env.GRIDSOME_STRIPE_PUBLIC_KEY,
};
