import "./styles.scss";
import QuestionDisplay from "./QuestionDisplay";
import { useState, useEffect } from "react";
import firebase from "./firebase";

function GameDisplay(props) {
  const {
    userName,
    userQuestions,
    userCorrectNumber,
    userAnsweredNumber,
    continueGame,
    currentQuestionOrder,
    setCurrentQuestionOrder,
    answeredCorrect,
    setAnswerCorrect
  } = props;
  const [currentQuestion, SetCurrentQuestion] = useState("");

  useEffect(() => {
    if (continueGame) {
      if (userAnsweredNumber !== 0) {
        setAnswerCorrect(userCorrectNumber);
        setCurrentQuestionOrder(userAnsweredNumber);
      }
    }
  }, [continueGame, userCorrectNumber, userAnsweredNumber, setAnswerCorrect, setCurrentQuestionOrder]);

  useEffect(() => {
    SetCurrentQuestion(userQuestions[currentQuestionOrder]);
    console.log(currentQuestion);
  }, [
    userQuestions,
    currentQuestion,
    SetCurrentQuestion,
    currentQuestionOrder
  ]);
  //GameDisplay.js
  useEffect(() => {
    const dbRef = firebase.database().ref(userName);
    dbRef.set({
      correctNumber: answeredCorrect,
      answeredNumber: currentQuestionOrder,
      questions: userQuestions
    });
  }, [userName, userQuestions, answeredCorrect, currentQuestionOrder]);

  return (
    <div className="gameDisplay">
    <>
      <h1>DisplayPage</h1>
      {
        <QuestionDisplay
          currentQuestion={currentQuestion}
          answeredCorrect={answeredCorrect}
          setAnswerCorrect={setAnswerCorrect}
          currentQuestionOrder={currentQuestionOrder}
          setCurrentQuestionOrder={setCurrentQuestionOrder}
        />
      }
    </>
    </div>
  );
}

export default GameDisplay;
