/**
 * Gets a random number in a range.
 * @param {number} from - The start of the range.
 * @param {number} to - The end of the range.
 */
export default function getRandomNumberBetween(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
