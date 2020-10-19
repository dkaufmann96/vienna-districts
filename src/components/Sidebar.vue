<template>
  <transition name="fade">
    <div
      class="p-5 w-full h-full rounded border-current space-y-2"
      v-if="district"
    >
      <h2 class="text-gray-700 text-lg">{{ district.NAMEK_NUM }}</h2>
      <p class="text-gray-700 text-base">Text</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    district: {
      type: Object,
      required: false,
    },
  },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
