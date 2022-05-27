/**
 * Model that represents the score to ditermine the winner.
 */
export default class BJScore {
  _totalScoreWithoutAce = 0;
  _acePoints = 0;
  _totalScore = 0;

  /**
   *
   * @param {number} totalScoreWithoutAce
   * @param {number} acePoints
   */
  constructor(totalScoreWithoutAce, acePoints) {
    this._totalScoreWithoutAce = totalScoreWithoutAce;
    this._acePoints = acePoints;
    this._totalScore = totalScoreWithoutAce + acePoints;
  }

  /**
   * Return the score without the ACE value.
   */
  get TotalScoreWithoutAce() {
    return this._totalScoreWithoutAce;
  }

  /**
   * Return the ACE value
   */
  get AcePoints() {
    return this._acePoints;
  }

  /**
   * Return the score with the ACE value.
   */
  get TotalScore() {
    return this._totalScore;
  }
}
