<template>
  <div class="w-screen md:w-auto">
    <QuizOverlay
      :points="points"
      :district-identifier="districtIdentifier"
      :chosen-district="chosenDistrict"
      :random-district="randomDistrict"
      :correctly-chosen="correctlyChosen"
      v-if="randomDistrict"
    />
    <div id="map" class="bg-white min-h-screen md:border-red-700 md:border-8" />
  </div>
</template>

<script>
import getRandomNumberBetween from "../../utils/random";
import setLayerColor from "../../utils/layer";
import Map from "../Map.vue";
import QuizOverlay from "./QuizOverlay.vue";

export default {
  name: "QuizMap",
  extends: Map,
  data() {
    return {
      randomDistrict: undefined,
      chosenDistrict: undefined,
      wrongChoiceTimeout: undefined,
      rightChoiceTimeout: undefined,
      points: 0,
      clickedDistrictNr: undefined,
    };
  },
  components: {
    QuizOverlay,
  },
  methods: {
    /**
     * Chooses a random element from the list of districts.
     */
    chooseRandomDistrict() {
      const randomIndex = getRandomNumberBetween(0, this.layers.length - 1);
      if (
        this.layers[randomIndex].feature.properties.BEZNR ===
        this.selectedDistrictNr
      ) {
        this.chooseRandomDistrict();
      }
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
          this.chosenDistrict = { ...event.target.feature.properties };
          this.clickedDistrictNr = this.chosenDistrict.BEZNR;
          event.target.removeEventListener("mouseover");
          event.target.removeEventListener("mouseout");
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
              this.resetLayer(layer);
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
