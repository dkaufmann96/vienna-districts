<template>
  <div class="p-5 w-full h-full rounded border-current space-y-2">
    <h2 class="text-gray-700 text-lg">{{ district.NAMEK_NUM }}</h2>
    <p class="text-gray-700 text-base">Text</p>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    district: {
      type: Object,
      required: true,
    },
  },
};
</script>
