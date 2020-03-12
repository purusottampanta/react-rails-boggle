import React from "react";
import WordScoreList from "./WordScoreList";
import "./ScoreBox.css";

const ScoreBox = props => {

	const { wordScoreList } = props;

  return (
    <div className="score-box">
      <WordScoreList wordScoreList={wordScoreList} />
    </div>
  );
};

export default ScoreBox;
