class BJCard {
    _cardNameWithoutFamily = "";
    _cardFamily = "";

    /**
     * 
     * @param {*} cardNameWithoutFamily 
     * @param {*} cardFamily 
     */
    constructor(cardNameWithoutFamily, cardFamily) {
        this._cardNameWithoutFamily = cardNameWithoutFamily;
        this._cardFamily = cardFamily;
    }

    get cardNameWithoutFamily() {
        return this._cardNameWithoutFamily;
    }

    get cardName() {
        return `${this._cardNameWithoutFamily.toLowerCase()} of ${this._cardFamily.toLowerCase()}`;
    }

    get cardImageName() {
        return `${this._cardNameWithoutFamily.toLowerCase()}_of_${this._cardFamily.toLowerCase()}`;
    }
}

let bjCard = new BJCard("1", "Spade");
console.log(bjCard.cardNameWithoutFamily);
console.log(bjCard.cardName);
console.log(bjCard.cardImageName);