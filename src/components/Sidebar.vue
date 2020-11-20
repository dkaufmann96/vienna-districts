<template>
  <transition name="fade">
    <div
      class="p-5 w-full h-screen rounded border-current space-y-2 transition-all duration-700 ease-in-out overflow-y-scroll"
    >
      <h2 class="text-gray-700 text-lg">{{ district.NAMEK_NUM }}</h2>
      <p class="text-gray-700 text-base" v-if="information">
        {{ information.extract }}
      </p>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "Sidebar",
  props: {
    district: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      information: undefined,
      specialLinks: [1, 7, 8, 14, 23],
    };
  },
  watch: {
    async district() {
      this.information = null;
      this.information = await this.getWikipediaSummary();
    },
  },
  async mounted() {
    this.information = await this.getWikipediaSummary();
  },
  methods: {
    async getWikipediaSummary() {
      const searchTerm = this.specialLinks.find(
        (id) => id === this.district.BEZNR
      )
        ? `${this.district.NAMEK}_(Wien)`
        : this.district.NAMEK;
      const { data } = await axios.get(
        `https://de.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`
      );
      return data;
    },
  },
  unmounted() {
    this.information = null;
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
