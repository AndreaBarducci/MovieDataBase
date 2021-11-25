import { createI18n } from "vue-i18n";

function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}
const i18n = createI18n({
  legacy: true,
  locale: "",
  messages: loadLocaleMessages(),
});

export default i18n;

export const updateLocal = (locale) => (i18n.global.locale = locale);

export const getCurrentLocale = () => i18n.global.locale;
