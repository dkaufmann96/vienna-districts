<template>
  <div>
    <a
      @click="setQuizMode"
      :class="{
        'absolute left-5 top-5 z-top rounded-lg border-2 bg-white p-5 space-x-2 cursor-pointer': true,
        'bg-green-500': quizMode,
      }"
    >
      <span>Quiz-Modus</span>
    </a>
    <div class="grid grid-cols-5 divide-x-2">
      <div
        :class="{
          'col-span-4': selectedDistrict,
          'col-span-5': !selectedDistrict,
        }"
      >
        <template v-if="districtData">
          <QuizMap :district-data="districtData" v-if="quizMode"></QuizMap>
          <Map :district-data="districtData" @clicked="selectDistrict" v-else />
        </template>
      </div>
      <Sidebar
        class="col-span-1"
        :district="selectedDistrict"
        v-if="selectedDistrict"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Map from "./components/Map.vue";
import QuizMap from "./components/QuizMap.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Map,
    QuizMap,
    Sidebar,
  },
  data() {
    return {
      districtSource:
        "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json",
      districtData: undefined,
      selectedDistrict: undefined,
      quizMode: false,
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
