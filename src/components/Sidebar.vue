<template>
  <transition name="fade">
    <div
      class="p-5 w-3/4 md:w-full h-3/4 md:h-screen rounded border-current space-y-0 md:space-y-2 transition-all duration-700 ease-in-out overflow-y-scroll bg-white z-top"
    >
      <div class="w-full flex flex-row justify-end">
        <span class="text-gray-700 text-base" @click="close">x</span>
      </div>
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
      specialDistricts: [1, 7, 8, 14, 23],
    };
  },
  watch: {
    /**
     * Fetches wikipedia information whenever the selected district changes.
     */
    async district() {
      this.information = null;
      this.information = await this.getWikipediaSummary();
    },
  },
  async mounted() {
    this.information = await this.getWikipediaSummary();
  },
  methods: {
    /**
     * Returns the information for a district fetched from wikipedia.
     */
    async getWikipediaSummary() {
      const { data } = await axios.get(
        `https://de.wikipedia.org/api/rest_v1/page/summary/${this.districtIdentifier}`
      );
      return data;
    },
    close() {
      this.$emit("closed");
    },
  },
  computed: {
    /**
     * Returns the correct identifier for a district to look in wikipedia.
     * Almost all districts can be found on wikipedia using their name.
     * Following districts are an exception: 1, 7, 8, 14, 23.
     * For these districts "_(Wien)" has to be appended to the title
     * to be able to get the wikipedia data.
     */
    districtIdentifier() {
      return this.specialDistricts.find((id) => id === this.district.BEZNR)
        ? `${this.district.NAMEK}_(Wien)`
        : this.district.NAMEK;
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
