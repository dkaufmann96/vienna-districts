<template>
  <a
    @click="$emit('click')"
    :class="{
      'absolute left-0 md:left-5 top-0 md:top-5 z-top rounded-lg border-2 bg-white p-5 space-x-2 cursor-pointer w-screen md:w-auto text-center': true,
      'bg-green-500': quizMode,
    }"
  >
    <span>Quiz-Modus</span>
  </a>
</template>

<script>
export default {
  name: "QuizButton",
  props: {
    quizMode: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
