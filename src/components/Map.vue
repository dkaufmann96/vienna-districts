<template>
  <div id="map" class="bg-white min-h-screen" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "Map",
  data() {
    return {
      map: undefined,
      viennaCoordinates: [48.220033, 16.373449],
      layers: [],
    };
  },
  props: {
    districtData: {
      type: Object,
      required: true,
    },
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
      const that = this;
      return L.geoJSON(data, {
        style() {
          return { color: "#808080", width: 2 };
        },
        onEachFeature(feature, layer) {
          layer.bindTooltip(`<b>${feature.properties.NAMEK_NUM}</b><br/>
            Fläche: ${feature.properties.UMFANG}m²`);
          layer.on("mouseover", () => {
            layer.setStyle({
              fillColor: "#0000ff",
            });
          });
          layer.on("mouseout", () => {
            layer.setStyle({
              fillColor: "#808080",
            });
          });
          layer.on("click", () => {
            that.$emit("clicked", feature.properties);
          });
          that.layers.push(layer);
        },
      });
    },
    resetLayer(layer) {
      layer.setStyle({
        fillColor: "#808080",
      });
      layer.on("mouseover", () => {
        layer.setStyle({
          fillColor: "#0000ff",
        });
      });
      layer.on("mouseout", () => {
        layer.setStyle({
          fillColor: "#808080",
        });
      });
    },
  },
  async mounted() {
    this.map = L.map("map", {
      scrollWheelZoom: false,
      minZoom: 12,
      doubleClickZoom: false,
    }).setView(this.viennaCoordinates, 12);
    this.createDistrictPolygons(this.districtData).addTo(this.map);
  },
};
</script>
