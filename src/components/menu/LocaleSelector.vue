<template>
  <select
    class="form-select rounded-l-md bg-black p-3 text-sm md:text-sm cursor-pointer text-center text-white bg-opacity-50 text-opacity-100 block w-full"
    v-model="$i18n.locale"
  >
    <option
      v-for="locale in $i18n.availableLocales"
      :key="`locale-${locale}`"
      :value="locale"
    >
      {{ locale }}
    </option>
  </select>
</template>

<script>
export default {
  name: "locale-selector",
};
</script>
