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

let _playerCardCollection = [];
let _dealerCardCollection = [];

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
    for (let i = 0; i < _bjPlay.GetPlayersCards.length; i++)
      _playerCardCollection.push(_bjPlay.GetPlayersCards[i]);

    _playerScore =
      _playerCardCollection[0].geCardPoint(0) +
      _playerCardCollection[1].geCardPoint(
        Number(_playerCardCollection[0].CardPoints)
      );

    _dealerCardCollection.push(_bjPlay.GetDealersCards[0]);
    _dealerScore = _dealerCardCollection[0].geCardPoint(0);

    createAndAttachImageElementsToContainer(
      "ctnPlayerCardImages",
      _playerCardImageIDNamePrefix,
      _playerCardCollection
    );
    createAndAttachImageElementsToContainer(
      "ctnDealerCardImages",
      _dealerCardImageIDNamePrefix,
      _dealerCardCollection
    );

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
    _divCardResultLabelElement.innerHTML = "";

    removeAllCardImages();
    resetButtonUI();
    resetVariables();
  });
};

/**
 * Register the `Hit` button click event.
 */
const hitButtonClickEvent = () => {
  _hitButtonElement.addEventListener("click", () => {
    _divCardResultContainerElement.style.display = "block";

    _playerCardCollection.push(_bjPlay.addAdditionalCardForPlayer());
    _playerScore += _playerCardCollection[2].geCardPoint(_playerScore);

    _dealerCardCollection.push(_bjPlay.addAdditionalCardForDealer());
    _dealerScore += _dealerCardCollection[1].geCardPoint(_dealerScore);

    removeAllCardImages();
    createAndAttachImageElementsToContainer(
      "ctnPlayerCardImages",
      _playerCardImageIDNamePrefix,
      _playerCardCollection
    );
    createAndAttachImageElementsToContainer(
      "ctnDealerCardImages",
      _dealerCardImageIDNamePrefix,
      _dealerCardCollection
    );

    setScores();
    updateResult(_dealerScore, _playerScore);
    gameoverButtonUI();
  });
};

/**
 * Register the `Stay` button click event.
 */
const stayButtonClickEvent = () => {
  _stayButtonElement.addEventListener("click", () => {
    _divCardResultContainerElement.style.display = "block";

    _dealerCardCollection.push(_bjPlay.addAdditionalCardForDealer());
    _dealerScore += _dealerCardCollection[1].geCardPoint(_dealerScore);

    removeImagesByParentContainerID("ctnDealerCardImages");
    createAndAttachImageElementsToContainer(
      "ctnDealerCardImages",
      _dealerCardImageIDNamePrefix,
      _dealerCardCollection
    );

    setScores();
    updateResult(_dealerScore, _playerScore);

    gameoverButtonUI();
  });
};
//#endregion

//#region Function that handle the image elements.

/**
 * Creates image elements and attaches them to the parent element based on the BJCard array data.
 * @param {string} parentContainerID Parent container that holds the image elements.
 * @param {string} imagePrefix Image ID prefix value
 * @param {BJCard[]} cardCollection BJCard array reference
 */
const createAndAttachImageElementsToContainer = (
  parentContainerID,
  imagePrefix,
  cardCollection
) => {
  let cardContainer = document.querySelector(`[id=${parentContainerID}]`);
  createImageElementsWithImages(imagePrefix, cardCollection).forEach(
    (imageElement) => {
      cardContainer.append(imageElement);
    }
  );
};

/**
 * Creates image elements dynamically based on the BJCard array data.
 * @param {string} imagePrefix Image ID prefix value
 * @param {BJCard[]} cardCollection BJCard array reference
 * @returns Return a tranformed image element collection for each card collection
 */
const createImageElementsWithImages = (imagePrefix, cardCollection) => {
  return cardCollection.map((card) => {
    let imageElement = createImageElement(imagePrefix);
    imageElement.setAttribute(
      "src",
      `assets/playingcardimages/${card.CardImageName}`
    );
    return imageElement;
  });
};

/**
 * Creates an image element
 * @param {string} imagePrefix Image ID prefix value
 * @returns
 */
const createImageElement = (imgElementId = "") => {
  let imgCardElement = document.createElement("img");
  imgCardElement.classList.add("cardImageControl");
  imgCardElement.setAttribute("id", imgElementId);
  return imgCardElement;
};

/**
 * Remove all the card images from the user interface.
 */
const removeAllCardImages = () => {
  if (document.querySelector(".cardImageControl")) {
    document.querySelectorAll(".cardImageControl").forEach((element) => {
      element.remove();
    });
  }
};

/**
 * Removes the images inside this parent container.
 * @param {string} parentContainerID Parent container that holds the image elements.
 */
const removeImagesByParentContainerID = (parentContainerID) => {
  let parentElement = document.querySelector(`[id=${parentContainerID}`);
  if (parentElement) {
    parentElement.childNodes.forEach((element) => {
      element.remove();
    });
  }
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

  _playerCardCollection = [];
  _dealerCardCollection = [];

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
