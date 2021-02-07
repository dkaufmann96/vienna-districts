<template>
  <div class="absolute right-0 md:right-0 top-36 md:top-10 z-top">
    <QuizButton @click="toggleQuizMode" class="mb-2" />
  </div>
</template>

<script>
import QuizButton from "../quiz/QuizButton.vue";

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
  inject: ["global"],
  methods: {
    toggleQuizMode() {
      this.$emit("quiz-mode-toggled");
    },
  },
};
</script>

<style scoped>
.map-overlay:hover .menu {
  display: block;
}
.menu {
  display: none;
  background-color: transparent;
}
</style>
