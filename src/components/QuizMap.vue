<template>
  <div>
    <div
      class="flex flex-row space-x-2 p-5 absolute left-5 top-28 z-10 rounded-lg border-2 bg-white"
    >
      <span class="text-green-500" v-if="correctlyChosen"
        >Richtige Auswahl: Der
        <b>{{ chosenDistrict.BEZNR }}. Bezirk ({{ chosenDistrict.NAMEK }})</b>
        wurde ausgewählt.</span
      >
      <span class="text-red-500" v-else-if="correctlyChosen === false"
        >Falsche Auswahl: Der
        <b>{{ chosenDistrict.BEZNR }}. Bezirk ({{ chosenDistrict.NAMEK }})</b>
        wurde ausgewählt.</span
      >
      <span class="text-gray-700" v-else-if="randomDistrict"
        >Wählen Sie den <b>{{ districtIdentifier }}</b> aus!</span
      >
    </div>
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
  data() {
    return {
      randomDistrict: undefined,
      chosenDistrict: undefined,
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
            this.colorLayerGreen(layer);
            setTimeout(() => {
              this.startQuiz();
            }, 1500);
          } else {
            this.colorLayerRed(layer);
            setTimeout(() => {
              setLayerColor(layer, "#808080");
              this.chosenDistrict = null;
            }, 1500);
          }
        });
      });
    },
  },
  computed: {
    districtIdentifier() {
      return getRandomNumberBetween(0, 2) > 1
        ? `${this.randomDistrict.BEZNR}. Bezirk`
        : `Bezirk ${this.randomDistrict.NAMEK}`;
    },
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
