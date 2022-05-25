/*
  Logical flow of the game
  ------------------------
1. Initialize one card for the dealer and 2 cards for the player.
2. If the player is hitting, then add one additional card for dealer 
   as well as player before declaring the winner.
3. If the player is staying, then add one additonal card for the dealer
   before declaring the winner.
*/

import BJCardGenerator from "./scripts/BJCardGenerator.js";
import BJPlay from "./scripts/BJPlay.js";
import BJResult from "./scripts/BJResult.js";
import BJNumbers from "./scripts/constants/BJNumbers.const.js";

var _bjPlay = {};

var _playerCardOne = {};
var _playerCardTwo = {};
var _playerCardThree = {};

var _dealerCardOne = {};
var _dealerCardTwo = {};

var _playerScore = 0;
var _dealerScore = 0;

const _startButtonElement = document.querySelector("[id=btnStartGame]");
const _restartButtonElement = document.querySelector("[id=btnRestartGame]");
const _hitButtonElement = document.querySelector("[id=btnHit]");
const _stayButtonElement = document.querySelector("[id=btnStay]");

function initalize() {
  //Hide the container element that holds the cards displayed to the player while initializing the game.
  document.getElementById("ctnCardContainer").style.display = "none";
  //Hide the result container while initializing the game
  document.getElementById("ctnResult").style.display = "none";
  //Reset button is disabled when the game is loaded for the first time.
  document.getElementById("btnRestartGame").className = "disabled-button";

  _bjPlay = new BJPlay(new BJCardGenerator());

  startGameButtonEvent();
  restartGameButtonClickEvent();
  hitButtonClickEvent();
  stayButtonClickEvent();

  _hitButtonElement.classList.add("button");
  _hitButtonElement.classList.add("hidden-button");

  _stayButtonElement.classList.add("button");
  _stayButtonElement.classList.add("hidden-button");
}

/**
 * Register the `Start Game` button click event.
 */
function startGameButtonEvent() {
  _startButtonElement.addEventListener("click", () => {
    _playerCardOne = _bjPlay.GetPlayersCards[0];
    _playerCardTwo = _bjPlay.GetPlayersCards[1];

    _playerScore =
      _playerCardOne.geCardPoint(0) +
      _playerCardTwo.geCardPoint(Number(_playerCardOne.CardPoints));

    _dealerCardOne = _bjPlay.GetDealersCards[0];
    _dealerScore = _dealerCardOne.geCardPoint(0);

    setInitialCardImages();
    setScores();

    //If the player gets 21 points, he wins and the game is over.
    if (_playerScore == BJNumbers.WinningScore) {
      document.getElementById("ctnResult").style.display = "block";
      updateResult(_dealerScore, _playerScore);
      resetButtonUIClasses();
    }

    //Reveal the card container once the card binding has been completed.
    document.getElementById("ctnCardContainer").style.display = "block";

    _hitButtonElement.classList.remove("hidden-button");
    _hitButtonElement.classList.add("revealed-button");

    _stayButtonElement.classList.remove("hidden-button");
    _stayButtonElement.classList.add("revealed-button");

    _startButtonElement.classList.add("disabled-button");
    _restartButtonElement.classList.remove("disabled-button");
  });
}

/**
 * Register the `Restart Game` button click event.
 */
function restartGameButtonClickEvent() {
  _restartButtonElement.addEventListener("click", () => {
    resetButtonUIClasses();

    document.getElementById("ctnCardContainer").style.display = "none";
    document.getElementById("ctnResult").style.display = "none";

    if (document.querySelector(".cardImageControlDesktop"))
      document
        .querySelectorAll(".cardImageControlDesktop")
        .forEach((element) => {
          element.src = "";
        });
    else {
      document
        .querySelectorAll(".cardImageControlMobile")
        .forEach((element) => {
          element.src = "";
        });
    }

    document.getElementById("lblResult").innerHTML = "";
    resetVariables();
  });
}

/**
 * Register the `Hit` button click event.
 */
function hitButtonClickEvent() {
  _hitButtonElement.addEventListener("click", () => {
    document.getElementById("ctnResult").style.display = "block";

    _playerCardThree = _bjPlay.addAdditionalCardForPlayer();
    _playerScore += _playerCardThree.geCardPoint(_playerScore);

    _dealerCardTwo = _bjPlay.addAdditionalCardForDealer();
    _dealerScore += _dealerCardTwo.geCardPoint(_dealerScore);

    setScores();
    updateResult(_dealerScore, _playerScore);

    document.getElementById(
      "imgPlayerCard3"
    ).src = `assets/playingcardimages/${_playerCardThree.CardImageName}`;

    document.getElementById(
      "imgDealerCard2"
    ).src = `assets/playingcardimages/${_dealerCardTwo.CardImageName}`;

    _startButtonElement.classList.remove("revealed-button");
    _hitButtonElement.classList.remove("revealed-button");
    _stayButtonElement.classList.remove("revealed-button");

    _startButtonElement.classList.add("disabled-button");
    _hitButtonElement.classList.add("disabled-button");
    _stayButtonElement.classList.add("disabled-button");
  });
}

/**
 * Register the `Stay` button click event.
 */
function stayButtonClickEvent() {
  _stayButtonElement.addEventListener("click", () => {
    document.getElementById("ctnResult").style.display = "block";

    _dealerCardTwo = _bjPlay.addAdditionalCardForDealer();
    _dealerScore += _dealerCardTwo.geCardPoint(_dealerScore);

    setScores();
    updateResult(_dealerScore, _playerScore);

    document.getElementById(
      "imgDealerCard2"
    ).src = `assets/playingcardimages/${_dealerCardTwo.CardImageName}`;

    _startButtonElement.classList.remove("revealed-button");
    _hitButtonElement.classList.remove("revealed-button");
    _stayButtonElement.classList.remove("revealed-button");

    _startButtonElement.classList.add("disabled-button");
    _hitButtonElement.classList.add("disabled-button");
    _stayButtonElement.classList.add("disabled-button");
  });
}

/**
 * Set the initial playing card image for both players.
 */
function setInitialCardImages() {
  document.getElementById(
    "imgPlayerCard1"
  ).src = `assets/playingcardimages/${_playerCardOne.CardImageName}`;

  document.getElementById(
    "imgPlayerCard2"
  ).src = `assets/playingcardimages/${_playerCardTwo.CardImageName}`;

  document.getElementById(
    "imgDealerCard1"
  ).src = `assets/playingcardimages/${_dealerCardOne.CardImageName}`;
}

/**
 * Set the total score for both player and the dealer.
 */
function setScores() {
  document.getElementById(
    "spnPlayerScore"
  ).innerHTML = `Score is '${_playerScore.toString()}'`;

  document.getElementById(
    "spnDealerScore"
  ).innerHTML = `Score is '${_dealerScore.toString()}'`;
}

/**
 * Reset all the global variables in this script file.
 */
function resetVariables() {
  _bjPlay = new BJPlay(new BJCardGenerator());

  _playerCardOne = {};
  _playerCardTwo = {};

  _dealerCardOne = {};
  _dealerCardTwo = {};

  _playerScore = 0;
  _dealerScore = 0;
}

function resetButtonUIClasses() {
  _startButtonElement.className = "button";
  //The restart button is disabled until another game is in progress or completed.
  _restartButtonElement.className = "button disabled-button";
  _hitButtonElement.className = "button hidden-button";
  _stayButtonElement.className = "button hidden-button";
}

/**
 * This function ditermines the winner of the game
 * @param {number} dealerScore Dealer's total score
 * @param {number} playerScore Player's total score
 */
function updateResult(dealerScore, playerScore) {
  let resultRef = new BJResult(dealerScore, playerScore);
  let resultString = "";

  if (resultRef.HasWinnerDeclared) {
    if (resultRef.HasPlayerWon) {
      resultString = "Congratulation! The player has won!";
    } else {
      resultString = "The dealer has won.";
    }
  } else resultString = "It is a Draw!";

  document.getElementById("lblResult").innerHTML = resultString;
}

window.onload = initalize;
