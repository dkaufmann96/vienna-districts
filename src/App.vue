<template>
  <div class="relative md:grid md:grid-cols-5 md:divide-x-2">
    <div
      :class="{
        'md:col-span-4': selectedDistrict,
        'md:col-span-5': !selectedDistrict,
      }"
    >
      <template v-if="districtData">
        <MapOverlay
          @quiz-mode-toggled="selectedDistrict = null"
          :quiz-mode="quizMode"
        />
        <QuizMap :district-data="districtData" v-if="quizMode"></QuizMap>
        <Map :district-data="districtData" @clicked="selectDistrict" v-else />
      </template>
    </div>
    <div
      class="absolute md:relative inset-0 flex items-center justify-center md:col-span-1"
    >
      <Sidebar
        :district="selectedDistrict"
        @closed="selectedDistrict = null"
        v-if="selectedDistrict"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global from "./state/global";
import Map from "./components/Map.vue";
import QuizMap from "./components/QuizMap.vue";
import Sidebar from "./components/Sidebar.vue";
import MapOverlay from "./components/MapOverlay.vue";

export default {
  name: "App",
  components: {
    Map,
    QuizMap,
    Sidebar,
    MapOverlay,
  },
  provide: {
    global,
  },
  computed: {
    quizMode() {
      return global.state.quizMode;
    },
  },
  data() {
    return {
      districtSource:
        "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json",
      districtData: undefined,
      selectedDistrict: undefined,
    };
  },
  methods: {
    /**
     * Gets the open data about the districts of vienna.
     * The is structured in GeoJSON-format.
     * Source: https://data.wien.gv.at
     */
    getDistrictData() {
      const logger = console;
      if (localStorage.getItem("districts")) {
        // return cached data
        this.districtData = JSON.parse(localStorage.getItem("districts"));
      } else {
        axios.get(this.districtSource).then((response) => {
          if (response.status === 200) {
            localStorage.setItem("districts", JSON.stringify(response.data)); // cache data
            this.districtData = response.data;
          } else {
            logger.error(response.statusText);
          }
        });
      }
    },
    /**
     * Sets the selected district.
     */
    selectDistrict(district) {
      this.selectedDistrict =
        this.selectedDistrict === district ? null : district;
    },
    /**
     * Enables the quiz mode and closes the sidebar.
     */
    setQuizMode() {
      this.selectedDistrict = null;
      this.quizMode = !this.quizMode;
    },
  },
  mounted() {
    this.getDistrictData();
  },
};
</script>
<style lang="css">
@tailwind base;

@tailwind components;

@tailwind utilities;
html {
  overflow: hidden;
}
body {
  margin: 0;
}
</style>
