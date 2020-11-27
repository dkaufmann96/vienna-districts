<template>
  <div>
    <QuizOverlay
      :points="points"
      :district-identifier="districtIdentifier"
      :chosen-district="chosenDistrict"
      :random-district="randomDistrict"
      :correctly-chosen="correctlyChosen"
      :quiz-mode="quizMode"
      @set-quiz-mode="$emit('set-quiz-mode')"
      v-if="randomDistrict"
    />
    <div id="map" class="bg-white min-h-screen" />
  </div>
</template>

<script>
import getRandomNumberBetween from "../utils/random";
import setLayerColor from "../utils/layer";
import Map from "./Map.vue";

export default {
  name: "QuizMap",
  extends: Map,
  props: {
    quizMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      randomDistrict: undefined,
      chosenDistrict: undefined,
      wrongChoiceTimeout: undefined,
      rightChoiceTimeout: undefined,
      points: 0,
    };
  },
  methods: {
    /**
     * Chooses a random element from the list of districts.
     */
    chooseRandomDistrict() {
      const randomIndex = getRandomNumberBetween(0, this.layers.length - 1);
      this.randomDistrict = { ...this.layers[randomIndex].feature.properties };
    },
    /**
     * Changes the color of a layer to red.
     */
    colorLayerRed(layer) {
      setLayerColor(layer, "#ff0000");
    },
    /**
     * Changes the color of a layer to green.
     */
    colorLayerGreen(layer) {
      setLayerColor(layer, "#00cc00");
    },
    /**
     * Executes the quiz.
     */
    startQuiz() {
      this.chosenDistrict = null;
      this.chooseRandomDistrict();
      this.layers.forEach((layer) => {
        this.resetLayer(layer);
        layer.unbindTooltip();
        layer.removeEventListener("click");
        layer.on("click", (event) => {
          event.target.removeEventListener("mouseover");
          event.target.removeEventListener("mouseout");
          this.chosenDistrict = { ...event.target.feature.properties };
          if (this.correctlyChosen) {
            clearTimeout(this.wrongChoiceTimeout);
            this.colorLayerGreen(layer);
            this.points += 1;
            this.rightChoiceTimeout = setTimeout(() => {
              this.startQuiz();
            }, 1500);
          } else {
            this.colorLayerRed(layer);
            this.points = this.points > 0 ? this.points - 1 : 0;
            this.wrongChoiceTimeout = setTimeout(() => {
              setLayerColor(layer, "#808080");
              this.chosenDistrict = null;
            }, 1500);
          }
        });
      });
    },
  },
  computed: {
    /**
     * Returns either the district number or
     * the district name with a 50% probability.
     *
     * @returns {string} The district identifier.
     */
    districtIdentifier() {
      return getRandomNumberBetween(0, 2) > 1
        ? `${this.randomDistrict.BEZNR}. Bezirk`
        : `Bezirk ${this.randomDistrict.NAMEK}`;
    },
    /**
     * Returns whether the correct district was chosen or not.
     *
     * @return {boolean} - Whether the chosen district id
     * matches the randomly selected one.
     */
    correctlyChosen() {
      if (!this.chosenDistrict || !this.randomDistrict) {
        return null;
      }
      return this.randomDistrict.BEZNR === this.chosenDistrict.BEZNR;
    },
  },
  async mounted() {
    this.startQuiz();
  },
};
</script>
