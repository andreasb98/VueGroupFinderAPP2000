import Vue from "vue";
import VueI18n from "vue-i18n";

//Andreas hele fila - i18n er en modul som muliggjør translate av tags over hele nettsiden
//          Funksjonen under leter etter alle språkfiler i mappen locales og legger dem til slik at bruker kan endre vilkårlig
Vue.use(VueI18n);

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
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: "NO",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "NO",
  messages: loadLocaleMessages(),
});
