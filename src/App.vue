<template>
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
      quizMode: true,
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
    selectDistrict(district) {
      this.selectedDistrict =
        this.selectedDistrict === district ? null : district;
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
