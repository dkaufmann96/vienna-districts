<template>
  <div class="relative md:grid md:grid-cols-5 md:divide-x-2">
    <MapOverlay
      @quiz-mode-toggled="selectedDistrict = null"
      :quiz-mode="quizMode"
    />
    <div
      :class="{
        'md:col-span-4': selectedDistrict,
        'md:col-span-5': !selectedDistrict,
      }"
      v-if="districtData"
    >
      <QuizMap :district-data="districtData" v-if="quizMode"></QuizMap>
      <Map :district-data="districtData" @clicked="selectDistrict" v-else />
      <MapMenu />
    </div>
    <LoadingSpinner v-else />
    <div
      class="absolute md:relative inset-0 flex items-center justify-center md:col-span-1"
      v-if="selectedDistrict"
    >
      <Sidebar :district="selectedDistrict" @closed="selectedDistrict = null" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QuizMap from "@/components/quiz/QuizMap.vue";
import global from "@/state/global";
import Map from "@/components/Map.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import MapOverlay from "@/components/overlay/MapOverlay.vue";
import MapMenu from "@/components/menu/MapMenu.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "App",
  components: {
    Map,
    QuizMap,
    Sidebar,
    MapOverlay,
    MapMenu,
    LoadingSpinner,
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
  created() {
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
  padding: 0;
  margin: 0;
}
html,
body,
#map {
  height: 100%;
  width: 100vw;
}
</style>
