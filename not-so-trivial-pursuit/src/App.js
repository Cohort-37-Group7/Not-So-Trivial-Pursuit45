import "./App.css";
import GameSetting from "./GameSetting";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [gameStart, setGameStart] = useState(false);

  const GameStartClick = () => {
    setGameStart(true);
  };
  return (
    <Router>
      <section className="App">
        {!gameStart ? (
          <Link to="/gamesetting/*">
            <button onClick={GameStartClick}>Let's Start The Game!</button>
          </Link>
        ) : null}
      </section>

      <Routes>
        <Route path="/gamesetting/*" element={<GameSetting />} />
      </Routes>
    </Router>
  );
}

export default App;
