import "./App.css";
import GameSetting from "./GameSetting";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameDisplay from "./GameDisplay";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [userName, SetUserName] = useState(""); //Pass to GameSetting
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState(""); //Pass to GameSetting
  const [questionSettingAlready, setQuestionSettingAlready] = useState(false); //Pass to GameSetting
  const [gameDisplayStart, setGameDisplayStart] = useState(false);
  const [userQuestions, setUserQuestions] = useState(""); // To store the users questions from Firebase (pass to GameSetting)
  const [userCorrectNumber, setUserCorrectNumber] = useState(""); // To store the users correct number from Firebase (pass to GameSetting)
  const [userAnsweredNumber, setUserAnsweredNumber] = useState(""); // To store the users answered questions number from Firebase (pass to GameSetting)

  const GameStartClick = () => {
    setGameStart(true);
  };

  const GameDisplayStartClick = () => {
    setGameDisplayStart(true);
  };
  return (
    <Router>
      <section className="App">
        {!gameStart ? (
          <Link to="/gamesetting/*">
            <button onClick={GameStartClick}>Let's Start The Game!</button>
          </Link>
        ) : null}
        {gameDisplayStart ? null : questionSettingAlready ? (
          <Link to="/gamedisplay/*">
            <button onClick={GameDisplayStartClick}>Trivia Game Start!</button>
          </Link>
        ) : null}
      </section>

      <Routes>
        <Route
          path="/gamesetting/*"
          element={
            <GameSetting
              userName={userName}
              SetUserName={SetUserName}
              questionsAndAnswers={questionsAndAnswers}
              setQuestionsAndAnswers={setQuestionsAndAnswers}
              questionSettingAlready={questionSettingAlready}
              setQuestionSettingAlready={setQuestionSettingAlready}
              userQuestions={userQuestions}
              setUserQuestions={setUserQuestions}
              setUserCorrectNumber={setUserCorrectNumber}
              setUserAnsweredNumber={setUserAnsweredNumber}
            />
          }
        />
        <Route path="/gamedisplay/*" element={<GameDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;