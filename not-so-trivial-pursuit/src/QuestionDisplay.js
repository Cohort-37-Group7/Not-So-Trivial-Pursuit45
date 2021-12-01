import "./styles.scss";
import { useState, useEffect } from "react";

function QuestionDisplay(props) {
  const {
    currentQuestion,
    currentQuestionOrder,
    setCurrentQuestionOrder,
    answeredCorrect,
    setAnswerCorrect
  } = props;

  const [randomAnswers, setRandomAnswers] = useState([]);

  useEffect(() => {
    console.log("AC2 Current Question");
    console.log(currentQuestion);

    const rightAnswer = currentQuestion.correct_answer;
    const wrongAnswers = currentQuestion.incorrect_answers;
    console.log(rightAnswer);
    if (wrongAnswers !== undefined) {
      const answers = [...wrongAnswers, rightAnswer];

      // const shuffleAnswers = shuffle(answers);
      const shuffleAnswers = answers.sort();
      setRandomAnswers(shuffleAnswers);
    }
  }, [currentQuestion]);

  const booleanTrueClick = () => {
    if (currentQuestion.correct_answer === "True") {
      setAnswerCorrect(answeredCorrect + 1);
    }
  };

  const booleanFalseClick = () => {
    if (currentQuestion.correct_answer === "False") {
      setAnswerCorrect(answeredCorrect + 1);
    }
  };
  //For multiple choice
  const multipleClick = (e) => {
    if (e.target.value === currentQuestion.correct_answer) {
      setAnswerCorrect(answeredCorrect + 1);
    }
  };

  // set to stop at question 11
  const ClickAnAnswerAndGoToNextQuestion = () => {
    setCurrentQuestionOrder(currentQuestionOrder + 1);
  };

  return (
    <>
      {currentQuestion.type === "multiple" ? (
        <div>
          {/*get rid of ugly text*/}
          <div
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></div>
          {randomAnswers.map((answer, index) => (
            <button
              value={answer}
              key={index}
              onClick={(e) => {
                multipleClick(e);
                ClickAnAnswerAndGoToNextQuestion();
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      ) : null}
      {currentQuestion.type === "boolean" ? (
        <div>
          <p>{currentQuestion.question}</p>
          <div>
            <button
              onClick={() => {
                booleanTrueClick();
                ClickAnAnswerAndGoToNextQuestion();
              }}
            >
              True
            </button>
            <button
              onClick={() => {
                booleanFalseClick();
                ClickAnAnswerAndGoToNextQuestion();
              }}
            >
              False
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default QuestionDisplay;