import BJNumbers from "./constants/BJNumbers.const.js";

/**
 * Helps ditermine the winner of the game based on the
 * logic which are part of the game rules.
 * Unique scenarios
 * ----------------
 * If the player as well as the dealer gets 21 points, then the player wins
 * and will not be considered as a draw.
 */
export default class BJResult {
  _playerWin = false;
  _dealerWin = false;

  _winnerDeclared = false;
  _isDraw = false;

  /**
   * Initialize
   * @param {number} dealersTotalScore Total score earned by the dealer
   * @param {number} playersTotalScore Total score earned by the player.
   */
  constructor(dealersTotalScore = 0, playersTotalScore = 0) {
    if (playersTotalScore == BJNumbers.WinningScore) {
      this._playerWin = true;
    } else {
      if (playersTotalScore > BJNumbers.WinningScore) this._dealerWin = true;
      else if (dealersTotalScore > BJNumbers.WinningScore)
        this._playerWin = true;
      else if (dealersTotalScore == playersTotalScore) this._isDraw = true;
      else if (dealersTotalScore > playersTotalScore) this._dealerWin = true;
      else if (playersTotalScore > dealersTotalScore) this._playerWin = true;
    }
    if (!this._isDraw && (this._playerWin || this._dealerWin)) {
      this._winnerDeclared = true;
    }
  }

  /**
   * Return true of the result is the same for both player and the dealer
   * and false otherwise.
   */
  get IsDraw() {
    return this._isDraw;
  }

  /**
   * Returns true if the player has won and false otherwise.
   */
  get HasPlayerWon() {
    return this._playerWin;
  }

  /**
   * Returns true of the dealer has won and false otherwise.
   */
  get HasDealerWon() {
    return this._dealerWin;
  }

  /**
   * Returns true of either the player or dealer has been declared as the winner.
   */
  get HasWinnerDeclared() {
    return this._winnerDeclared;
  }
}
