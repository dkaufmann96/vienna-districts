<template>
  <a
    @click="global.toggleQuizMode()"
    class="quiz-button rounded-l-md bg-black p-3 text-md md:text-lg cursor-pointer text-center text-white bg-opacity-50 text-opacity-100"
    data-cy="quiz-button"
  >
    Quiz
  </a>
</template>

<script>
export default {
  name: "QuizButton",
  inject: ["global"],
};
</script>

<style scoped>
.quiz-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
