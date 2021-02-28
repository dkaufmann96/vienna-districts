<template>
  <div
    :class="{
      'absolute left-0 md:left-5 md:p-5 top-0 md:top-5 z-top flex flex-col w-screen md:w-auto md:space-y-2 md:bg-transparent bg-white max-h-12': true,
      'space-y-2 md:bg-transparent bg-white': !quizMode,
    }"
    data-cy="map-overlay"
  >
    <div
      :class="{
        'flex flex-row space-x-1 justify-center': true,
        'hidden md:flex': quizMode,
      }"
      data-cy="heading-container"
    >
      <img
        width="30"
        data-cy="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Wien_Wappen.svg"
      />
      <h1 class="text-2xl" data-cy="heading">Wiener Bezirke</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapOverlay",
  emits: ["quiz-mode-toggled"],
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
