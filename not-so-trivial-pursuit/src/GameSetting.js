import GameDisplay from "./GameDisplay";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

function GameSetting() {
  const [userName, SetUserName] = useState("");
  const [userNameAlready, setUserNameAlready] = useState(false);
  const [questionSettingAlready, setQuestionSettingAlready] = useState(false);

  // Dropdown
  const [userDifficultyChoice, setUserDifficultyChoice] = useState(
    "placeholder"
  );
  const handleUserDifficultyChoice = (e) => {
    setUserDifficultyChoice(e.target.value);
  };
  const [userCategoryChoice, setUserCategoryChoice] = useState("placeholder");
  const handleUserCategoryChoice = (e) => {
    setUserCategoryChoice(e.target.value);
  };
  const [userTypeChoice, setUserTypeChoice] = useState("placeholder");
  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value);
  };

  //User Name Input
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
    if (
      userCategoryChoice === "placeholder" ||
      userTypeChoice === "placeholder" ||
      userDifficultyChoice === "placeholder"
    ) {
      alert(`Please select category, type and difficulty for your questions!`);
    } else {
      setQuestionSettingAlready(true);
    }
  };

  useEffect(() => {
    if (questionSettingAlready) {
      const triviaGameUrl = `https://opentdb.com/api.php?amount=11&category=${userCategoryChoice}&difficulty=${userDifficultyChoice}&type=${userTypeChoice}`;
      axios({
        url: triviaGameUrl,
        method: 'GET',
        responseType: 'json'
      }).then((response) => {
        console.log(response.data);
      });
      console.log(userTypeChoice);
      console.log(userDifficultyChoice);
      console.log(userCategoryChoice);
    }
  }, [
    questionSettingAlready,
    userCategoryChoice,
    userTypeChoice,
    userDifficultyChoice
  ]);

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
      {questionSettingAlready ? null : userNameAlready ? (
        <form onSubmit={formSubmission}>
          {/* Category selection */}
          <select
            id="categorySelection"
            name="categorySelection"
            value={userCategoryChoice}
            onChange={handleUserCategoryChoice}
          >
            <option value="placeholder" disabled>
              Choose your category:
            </option>
            <option value="21">Sport</option>
            <option value="9">General Knowledge</option>
            <option value="17">Science&Nature</option>
            <option value="12">Music</option>
            <option value="14">Television</option>
            <option value="15">Video Games</option>
            <option value="23">History</option>
          </select>
          {/* Type selection */}
          <select
            id="typeSelection"
            name="typeSelection"
            value={userTypeChoice}
            onChange={handleUserTypeChoice}
          >
            <option value="placeholder" disabled>
              Choose your type:
            </option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
          {/* Difficulty selection */}
          <select
            id="difficulty"
            name="difficulty"
            value={userDifficultyChoice}
            onChange={handleUserDifficultyChoice}
          >
            <option value="placeholder" disabled>
              Select difficulty:
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={QuestionSettingSubmission}>
            Questions Generating!
          </button>
        </form>
      ) : null}
      {questionSettingAlready ? (
        <Link to="/gamedisplay/">
          <button>Trivia Game Start!</button>
        </Link>
      ) : null}
      <Routes>
        <Route path="/gamedisplay/" element={<GameDisplay />} />
      </Routes>
    </section>
  );
}

export default GameSetting;
