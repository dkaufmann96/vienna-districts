import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

const app = createApp(App);

const messages = {
  en: {
    message: {
      "quiz-button": "Quiz",
      "vienna-districts": "Vienna Districts",
      "more-infos": "More Information",
      "correct-choice": "Correct Choice",
      "wrong-choice": "Wrong Choice",
      "chosen-district": "The {0} was chosen",
      "choose-district": "Select the {0}!",
      "district-with-name": "{districtNumber}. district ({districtName})",
      "district-with-identifier": "{identifier}",
      score: "Score",
    },
    links: {
      1: "https://en.wikipedia.org/api/rest_v1/page/summary/Innere_Stadt",
      2: "https://en.wikipedia.org/api/rest_v1/page/summary/Leopoldstadt",
      3: "https://en.wikipedia.org/api/rest_v1/page/summary/Landstraße",
      4: "https://en.wikipedia.org/api/rest_v1/page/summary/Wieden",
      5: "https://en.wikipedia.org/api/rest_v1/page/summary/Margareten",
      6: "https://en.wikipedia.org/api/rest_v1/page/summary/Mariahilf",
      7: "https://en.wikipedia.org/api/rest_v1/page/summary/Neubau",
      8: "https://en.wikipedia.org/api/rest_v1/page/summary/Josefstadt",
      9: "https://en.wikipedia.org/api/rest_v1/page/summary/Alsergrund",
      10: "https://en.wikipedia.org/api/rest_v1/page/summary/Favoriten",
      11: "https://en.wikipedia.org/api/rest_v1/page/summary/Simmering_(Vienna)",
      12: "https://en.wikipedia.org/api/rest_v1/page/summary/Meidling",
      13: "https://en.wikipedia.org/api/rest_v1/page/summary/Hietzing",
      14: "https://en.wikipedia.org/api/rest_v1/page/summary/Penzing_(Vienna)",
      15: "https://en.wikipedia.org/api/rest_v1/page/summary/Rudolfsheim-Fünfhaus",
      16: "https://en.wikipedia.org/api/rest_v1/page/summary/Ottakring",
      17: "https://en.wikipedia.org/api/rest_v1/page/summary/Hernals",
      18: "https://en.wikipedia.org/api/rest_v1/page/summary/Währing",
      19: "https://en.wikipedia.org/api/rest_v1/page/summary/Döbling",
      20: "https://en.wikipedia.org/api/rest_v1/page/summary/Brigittenau",
      21: "https://en.wikipedia.org/api/rest_v1/page/summary/Floridsdorf",
      22: "https://en.wikipedia.org/api/rest_v1/page/summary/Donaustadt",
      23: "https://en.wikipedia.org/api/rest_v1/page/summary/Liesing",
    },
  },
  de: {
    message: {
      "quiz-button": "Quiz",
      "vienna-districts": "Wiener Bezirke",
      "more-infos": "Mehr Infos",
      "correct-choice": "Richtige Auswahl",
      "wrong-choice": "Falsche Auswahl",
      "chosen-district": "Der {0} wurde ausgewählt",
      "choose-district": "Wählen Sie den {0} aus!",
      "district-with-name": "{districtNumber}. Bezirk ({districtName})",
      "district-with-identifier": "{identifier}",
      score: "Punkte",
    },
    links: {
      1: "https://de.wikipedia.org/api/rest_v1/page/summary/Innere_Stadt_(Wien)",
      2: "https://de.wikipedia.org/api/rest_v1/page/summary/Leopoldstadt",
      3: "https://de.wikipedia.org/api/rest_v1/page/summary/Landstraße_(Wien)",
      4: "https://de.wikipedia.org/api/rest_v1/page/summary/Wieden_(Wien)",
      5: "https://de.wikipedia.org/api/rest_v1/page/summary/Margareten",
      6: "https://de.wikipedia.org/api/rest_v1/page/summary/Mariahilf",
      7: "https://de.wikipedia.org/api/rest_v1/page/summary/Neubau_(Wien)",
      8: "https://de.wikipedia.org/api/rest_v1/page/summary/Josefstadt_(Wien)",
      9: "https://de.wikipedia.org/api/rest_v1/page/summary/Alsergrund",
      10: "https://de.wikipedia.org/api/rest_v1/page/summary/Favoriten",
      11: "https://de.wikipedia.org/api/rest_v1/page/summary/Simmering",
      12: "https://de.wikipedia.org/api/rest_v1/page/summary/Meidling",
      13: "https://de.wikipedia.org/api/rest_v1/page/summary/Hietzing",
      14: "https://de.wikipedia.org/api/rest_v1/page/summary/Penzing_(Wien)",
      15: "https://de.wikipedia.org/api/rest_v1/page/summary/Rudolfsheim-Fünfhaus",
      16: "https://de.wikipedia.org/api/rest_v1/page/summary/Ottakring",
      17: "https://de.wikipedia.org/api/rest_v1/page/summary/Hernals",
      18: "https://de.wikipedia.org/api/rest_v1/page/summary/Währing",
      19: "https://de.wikipedia.org/api/rest_v1/page/summary/Döbling",
      20: "https://de.wikipedia.org/api/rest_v1/page/summary/Brigittenau",
      21: "https://de.wikipedia.org/api/rest_v1/page/summary/Floridsdorf",
      22: "https://de.wikipedia.org/api/rest_v1/page/summary/Donaustadt",
      23: "https://de.wikipedia.org/api/rest_v1/page/summary/Liesing_(Wien)",
    },
  },
};

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages,
});

const routes = [
  {
    path: "/:locale",
    name: "Home",
    component: {
      template: "<router-view></router-view>",
    },
    beforeEnter: (to, from, next) => {
      const { locale } = to.params;
      const supportedLocales = ["de", "en"];
      if (!supportedLocales.includes(locale)) return next("de");
      if (i18n.global.locale !== locale) {
        i18n.global.locale = locale;
      }
      return next();
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect() {
      return "de";
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(i18n);

app.use(router);

app.mount("#app");
