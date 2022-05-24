import BJNumbers from "./constants/BJNumbers.const.js";
import BJCardValue from "./constants/BJCardvalue.const.js";
import BJStrings from "./constants/BJStrings.const.js";

/**
 * Represents a single playing card.
 */
export default class BJCard {
  _cardName = "";
  _cardFamily = "";
  _cardPointCollection = [];

  /**
   * Initialize
   * @param {string} cardName Text visible on the card
   * @param {BJFamily} cardFamily Types defined at BJFamily.const.js
   */
  constructor(cardName, cardFamily, cardPointCollection = []) {
    this._cardName = cardName.toString();
    this._cardFamily = cardFamily.toString();
    this._cardPointCollection = cardPointCollection;
  }

  /**
   * Returns the card text
   * @returns {string}
   */
  get CardName() {
    return this._cardName;
  }

  /**
   * Return the card name and along with it's family.
   * @returns {string}
   */
  get FullCardName() {
    return `${this._cardName.toLowerCase()} of ${this._cardFamily.toLowerCase()}`;
  }

  /**
   * Returns the card name as defined in the card image files.
   * @returns {string}
   */
  get CardImageName() {
    return `${this._cardName.toLowerCase()}_of_${this._cardFamily.toLowerCase()}.png`;
  }

  /**
   * Returns the value of each card.
   * @returns {number}
   */
  get CardPoints() {
    return this._cardPointCollection;
  }

  /**
   * Dynamically calculates Ace score based on current score.
   * @param {BJCard} cardRef Card reference
   * @param {number} currentScore Current score of the dealer or player
   * @returns Calculated Ace score if found and card score otherwise.
   */
  geCardPoint(currentScore) {
    /**
     * Ace is worth 1 or 11, whichever makes a better hand.
     * Hence, if the current score with Ace point of 11 is a winning score
     * or lower return Ace point with 11. Otherwise, return Ace point of 1.
     */
    if (this.CardName == BJStrings.Ace) {
      let scoreWithHighAceValue = currentScore + BJCardValue.AceEleven;
      if (scoreWithHighAceValue <= BJNumbers.WinningScore)
        return BJCardValue.AceEleven;
      else return BJCardValue.AceOne;
    }
    return this.CardPoints;
  }
}
