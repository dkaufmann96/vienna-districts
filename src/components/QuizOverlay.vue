<template>
  <div
    class="left-0 md:left-5 p-1 md:p-5 absolute top-9 md:top-48 z-top rounded-lg border-2 bg-white w-screen md:w-auto text-sm md:text-md"
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
    <div class="text-gray-700">Punkte: {{ points }}</div>
  </div>
</template>

<script>
export default {
  name: "QuizOverlay",
  props: {
    points: {
      type: Number,
      default: 0,
      required: true,
    },
    randomDistrict: {
      type: Object,
      required: true,
    },
    correctlyChosen: {
      required: true,
    },
    chosenDistrict: {
      type: Object,
      required: false,
    },
    districtIdentifier: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
