import { useState, useEffect } from "react";
import firebase from "./firebase";
import axios from "axios";

function GameSetting(props) {
  const {
    userName,
    SetUserName,
    questionsAndAnswers,
    setQuestionsAndAnswers,
    questionSettingAlready,
    setQuestionSettingAlready,
    userQuestions,
    setUserQuestions,
    setUserCorrectNumber,
    setUserAnsweredNumber
  } = props;

  const [userNameAlready, setUserNameAlready] = useState(false);
  const [userDifficultyChoice, setUserDifficultyChoice] = useState(
    "placeholder"
  );
  const [userCategoryChoice, setUserCategoryChoice] = useState("placeholder");
  const [userTypeChoice, setUserTypeChoice] = useState("placeholder");
  const [existingUser, setExistingUser] = useState(false);
  const [continueGame, setContinueGame] = useState(false);

  const userNameUpload = (userName, questionArray) => {
    const dbRef = firebase.database().ref(userName + `/questions/`);
    dbRef.set({
      questions: questionArray
    });
  };

  const ContinueGameClick = () => {
    setContinueGame(true);
  };

  const ExistingUserClick = () => {
    setExistingUser(false);
  };

  useEffect(() => {
    if (questionsAndAnswers !== "") {
      userNameUpload(userName, questionsAndAnswers);
    }
  }, [userName, questionsAndAnswers]);

  // Dropdown

  const handleUserDifficultyChoice = (e) => {
    setUserDifficultyChoice(e.target.value);
  };

  const handleUserCategoryChoice = (e) => {
    setUserCategoryChoice(e.target.value);
  };

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
  //Check existing user name or create a new one
  useEffect(() => {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (response) => {
      const data = response.val();
      console.log(data);
      const dataConvertToArray = Object.keys(data);
      if (String(dataConvertToArray).indexOf(userName) !== -1) {
        setExistingUser(true);
        if (continueGame) {
        }
        // setUserPokemonNumber(Object.keys(data[userName]).length);
        // const userPokemons = Object.values(data[userName]);
        // setUserPokemonTeam(userPokemons);
      } else {
        firebase.database().ref(userName).set("");
      }
    });
  }, [userName]);

  useEffect(() => {
    if (questionSettingAlready) {
      const triviaGameUrl = `https://opentdb.com/api.php?amount=11&category=${userCategoryChoice}&difficulty=${userDifficultyChoice}&type=${userTypeChoice}`;
      axios({
        url: triviaGameUrl,
        method: "GET",
        responseType: "json"
      }).then((response) => {
        if (questionsAndAnswers === "") {
          setQuestionsAndAnswers(response.data.results);
        }
      });
      console.log(questionsAndAnswers);
      console.log(userTypeChoice);
      console.log(userDifficultyChoice);
      console.log(userCategoryChoice);
    }
  }, [
    questionSettingAlready,
    questionsAndAnswers,
    userTypeChoice,
    userDifficultyChoice,
    userCategoryChoice,
    setQuestionsAndAnswers
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
      {userNameAlready && existingUser ? (
        <div>
          <button onClick={ContinueGameClick}>Continue your game?</button>
          <button onClick={ExistingUserClick}>Start a new game!</button>
        </div>
      ) : null}
      {questionSettingAlready ? null : !existingUser ? (
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
    </section>
  );
}

export default GameSetting;
