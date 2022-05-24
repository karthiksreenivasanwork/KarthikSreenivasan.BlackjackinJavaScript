import BJNumbers from "../constants/BJNumbers.const.js";
/**
 * Applies the stylesheet class based on the size of the screen.
 * @param {MediaQueryList} mediaQueryRef Media query list object reference.
 */
function dynamicCardSize(mediaQueryRef) {
  if (mediaQueryRef.matches) {
    //Lesser than 700px
    for (let i = 1; i <= BJNumbers.TotalCardforDealer; i++)
      document.getElementById(`imgDealerCard${i.toString()}`).className =
        "cardImageControlMobile";
    for (let j = 1; j <= BJNumbers.TotalCardforPlayer; j++)
      document.getElementById(`imgPlayerCard${j.toString()}`).className =
        "cardImageControlMobile";
  } else {
    //Greater than 700px
    for (let i = 1; i <= BJNumbers.TotalCardforDealer; i++)
      document.getElementById(`imgDealerCard${i.toString()}`).className =
        "cardImageControlDesktop";
    for (let j = 1; j <= BJNumbers.TotalCardforPlayer; j++)
      document.getElementById(`imgPlayerCard${j.toString()}`).className =
        "cardImageControlDesktop";
  }
}

/**
 * Set the maximum width of the screen to 700px as a parameter for media query.
 * The change event will fire based on the size of the screen.
 * Event will be fired if the screen size is either greater or lesser than 700px.
 */
var mediaQueryListRef = window.matchMedia("(max-width: 700px)");
dynamicCardSize(mediaQueryListRef);
mediaQueryListRef.addEventListener("change", dynamicCardSize);
