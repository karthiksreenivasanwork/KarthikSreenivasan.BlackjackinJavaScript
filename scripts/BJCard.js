/**
 * Represents a single playing card. 
 */
class BJCard {
    _cardNameWithoutFamily = "";
    _cardFamily = "";
    _cardPointCollection = [];

    /**
     * Initialize
     * @param {*} cardNameWithoutFamily Text visible on the card 
     * @param {*} cardFamily Types defined at BJFamily.const.js
     */
    constructor(cardNameWithoutFamily, cardFamily, cardPointCollection = []) {
        this._cardNameWithoutFamily = cardNameWithoutFamily.toString();
        this._cardFamily = cardFamily.toString();
        this._cardPointCollection = cardPointCollection;
    }

    /**
     * Returns the card text
     */
    get CardNameWithoutFamily() {
        return this._cardNameWithoutFamily;
    }

    /**
     * Return the card name and along with it's family. 
     */
    get CardName() {
        return `${this._cardNameWithoutFamily.toLowerCase()} of ${this._cardFamily.toLowerCase()}`;
    }

    /**
     * Returns the card name as defined in the card image files.
     */
    get CardImageName() {
        return `${this._cardNameWithoutFamily.toLowerCase()}_of_${this._cardFamily.toLowerCase()}`;
    }

    /**
     * Returns the value of each card.
     */
    get CardPoints(){
        return this._cardPointCollection;
    }
}