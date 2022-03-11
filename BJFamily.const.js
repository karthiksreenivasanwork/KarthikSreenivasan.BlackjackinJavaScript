/**
 * Defines the card types of the playing cards.
 */
const BJFamily = {
    Clubs: 1,
    Diamonds: 2,
    Hearts: 3,
    Spades: 4
}
//Prevents adding new Blackjack family types.
Object.freeze(BJFamily);
/**
 * Printing each key of the constant type BJFamily
 * Output for the syntax: Object.keys(BJFamily)[0] is Clubs
 **/ 
console.log(Object.keys(BJFamily)[0]);