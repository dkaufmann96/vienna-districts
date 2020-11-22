/**
 * Sets the color of the given layer.
 * @param {Object} layer - The layer to change the color of.
 * @param {string} color - The color to use.
 */
export default function setLayerColor(layer, color) {
  layer.setStyle({
    fillColor: color,
  });
}
