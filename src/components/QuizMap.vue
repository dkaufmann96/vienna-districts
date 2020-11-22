<template>
  <div>
    <div class="flex flex-row space-x-2">
      <span class="text-gray-700" v-if="randomDistrict"
        >Wählen Sie den <b>{{ districtIdentifier }}</b> aus!</span
      >
      <span class="text-green-500" v-if="correctlyChosen"
        >Richtige Auswahl</span
      >
      <span class="text-red-500" v-if="correctlyChosen === false"
        >Falsche Auswahl: Der <b>{{ chosenDistrict.BEZNR }}. Bezirk</b> wurde
        ausgewählt.</span
      >
    </div>
    <div id="map" class="bg-white min-h-screen" />
  </div>
</template>

<script>
import getRandomNumberBetween from "../utils/random";
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
    chooseRandomDistrict() {
      const randomIndex = getRandomNumberBetween(0, this.layers.length);
      this.randomDistrict = { ...this.layers[randomIndex].feature.properties };
    },
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
            event.target.setStyle({
              fillColor: "green",
            });
            setTimeout(() => {
              this.startQuiz();
            }, 1500);
          } else {
            event.target.setStyle({
              fillColor: "red",
            });
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
