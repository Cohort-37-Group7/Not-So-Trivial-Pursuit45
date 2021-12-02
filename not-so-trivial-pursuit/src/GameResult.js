import { useState, useEffect } from "react";
import "./styles.scss";

function GameResult(props) {
  const {
    currentQuestionOrder,
    answeredCorrect,
    userName,
    gameResultShows,
    setGameResultShows
  } = props;
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    if (currentQuestionOrder > 0) {
      setCurrentScore(answeredCorrect);
    } else {
      setCurrentScore(0);
    }
  }, [answeredCorrect, currentQuestionOrder]);

  useEffect(() => {
    const rightAnswer = answeredCorrect;
    const wrongAnswers = currentQuestionOrder - answeredCorrect;
    if (rightAnswer > wrongAnswers) {
      setGameResultShows(1);
    } else if (wrongAnswers > rightAnswer) {
      setGameResultShows(2);
    } else if (wrongAnswers === rightAnswer && currentQuestionOrder !== 0) {
      setGameResultShows(3);
    }
    console.log(rightAnswer);
    console.log(wrongAnswers);
  }, [answeredCorrect, currentQuestionOrder, setGameResultShows]);
  return (
    <div className="resultSection">
      <p className="resultUserName">{userName}</p>
      {gameResultShows === 0 ? (
        <>
          <p>You are ready to go!</p>
        </>
      ) : gameResultShows === 1 ? (
        <>
          <p>You win!</p>
          <p>
            Your score is: <span>{currentScore}</span>
          </p>
        </>
      ) : gameResultShows === 2 ? (
        <>
          <p>You lose!</p>
          <p>Your score is: {currentScore}%</p>
        </>
      ) : gameResultShows === 3 ? (
        <>
          <p>You tie!</p>
        </>
      ) : (
        <>
          <p>You are ready to go!</p>
        </>
      )}
    </div>
  );
}

export default GameResult;
