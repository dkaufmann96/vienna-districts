<template>
  <div id="map" class="bg-white min-h-screen" data-cy="map" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { setLayerTooltip, setLayerColor } from "../utils/layer";

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
          that.initializeMapLayer(layer, feature);
          that.layers.push(layer);
        },
      });
    },
    /**
     * Initializes a map layer.
     * @param {Object} layer - The layer to initialize.
     * @param {Object} data - The data to use for initialization.
     */
    initializeMapLayer(layer, data) {
      const that = this;
      setLayerTooltip(
        layer,
        `<b>${data.properties.NAMEK_NUM}</b><br/>
            Fläche: ${data.properties.UMFANG}m²`
      );
      layer.on("mouseover", () => {
        setLayerColor(layer, "#0000ff");
      });
      layer.on("mouseout", () => {
        setLayerColor(layer, "#808080");
      });
      layer.on("click", () => {
        that.$emit("clicked", data.properties);
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
