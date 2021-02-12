<template>
  <div id="map" class="bg-white min-h-screen" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import setLayerColor from "../utils/layer";

export default {
  name: "Map",
  data() {
    return {
      map: undefined,
      viennaCoordinates: [48.220033, 16.373449],
      layers: [],
    };
  },
  emits: ["clicked"],
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
     * @param {Object} data - The geoJson-data to use.
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
            setLayerColor(layer, "#0000ff");
          });
          layer.on("mouseout", () => {
            setLayerColor(layer, "#808080");
          });
          layer.on("click", () => {
            that.$emit("clicked", feature.properties);
          });
          that.layers.push(layer);
        },
      });
    },
    /**
     * Resets a district layer to its default state.
     * @param {Object} layer - The district layer to reset.
     */
    resetLayer(layer) {
      setLayerColor(layer, "#808080");
      layer.on("mouseover", () => {
        setLayerColor(layer, "#0000ff");
      });
      layer.on("mouseout", () => {
        setLayerColor(layer, "#808080");
      });
    },
  },
  /**
   * Initializes the map object using the leaflet map() function.
   * Creates the district polygons afterwards using the given data.
   */
  async mounted() {
    this.map = L.map("map", {
      scrollWheelZoom: true,
      minZoom: 10,
      doubleClickZoom: false,
      zoomControl: false,
    }).setView(this.viennaCoordinates, 12);
    this.createDistrictPolygons(this.districtData).addTo(this.map);
  },
  unmounted() {
    this.map.invalidateSize();
  },
};
</script>
