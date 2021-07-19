import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";

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
  },
};

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages,
});

const app = createApp(App);

app.use(i18n);

app.mount("#app");
