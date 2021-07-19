<template>
  <div
    :class="`left-0 md:left-5 p-1 md:p-8 absolute top-0 md:top-28 z-top border-8 bg-white md:border-gray-500 md:border-2 rounded-lg border-${global.state.borderColor}-500 w-screen md:w-auto text-sm md:text-md`"
    data-cy="quiz-overlay"
    :data-attribute="randomDistrict.BEZNR"
  >
    <span class="text-green-500" v-if="correctlyChosen"
      >{{ $t("message.correct-choice") }}:
      <i18n-t
        keypath="message.chosen-district"
        tag="span"
        for="message.district-with-name"
      >
        <b>{{
          $t("message.district-with-name", {
            districtNumber: chosenDistrict.BEZNR,
            districtName: chosenDistrict.NAMEK,
          })
        }}</b></i18n-t
      ></span
    >
    <span class="text-red-500" v-else-if="correctlyChosen === false"
      >{{ $t("message.wrong-choice") }}:
      <i18n-t
        keypath="message.chosen-district"
        tag="span"
        for="message.district-with-name"
      >
        <b>{{
          $t("message.district-with-name", {
            districtNumber: chosenDistrict.BEZNR,
            districtName: chosenDistrict.NAMEK,
          })
        }}</b></i18n-t
      ></span
    >
    <span class="text-gray-700" v-else-if="randomDistrict">
      <i18n-t
        keypath="message.choose-district"
        tag="span"
        for="message.district-with-identifier"
      >
        <b>{{
          $t("message.district-with-identifier", {
            identifier: districtIdentifier,
          })
        }}</b></i18n-t
      ></span
    >
    <div class="text-gray-700">{{ $t("message.score") }}: {{ points }}</div>
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
  inject: ["global"],
};
</script>

<style></style>
