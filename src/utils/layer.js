/**
 * Sets the color of the given layer.
 * @param {Object} layer - The layer to change the color of.
 * @param {string} color - The color to use.
 */
export function setLayerColor(layer, color) {
  layer.setStyle({
    fillColor: color,
  });
}

/**
 * Resets a district layer to its default state.
 * @param {Object} layer - The district layer to reset.
 */
export function resetLayer(layer) {
  setLayerColor(layer, "#808080");
  layer.on("mouseover", () => {
    setLayerColor(layer, "#0000ff");
  });
  layer.on("mouseout", () => {
    setLayerColor(layer, "#808080");
  });
}

/**
 * Sets the tooltip text of the given layer.
 * @param {Object} layer - The layer to add a tooltip to.
 * @param {*} text - The text to use for the tooltip.
 */
export function setLayerTooltip(layer, text) {
  layer.bindTooltip(text);
}

/**
 * Changes the color of a layer to red.
 * @param {Object} layer - The layer to color.
 */
export function setLayerColorRed(layer) {
  setLayerColor(layer, "#ff0000");
}

/**
 * Changes the color of a layer to green.
 * @param {Object} layer - The layer to color.
 */
export function setLayerColorGreen(layer) {
  setLayerColor(layer, "#00cc00");
}

/**
 * Sets the class of a layer.
 * @param {Object} layer - The layer to set the class on.
 * @param {String} className - The class to set.
 */
export function setLayerClass(layer, className) {
  layer.setStyle({
    className,
  });
}

/**
 * Disables all hovering events for the given layer.
 * @param {Object} layer - The layer to use.
 */
export function disableLayerHovering(layer) {
  layer.removeEventListener("mouseover");
  layer.removeEventListener("mouseout");
}
