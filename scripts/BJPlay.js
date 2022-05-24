import BJCardGenerator from "./BJCardGenerator.js";
import BJUtul from "./BJUntl.js";

/**
 *
 */
export default class BJPlay {
  _originalCardCollection = [];
  _playingCardCollection = [];

  _playersCards = [];
  _dealersCards = [];

  /**
   *
   * @param {BJCardGenerator} cardGeneratorRef
   */
  constructor(cardGeneratorRef) {
    this._originalCardCollection = cardGeneratorRef.GenerateDeckOfCards();
    Object.assign(this._playingCardCollection, this._originalCardCollection);
    this.setPlayerCards(2);
    this.setDealerCards(1);
  }

  /**
   * Returns a collection of the players cards
   * @returns {BJCard[]}
   */
  get getPlayersCards() {
    return this._playersCards;
  }

  /**
   * Returns a collection of the dealers cards
   * @returns {BJCard[]}
   */
  get getDealersCards() {
    return this._dealersCards;
  }

  setPlayerCards(totalCardCount) {
    for (let i = 0; i < totalCardCount; i++) {
      let cardIndex = this.getCardIndexFromPlayingCards();
      this._playersCards.push(this._playingCardCollection[cardIndex]);
      this._playingCardCollection.splice(cardIndex, 1);
    }
  }

  /**
   * Record and returns the reference of the third card of the player
   * @returns {BJCard}
   */
  addAdditionalCardForPlayer() {
    let cardIndex = this.getCardIndexFromPlayingCards();
    this._playersCards.push(this._playingCardCollection[cardIndex]);
    this._playingCardCollection.splice(cardIndex, 1);
    return this._playersCards[this._playersCards.length - 1];
  }

  /**
   * Record and returns the reference of the second card of the dealer
   * @returns {BJCard}
   */
  addAdditionalCardForDealer() {
    let cardIndex = this.getCardIndexFromPlayingCards();
    this._dealersCards.push(this._playingCardCollection[cardIndex]);
    this._playingCardCollection.splice(cardIndex, 1);
    return this._dealersCards[this._dealersCards.length - 1];
  }

  setDealerCards(totalCardCount) {
    for (let i = 0; i < totalCardCount; i++) {
      let cardIndex = this.getCardIndexFromPlayingCards();
      this._dealersCards.push(this._playingCardCollection[cardIndex]);
      this._playingCardCollection.splice(cardIndex, 1);
    }
  }

  getCardIndexFromPlayingCards() {
    let randomCardIndex = BJUtul.getRandomNumberFromInterval(
      1,
      this._playingCardCollection.length
    );
    return randomCardIndex - 1;
  }
}
