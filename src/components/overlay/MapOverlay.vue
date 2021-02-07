<template>
  <div
    :class="{
      'absolute left-0 md:left-5 md:p-5 top-0 md:top-5 z-top flex flex-col w-screen md:w-auto md:bg-white md:space-y-2 map-overlay': true,
      'space-y-2 bg-white': !quizMode,
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

<style scoped>
.map-overlay:hover .menu {
  display: block;
}
.menu {
  display: none;
  background-color: transparent;
}
</style>
