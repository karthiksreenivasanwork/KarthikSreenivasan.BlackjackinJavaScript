/**
 * Represents card value for each playing card structure.
 * Note: A card may have more than one value.
 * Example: Ace is worth 1 or 11, whichever makes a better hand.
 */
const BJCardValue = {
    AceOne: 1,
    AceEleven: 11,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 10,
    Queen: 10,
    Kind: 10
}
//Prevents adding new values or update the playing card structure.
Object.freeze(BJCardValue);