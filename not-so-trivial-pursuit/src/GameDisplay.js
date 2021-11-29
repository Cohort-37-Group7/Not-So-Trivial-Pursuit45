import QuestionDisplay from "./QuestionDisplay";
import firebase from "./firebase";
import { useState, useEffect } from "react";

function GameDisplay() {
  const [currentQuestion, SetCurrentQuestion] = useState("");
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(0);
  const [nextQuestionClick, setNextQuestionClick] = useState(0);
  const [answeredCorrect, setAnswerCorrect] = useState(0);

  

  // useEffect(() => {
  //   if (questionsAndAnswers !== "") {
  //     console.log(questionsAndAnswers[0]);
  //   }
  // }, [questionsAndAnswers]);
  return (
    <>
      <QuestionDisplay
        answeredCorrect={answeredCorrect}
        setAnswerCorrect={setAnswerCorrect}
        nextQuestionClick={nextQuestionClick}
        setNextQuestionClick={setNextQuestionClick}
        currentQuestion={currentQuestion}/>
    </>
  );
}

export default GameDisplay;