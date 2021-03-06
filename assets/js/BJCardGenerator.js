import BJFamily from "./constants/BJFamily.const.js";
import BJCard from "./BJCard.js";
import BJStrings from "./constants/BJStrings.const.js";
import BJCardValue from "./constants/BJCardvalue.const.js";

/**
 * Generates a deck of cards totaling to 52 cards.
 */
export default class BJCardGenerator {
  _cardFamilyCollection = [
    BJFamily.Clubs,
    BJFamily.Diamonds,
    BJFamily.Hearts,
    BJFamily.Spades,
  ];

  //Collection of BJCard Class
  _bjCardCollection = [];
  //Collection of cards generated for viewing.
  _bjViewCardCollection = [];

  /**
   * Method that returns a deck of 52 playing cards.
   * @returns An array collection of 52 cards.
   */
  generateDeckOfCards() {
    for (
      let cardFamilyIndex = 0;
      cardFamilyIndex < this._cardFamilyCollection.length;
      cardFamilyIndex++
    ) {
      //Generate playing cards from 2 to 10.
      for (let cardText = 2; cardText <= 10; cardText++) {
        //The card text and the card point are the same for # 2 to 10.
        let cardPoint = Number(cardText);
        this._bjCardCollection.push(
          new BJCard(
            cardText,
            Object.keys(BJFamily)[cardFamilyIndex],
            cardPoint
          )
        );
      }
      this._bjCardCollection.push(
        new BJCard(
          BJStrings.Ace,
          Object.keys(BJFamily)[cardFamilyIndex],
          this.aceValueCollection()
        )
      );
      this._bjCardCollection.push(
        new BJCard(
          BJStrings.Jack,
          Object.keys(BJFamily)[cardFamilyIndex],
          BJCardValue.Jack
        )
      );
      this._bjCardCollection.push(
        new BJCard(
          BJStrings.Queen,
          Object.keys(BJFamily)[cardFamilyIndex],
          BJCardValue.Queen
        )
      );
      this._bjCardCollection.push(
        new BJCard(
          BJStrings.King,
          Object.keys(BJFamily)[cardFamilyIndex],
          BJCardValue.King
        )
      );
    }
    return this._bjCardCollection;
  }

  /**
   * Creates an array of values associated with the Ace card.
   * @returns Numeric value array
   */
  aceValueCollection() {
    let aceValueCollection = [];
    for (const aceValueKey in BJCardValue.Ace)
      aceValueCollection.push(BJCardValue.Ace[aceValueKey]);
    return aceValueCollection;
  }
}
