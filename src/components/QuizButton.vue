<template>
  <a
    @click="global.toggleQuizMode()"
    :class="{
      'rounded-lg border-2 bg-white p-1 md:p-5 cursor-pointer text-center': true,
      'bg-green-500': global.state.quizMode,
    }"
  >
    <span>Quiz-Modus</span>
  </a>
</template>

<script>
export default {
  name: "QuizButton",
  inject: ["global"],
};
</script>
