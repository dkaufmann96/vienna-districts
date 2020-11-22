<template>
  <div>
    <div class="flex flex-row space-x-2">
      <span class="text-gray-700" v-if="randomDistrict"
        >Wählen Sie den
        <b>{{ randomDistrict.feature.properties.BEZ }}. Bezirk</b> aus!</span
      >
      <span class="text-green-500" v-if="correctlyChosen"
        >Richtige Auswahl</span
      >
      <span class="text-red-500" v-if="correctlyChosen === false"
        >Falsche Auswahl: Der
        <b>{{ chosenDistrict.feature.properties.BEZ }}. Bezirk</b> wurde
        ausgewählt.</span
      >
    </div>
    <div id="map" class="bg-white min-h-screen" />
  </div>
</template>

<script>
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
      const randomIndex = Math.floor(
        Math.random() * Math.floor(this.layers.length)
      );
      this.randomDistrict = this.layers[randomIndex];
    },
    startQuiz() {
      this.chooseRandomDistrict();
      this.layers.forEach((layer) => {
        this.resetLayer(layer);
        layer.unbindTooltip();
        layer.on("click", (event) => {
          this.chosenDistrict = event.target;
          this.chosenDistrict.removeEventListener("mouseover");
          this.chosenDistrict.removeEventListener("mouseout");
          if (this.correctlyChosen) {
            this.chosenDistrict.setStyle({
              fillColor: "green",
            });
            setTimeout(() => {
              this.chosenDistrict = null;
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
    correctlyChosen() {
      if (!this.chosenDistrict || !this.randomDistrict) {
        return undefined;
      }
      return (
        this.randomDistrict.feature.properties.BEZNR ===
        this.chosenDistrict.feature.properties.BEZNR
      );
    },
  },
  async mounted() {
    this.startQuiz();
  },
};
</script>
