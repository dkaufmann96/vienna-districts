<template>
  <div
    class="left-0 md:left-5 space-x-2 p-5 absolute top-28 z-top rounded-lg border-2 bg-white w-screen md:w-auto"
  >
    <QuizButton @click="$emit('set-quiz-mode')" :quiz-mode="quizMode" />
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
    <span class="text-gray-700">Punkte: {{ points }}</span>
  </div>
</template>

<script>
import QuizButton from "./QuizButton.vue";

export default {
  name: "QuizOverlay",
  components: {
    QuizButton,
  },
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
    quizMode: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style></style>
