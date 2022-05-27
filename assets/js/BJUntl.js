/**
 * This class exposes useful reusable methods
 */
export default class BJUtul {
  /**
   * Get a random number between the range provided
   * @param {number} minRange
   * @param {number} maxRange
   * @returns Random number
   */
  static getRandomNumberFromInterval(minRange, maxRange) {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + +minRange;
  }
}
