<template>
  <div class="w-screen md:w-auto" data-cy="quiz-map">
    <QuizOverlay
      :points="points"
      :district-identifier="districtIdentifier"
      :chosen-district="chosenDistrict"
      :random-district="randomDistrict"
      :correctly-chosen="correctlyChosen"
      v-if="randomDistrict"
    />
    <div
      id="map"
      :class="`bg-white min-h-screen md:border-${global.state.borderColor}-500 md:border-8`"
      data-cy="map"
    />
  </div>
</template>

<script>
import {
  setLayerColorRed,
  setLayerColorGreen,
  disableLayerHovering,
  resetLayer,
} from "@/utils/layer";
import Map from "@/components/Map.vue";
import Colors from "@/utils/color";
import QuizOverlay from "./QuizOverlay.vue";
import getRandomNumberBetween from "../../utils/random";

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
      successTimeout: 1200,
      failureTimeout: 1200,
    };
  },
  inject: ["global"],
  components: {
    QuizOverlay,
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
     * Sets the chosen district to the given one.
     *
     * @param {Object} district - The chosen district.
     */
    setChosenDistrict(district) {
      this.chosenDistrict = district;
    },
    /**
     * Increments the players points by 1.
     */
    incrementPoints() {
      this.points =
        this.points < Number.MAX_SAFE_INTEGER ? this.points + 1 : this.points;
    },
    /**
     * Decrements the players points by 1.
     */
    decrementPoints() {
      this.points = this.points > 0 ? this.points - 1 : 0;
    },
    /**
     * Executes the quiz.
     */
    startQuiz() {
      this.chosenDistrict = null;
      this.chooseRandomDistrict();
      this.layers.forEach((layer) => {
        this.initializeMapLayerForQuizMode(layer);
      });
    },
    /**
     * Initializes a layer for being used in quiz-mode.
     *
     * @param {Object} layer - The layer to initialize.
     */
    initializeMapLayerForQuizMode(layer) {
      const that = this;
      resetLayer(layer);
      layer.unbindTooltip();
      layer.removeEventListener("click");
      layer.on("click", (event) => {
        that.setChosenDistrict({ ...event.target.feature.properties });
        disableLayerHovering(event.target);
        that.handleDistrictChoice(event.target);
      });
    },
    /**
     * Handles a district being clicked.
     *
     * @param {Object} layer - The layer of the district that was chosen.
     */
    handleDistrictChoice(layer) {
      if (this.correctlyChosen) {
        this.handleCorrectChoice(layer);
      } else {
        this.handleWrongChoice(layer);
      }
    },
    /**
     * Handles a correct district choice by settings its layer color to green
     * and incrementing the players score.
     * Restarts the quiz after a timeout.
     *
     * @param {Object} layer - The layer of the district that was chosen.
     */
    handleCorrectChoice(layer) {
      clearTimeout(this.wrongChoiceTimeout);
      setLayerColorGreen(layer);
      this.global.setBorderColor(Colors.GREEN);
      this.incrementPoints();
      this.rightChoiceTimeout = setTimeout(() => {
        this.global.resetBorderColor();
        this.startQuiz();
      }, this.successTimeout);
    },
    /**
     * Handles a wrong district choice by settings its layer color to red
     * and decrementing the players score.
     * Resets the layer after a timeout.
     *
     * @param {Object} layer - The layer of the district that was chosen.
     */
    handleWrongChoice(layer) {
      setLayerColorRed(layer);
      this.global.setBorderColor(Colors.RED);
      this.decrementPoints();
      this.wrongChoiceTimeout = setTimeout(() => {
        resetLayer(layer);
        this.chosenDistrict = null;
        this.global.resetBorderColor();
      }, this.failureTimeout);
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
