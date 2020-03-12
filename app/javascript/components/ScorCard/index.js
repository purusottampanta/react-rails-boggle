import React from "react";
import "./ScorCard.css";

const ScorCard = props => {

	const { wordScoreList, wrongCount, currentUser } = props;

    let userName = currentUser;

    // let resultMsg = GenerateMessageByTrials(trials,userName);

    let totalScore = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;

    if (wordScoreList) {
      totalScore = Object.values(wordScoreList).reduce((totalScore, next) => {
        return totalScore + next;
      }, 0);

      totalCorrect = Object.keys(wordScoreList).length;
      totalIncorrect = wrongCount;
    }

  return (
    <div className="game-scores-chart">
        <table className="result-table">
          <tbody>
            <tr>
              <th>Player Name:</th>
              <td>{userName}</td>
            </tr>
            <tr>
              <th>Total Points:</th>
              <td>{totalScore}</td>
            </tr>
            <tr>
              <th>Right:</th>
              <td>{totalCorrect}</td>
            </tr>
            <tr>
              <th>Wrong:</th>
              <td>{totalIncorrect}</td>
            </tr>
          </tbody>
        </table>
    </div>
  );
};

export default ScorCard;
