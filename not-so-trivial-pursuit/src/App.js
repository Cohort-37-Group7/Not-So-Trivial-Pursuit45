import "./styles.scss";
import GameSetting from "./GameSetting";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameDisplay from "./GameDisplay";
import GameResult from './GameResult';

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [userName, SetUserName] = useState(""); //Pass to GameSetting
  const [questionSettingAlready, setQuestionSettingAlready] = useState(false); //Pass to GameSetting
  const [gameDisplayStart, setGameDisplayStart] = useState(false);
  const [userQuestions, setUserQuestions] = useState(""); // To store the users questions from Firebase (pass to GameSetting)
  const [userCorrectNumber, setUserCorrectNumber] = useState(0); // To store the users correct number from Firebase (pass to GameSetting)
  const [userAnsweredNumber, setUserAnsweredNumber] = useState(0); // To store the users answered questions number from Firebase (pass to GameSetting)
  const [continueGame, setContinueGame] = useState(false); //Pass to GameSetting
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(0);
  const [answeredCorrect, setAnswerCorrect] = useState(0);

  const GameStartClick = () => {
    setGameStart(true);
  };

  const GameDisplayStartClick = () => {
    setGameDisplayStart(true);
  };
  return (
    <Router>
      <section className="App">
        <nav>
          <Link  to ="/">
            <button>Home</button>
          </Link>
          <Link to="/gameresult/*">
            <button>Game Result</button>
          </Link>
        </nav>
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
              questionSettingAlready={questionSettingAlready}
              setQuestionSettingAlready={setQuestionSettingAlready}
              userQuestions={userQuestions}
              setUserQuestions={setUserQuestions}
              setUserCorrectNumber={setUserCorrectNumber}
              setUserAnsweredNumber={setUserAnsweredNumber}
              continueGame={continueGame}
              setContinueGame={setContinueGame}
            />
          }
        />
        <Route
          path="/gamedisplay/*"
          element={
            <GameDisplay
              userQuestions={userQuestions}
              userName={userName}
              userCorrectNumber={userCorrectNumber}
              userAnsweredNumber={userAnsweredNumber}
              continueGame={continueGame}
              currentQuestionOrder={currentQuestionOrder}
              setCurrentQuestionOrder={setCurrentQuestionOrder}
              answeredCorrect={answeredCorrect}
              setAnswerCorrect={setAnswerCorrect}
            />
          }
        />
        <Route path="/gameresult/*" element={
        <GameResult 
        currentQuestionOrder={currentQuestionOrder}/>} 
        answeredCorrect={answeredCorrect}/>

      </Routes>
    </Router>
  );
}

export default App;