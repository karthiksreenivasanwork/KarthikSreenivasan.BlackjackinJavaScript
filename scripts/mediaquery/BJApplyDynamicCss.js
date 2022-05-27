/**
 * Applies the stylesheet class based on the size of the screen.
 * @param {MediaQueryList} mediaQueryRef Media query list object reference.
 */
function setCssFileBasedOnScreenSize(mediaQueryRef) {
  let linkElement = document.querySelector("link");
  //Screen is lesser than a width of 700px, apply the style sheet created for the mobile device.
  if (mediaQueryRef.matches)
    linkElement.setAttribute("href", "../../assets/css/stylesmobile.css");
  else linkElement.setAttribute("href", "./../assets/css/stylesdesktop.css");
}

/**
 * Set the maximum width of the screen to 700px as a parameter for media query.
 * The change event will fire based on the size of the screen.
 * Event will be fired if the screen size is either greater or lesser than 700px.
 */
var mediaQueryListRef = window.matchMedia("(max-width: 700px)");
setCssFileBasedOnScreenSize(mediaQueryListRef);
mediaQueryListRef.addEventListener("change", setCssFileBasedOnScreenSize);