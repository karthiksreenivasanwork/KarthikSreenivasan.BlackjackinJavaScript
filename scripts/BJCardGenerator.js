import BJFamily from "./constants/BJFamily.const.js";
import BJCard from "./BJCard.js";
import BJStrings from "./constants/BJStrings.const.js";

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
  GenerateDeckOfCards() {
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
          [1, 11]
        )
      );
      this._bjCardCollection.push(
        new BJCard(BJStrings.Jack, Object.keys(BJFamily)[cardFamilyIndex], 10)
      );
      this._bjCardCollection.push(
        new BJCard(BJStrings.Queen, Object.keys(BJFamily)[cardFamilyIndex], 10)
      );
      this._bjCardCollection.push(
        new BJCard(BJStrings.King, Object.keys(BJFamily)[cardFamilyIndex], 10)
      );
    }
    return this._bjCardCollection;
  }

  /**
   * Generate a collection if required and return the playing cards with it's points as a string array.
   * @returns Collection of cards along with it's points as string array.
   */
  ViewCardCollectionwithPoints() {
    if (this._bjViewCardCollection.length > 0)
      return this._bjViewCardCollection;

    if (this._bjCardCollection.length > 0) {
      this._bjCardCollection.forEach((bjCard) => {
        if (bjCard.CardPoints.length > 0) {
          bjCard.CardPoints.forEach((value) => {
            this._bjViewCardCollection.push(
              `${bjCard.FullCardName} with the points of ${value}.`
            );
          });
        } else
          this._bjViewCardCollection.push(
            `${bjCard.FullCardName} with the point of ${bjCard.CardPoints}.`
          );
      });
    } else {
      this.GenerateDeckOfCards();
      this.ViewCardCollectionwithPoints();
    }

    return this._bjViewCardCollection;
  }
}
