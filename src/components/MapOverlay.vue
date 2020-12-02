<template>
  <div
    :class="{
      'absolute left-0 md:left-5 md:p-5 top-0 md:top-5 z-top flex flex-col w-screen md:w-auto md:bg-white md:space-y-2 md:rounded-lg md:border-2': true,
      'space-y-2 p-3 bg-white rounded-lg border-2': !quizMode,
    }"
  >
    <div
      :class="{
        'flex flex-row space-x-1 justify-center': true,
        'hidden md:flex': quizMode,
      }"
    >
      <img
        width="30"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Wien_Wappen.svg"
      />
      <h1 class="text-2xl">Wiener Bezirke</h1>
    </div>
    <QuizButton @click="toggleQuizMode" />
  </div>
</template>

<script>
import QuizButton from "./QuizButton.vue";

export default {
  name: "MapOverlay",
  emits: ["quiz-mode-toggled"],
  components: {
    QuizButton,
  },
  props: {
    quizMode: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleQuizMode() {
      this.$emit("quiz-mode-toggled");
    },
  },
};
</script>

<style></style>
