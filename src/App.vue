<template>
  <div class="container">
    <Map v-if="districtData" :district-data="districtData" />
  </div>
</template>

<script>
import axios from "axios";
import Map from "./components/Map.vue";

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      districtSource:
        "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json",
      districtData: undefined,
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
      }
      axios.get(this.districtSource).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("districts", JSON.stringify(response.data)); // cache data
          this.districtData = response.data;
        } else {
          logger.error(response.statusText);
        }
      });
    },
  },
  mounted() {
    this.getDistrictData();
  },
};
</script>
<style lang="scss">
html {
  overflow: hidden;
}
body {
  margin: 0;
}
</style>
