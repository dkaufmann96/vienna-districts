<template>
  <div id="map"></div>
</template>

<script>
import axios from "axios";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  data() {
    return {
      districtSource:
        "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEZIRKSGRENZEOGD&srsName=EPSG:4326&outputFormat=json",
      map: undefined,
      viennaCoordinates: [48.220033, 16.373449],
    };
  },
  methods: {
    /**
     * Creates the polygons representing the districts of vienna.
     * The GeoJSON data is parsed by the built-in geoJSON-function
     * of the leaflet framework.
     * Each district is assigned a tooltip that contains data about it.
     * @param {Object} data
     */
    createDistrictPolygons(data) {
      return L.geoJSON(data, {
        style() {
          return { color: "#808080", width: 2 };
        },
        onEachFeature(feature, layer) {
          layer.bindTooltip(`<b>${feature.properties.NAMEK_NUM}</b><br/>
            Fläche: ${feature.properties.UMFANG}m²`);
          layer.on("mouseover", function () {
            this.setStyle({
              fillColor: "#0000ff",
            });
          });
          layer.on("mouseout", function () {
            this.setStyle({
              fillColor: "#808080",
            });
          });
        },
      });
    },

    /**
     * Gets the open data about the districts of vienna.
     * The is structured in GeoJSON-format.
     * Source: https://data.wien.gv.at
     */
    getDistrictData() {
      const that = this;
      return new Promise(function (resolve, reject) {
        if (localStorage.getItem("districts")) {
          // return cached data
          resolve(JSON.parse(localStorage.getItem("districts")));
        }
        axios.get(that.districtSource).then((response) => {
          if (response.status === 200) {
            localStorage.setItem("districts", JSON.stringify(response.data)); // cache data
            resolve(response.data);
          } else {
            reject({
              status: response.status,
              statusText: response.statusText,
            });
          }
        });
      });
    },
  },
  async mounted() {
    this.map = L.map("map", { scrollWheelZoom: false, minZoom: 12 }).setView(
      this.viennaCoordinates,
      12
    );
    const districtData = await this.getDistrictData();
    this.createDistrictPolygons(districtData).addTo(this.map);
  },
};
</script>
<style lang="css" scoped>
html {
  overflow: hidden;
}

body {
  margin: 0;
}

#map {
  min-height: 100vh;
}
</style>