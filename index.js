/*
  Logical flow of the game
  ------------------------
1. Initialize one card for the dealer and 2 cards for the player.
2. If the player is hitting, then add one additional card for dealer
   as well as player before declaring the winner.
3. If the player is staying, then add one additonal card for the dealer
   before declaring the winner.
*/

import BJCardGenerator from "./assets/js/BJCardGenerator.js";
import BJPlay from "./assets/js/BJPlay.js";
import BJResult from "./assets/js/BJResult.js";
import BJNumbers from "./assets/js/constants/BJNumbers.const.js";

let _bjPlay = {};

let _playerCardOne = {};
let _playerCardTwo = {};
let _playerCardThree = {};

let _dealerCardOne = {};
let _dealerCardTwo = {};

let _playerScore = 0;
let _dealerScore = 0;

//Button element references
const _startButtonElement = document.querySelector("[id=btnStartGame]");
const _restartButtonElement = document.querySelector("[id=btnRestartGame]");
const _hitButtonElement = document.querySelector("[id=btnHit]");
const _stayButtonElement = document.querySelector("[id=btnStay]");

//Span elements that display the score
const _spanPlayerScoreElement = document.querySelector("[id=spnPlayerScore]");
const _spanDealerScoreElement = document.querySelector("[id=spnDealerScore]");

//Div element that is the card container
const _divCardContainerElement = document.querySelector(
  "[id=ctnCardContainer]"
);

//Div element that holds the result
const _divCardResultContainerElement = document.querySelector("[id=ctnResult]");
const _divCardResultLabelElement = document.querySelector("[id=lblResult]"); //Result label

const _playerCardImageIDNamePrefix = "imgPlayerCard";
const _dealerCardImageIDNamePrefix = "imgDealerCard";

const initalizeGame = () => {
  //Hide the container element that holds the cards displayed to the player while initializing the game.
  _divCardContainerElement.style.display = "none";
  //Hide the result container while initializing the game
  _divCardResultContainerElement.style.display = "none";

  _bjPlay = new BJPlay(new BJCardGenerator());

  startGameButtonEvent();
  restartGameButtonClickEvent();
  hitButtonClickEvent();
  stayButtonClickEvent();

  _hitButtonElement.className = "button enabled-button hidden-button";
  _stayButtonElement.className = "button enabled-button hidden-button";
};

//#region Button events
/**
 * Register the `Start Game` button click event.
 */
const startGameButtonEvent = () => {
  _startButtonElement.addEventListener("click", () => {
    _playerCardOne = _bjPlay.GetPlayersCards[0];
    _playerCardTwo = _bjPlay.GetPlayersCards[1];

    _playerScore =
      _playerCardOne.geCardPoint(0) +
      _playerCardTwo.geCardPoint(Number(_playerCardOne.CardPoints));

    _dealerCardOne = _bjPlay.GetDealersCards[0];
    _dealerScore = _dealerCardOne.geCardPoint(0);

    initializePlayerCardImageElements();
    initializDealerCardImageElements();

    setInitialCardImages();
    setScores();

    //Reveal the card container once the card binding has been completed.
    _divCardContainerElement.style.display = "block";
    _hitButtonElement.classList.replace("hidden-button", "revealed-button");
    _stayButtonElement.classList.replace("hidden-button", "revealed-button");

    _startButtonElement.classList.replace("enabled-button", "disabled-button");
    _restartButtonElement.classList.replace(
      "disabled-button",
      "enabled-button"
    );

    //If the player gets 21 points, he wins and the game is over.
    if (_playerScore == BJNumbers.WinningScore) {
      _divCardResultContainerElement.style.display = "block";
      updateResult(_dealerScore, _playerScore);
      gameoverButtonUI();
    }
  });
};

/**
 * Register the `Restart Game` button click event.
 */
const restartGameButtonClickEvent = () => {
  _restartButtonElement.addEventListener("click", () => {
    _divCardContainerElement.style.display = "none";
    _divCardResultContainerElement.style.display = "none";

    if (document.querySelector(".cardImageControl")) {
      document.querySelectorAll(".cardImageControl").forEach((element) => {
        element.remove();
      });
    }

    _divCardResultLabelElement.innerHTML = "";

    resetButtonUI();
    resetVariables();
  });
};

/**
 * Register the `Hit` button click event.
 */
const hitButtonClickEvent = () => {
  _hitButtonElement.addEventListener("click", () => {
    addDeaderCardImageElement();
    addPlayerCardImageElement();

    let imgPlayerCardThreeElement = document.querySelector(
      `[id=${_playerCardImageIDNamePrefix}3]`
    );
    let imgDealerCardTwoElement = document.querySelector(
      `[id=${_dealerCardImageIDNamePrefix}2]`
    );

    _divCardResultContainerElement.style.display = "block";

    _playerCardThree = _bjPlay.addAdditionalCardForPlayer();
    _playerScore += _playerCardThree.geCardPoint(_playerScore);

    _dealerCardTwo = _bjPlay.addAdditionalCardForDealer();
    _dealerScore += _dealerCardTwo.geCardPoint(_dealerScore);

    setScores();
    updateResult(_dealerScore, _playerScore);

    imgPlayerCardThreeElement.setAttribute(
      "src",
      `assets/playingcardimages/${_playerCardThree.CardImageName}`
    );
    imgDealerCardTwoElement.setAttribute(
      "src",
      `assets/playingcardimages/${_dealerCardTwo.CardImageName}`
    );

    gameoverButtonUI();
  });
};

/**
 * Register the `Stay` button click event.
 */
const stayButtonClickEvent = () => {
  _stayButtonElement.addEventListener("click", () => {
    addDeaderCardImageElement();
    let imgDealerCardTwoElement = document.querySelector(
      `[id=${_dealerCardImageIDNamePrefix}2]`
    );

    _divCardResultContainerElement.style.display = "block";

    _dealerCardTwo = _bjPlay.addAdditionalCardForDealer();
    _dealerScore += _dealerCardTwo.geCardPoint(_dealerScore);

    setScores();
    updateResult(_dealerScore, _playerScore);

    imgDealerCardTwoElement.setAttribute(
      "src",
      `assets/playingcardimages/${_dealerCardTwo.CardImageName}`
    );

    gameoverButtonUI();
  });
};
//#endregion

//#region Function that handle the image elements.

/**
 * Set the initial playing card image for both players.
 */
const setInitialCardImages = () => {
  let imgPlayerCardOneElement = document.querySelector(
    `[id=${_playerCardImageIDNamePrefix}1]`
  );
  let imgPlayerCardTwoElement = document.querySelector(
    `[id=${_playerCardImageIDNamePrefix}2]`
  );
  let imgDealerCardOneElement = document.querySelector(
    `[id=${_dealerCardImageIDNamePrefix}1]`
  );

  imgPlayerCardOneElement.setAttribute(
    "src",
    `assets/playingcardimages/${_playerCardOne.CardImageName}`
  );
  imgPlayerCardTwoElement.setAttribute(
    "src",
    `assets/playingcardimages/${_playerCardTwo.CardImageName}`
  );
  imgDealerCardOneElement.setAttribute(
    "src",
    `assets/playingcardimages/${_dealerCardOne.CardImageName}`
  );
};

const addDeaderCardImageElement = () => {
  let dealerCardContainer = document.querySelector("[id=ctnDealerCardImages]");
  let childElementCount = dealerCardContainer.childNodes.length;
  let dealerImageID = `${_dealerCardImageIDNamePrefix}${childElementCount + 1}`;
  addImageElement(dealerCardContainer, dealerImageID);
};

const addPlayerCardImageElement = () => {
  let playerCardContainer = document.querySelector("[id=ctnPlayerCardImages]");
  let childElementCount = playerCardContainer.childNodes.length;
  let playerImageID = `${_playerCardImageIDNamePrefix}${childElementCount + 1}`;
  addImageElement(playerCardContainer, playerImageID);
};

const initializDealerCardImageElements = (cardCount = 1) => {
  let dealerCardContainer = document.querySelector("[id=ctnDealerCardImages]");
  for (let i = 1; i <= cardCount; i++) {
    addImageElement(dealerCardContainer, `${_dealerCardImageIDNamePrefix}${i}`);
  }
};

const initializePlayerCardImageElements = (cardCount = 2) => {
  let playerCardContainer = document.querySelector("[id=ctnPlayerCardImages]");
  for (let i = 1; i <= cardCount; i++) {
    addImageElement(playerCardContainer, `${_playerCardImageIDNamePrefix}${i}`);
  }
};

const addImageElement = (parentContainer, imgElementId) => {
  parentContainer.append(createImageElement(imgElementId));
};

const createImageElement = (imgElementId = "") => {
  let imgCardElement = document.createElement("img");
  imgCardElement.classList.add("cardImageControl");
  imgCardElement.setAttribute("id", imgElementId);
  return imgCardElement;
};

//#endregion

//#region Other functions

/**
 * Set the total score for both player and the dealer.
 */
const setScores = () => {
  _spanPlayerScoreElement.innerHTML = `Score is: ${_playerScore.toString()}`;
  _spanDealerScoreElement.innerHTML = `Score is: ${_dealerScore.toString()}`;
};

/**
 * Reset all the global variables in this script file.
 */
const resetVariables = () => {
  _bjPlay = new BJPlay(new BJCardGenerator());

  _playerCardOne = {};
  _playerCardTwo = {};

  _dealerCardOne = {};
  _dealerCardTwo = {};

  _playerScore = 0;
  _dealerScore = 0;
};

/**
 * Defines the button CSS class when the game has been restarted.
 */
const resetButtonUI = () => {
  _startButtonElement.className = "button enabled-button";
  //The restart button is disabled until another game is in progress or completed.
  _restartButtonElement.className = "button disabled-button";
  _hitButtonElement.className = "button enabled-button hidden-button";
  _stayButtonElement.className = "button enabled-button hidden-button";
};

/**
 * Defines the button CSS class when the game is over.
 */
const gameoverButtonUI = () => {
  _startButtonElement.classList.replace("revealed-button", "disabled-button");
  _hitButtonElement.classList.replace("revealed-button", "disabled-button");
  _stayButtonElement.classList.replace("revealed-button", "disabled-button");
};

/**
 * This function ditermines the winner of the game
 * @param {number} dealerScore Dealer's total score
 * @param {number} playerScore Player's total score
 */
const updateResult = (dealerScore = 0, playerScore = 0) => {
  let resultRef = new BJResult(dealerScore, playerScore);
  let resultString = "";

  if (resultRef.HasWinnerDeclared) {
    if (resultRef.HasPlayerWon) {
      resultString = "Congratulation! The player has won!";
    } else {
      resultString = "The dealer has won.";
    }
  } else resultString = "It is a Draw!";

  _divCardResultLabelElement.innerHTML = resultString;
};

//#endregion
window.onload = initalizeGame;
