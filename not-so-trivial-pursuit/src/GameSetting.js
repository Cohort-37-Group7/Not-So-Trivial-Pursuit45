import GameDisplay from "./GameDisplay";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function GameSetting() {
  const [userName, SetUserName] = useState("");
  const [userNameAlready, setUserNameAlready] = useState(false);
  const [questionSettingAlready, setQuestionSettingAlready] = useState(false);

  const UserNameInput = (event) => {
    SetUserName(event.target.value);
  };

  const formSubmission = (event) => {
    event.preventDefault();
  };

  const UserNameSubmission = () => {
    if (userName === "") {
      alert(`Please enter your user name!`);
    } else {
      setUserNameAlready(true);
      console.log(userName);
    }
  };

  const QuestionSettingSubmission = () => {
    setQuestionSettingAlready(true);
  };

  useEffect(() => {
    if (questionSettingAlready) {
      const triviaGameUrl = `https://opentdb.com/api.php?amount=11`;

      axios({
        url: triviaGameUrl
      }).then((response) => {
        console.log(response.data);
      });
    }
  }, [questionSettingAlready]);

  return (
    <section>
      {!userNameAlready ? (
        <form onSubmit={formSubmission}>
          <label htmlFor="userNameInput">
            Please enter your user name here:
          </label>
          <input id="userNameInput" type="text" onChange={UserNameInput} />
          <button onClick={UserNameSubmission}>Submit!</button>
        </form>
      ) : null}
      {userNameAlready ? (
        <form onSubmit={formSubmission}>
          <button onClick={QuestionSettingSubmission}>
            Questions Generating!
          </button>
        </form>
      ) : null}
      <Link to="/gamedisplay/">
        <button>Trivia Game Start!</button>
      </Link>
      <Routes>
        <Route path="/gamedisplay/" element={<GameDisplay />} />
      </Routes>
    </section>
  );
}

export default GameSetting;
