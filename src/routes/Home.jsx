import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [userChoice, setUserChoice] = useState(false);
  const params = {
    amount: "",
    category: "default",
    difficulty: "default",
    type: "default",
  };

  const [quizParams, setQuizParams] = useState({
    amount: String(Math.ceil(Math.random() * 50)),
    category: "",
    difficulty: "",
    type: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setQuizParams((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      quizParams.category === "default" ||
      quizParams.difficulty === "default" ||
      quizParams.type === "default"
    ) {
      alert("All fields are required");
      return;
    } else {
      props.setConfirmedParams(quizParams);
      navigate("/quiz");
    }
  };

  return (
    <div className=" w-full sm:w-4/6 h-full flex flex-col text-center items-center bg-opacity-75 text-stone-800 select-none bg-stone-100 rounded-sm shadow-xl m-auto justify-center ">
      <h1 className="mt-4 select-none text-[22.5px] xl:text-[45px] uppercase font-semibold tracking-wider underline ">
        Welcome to Quizly
      </h1>
      <h2 className=" mt-2 text-[15px] xl:text-[20px] text-stone-600 ">
        {userChoice
          ? "Customise quizly to fit your needs"
          : "Quizly will decide for you"}
      </h2>
      <h3
        className=" cursor-pointer mt-3 "
        onClick={() => {
          setUserChoice((prevState) => !prevState);
          if (userChoice) {
            setQuizParams({
              amount: String(Math.ceil(Math.random() * 50)),
              category: "",
              difficulty: "",
              type: "",
            });
          } else {
            setQuizParams(params);
          }
        }}
      >
        Change My Fate
      </h3>
      <form
        onSubmit={submitHandler}
        className="w-full h-4/6 mt-5 flex flex-col justify-center items-center space-y-5"
      >
        <input
          type="number"
          placeholder="Enter Number of Questions"
          className=" form-input text-[13px] sm:text-base px-5 bg-transparent border-2 rounded-md disabled:border-gray-200 disabled:text-stone-400 placeholder:disabled:placeholder-stone-400 placeholder:placeholder-stone-600 border-gray-600 focus:border-gray-900  focus:ring-0 w-2/3 h-[50px] "
          name="amount"
          value={quizParams.amount}
          disabled={!userChoice}
          onChange={changeHandler}
          min="1"
          max="50"
          required
        />
        <select
          className=" form-select disabled:border-gray-200 disabled:text-stone-400 px-5 bg-transparent text-[13px] sm:text-base border-2 rounded-md border-gray-600 focus:border-gray-900  focus:ring-0 w-2/3 h-[50px] "
          name="category"
          value={quizParams.category}
          disabled={!userChoice}
          onChange={changeHandler}
          required
        >
          <option value="default">Select Category</option>
          <option value="">Mixed Worlds</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
        <select
          className=" form-select disabled:border-gray-200 disabled:text-stone-400 px-5 bg-transparent text-[13px] sm:text-base border-2 rounded-md border-gray-600 focus:border-gray-900  focus:ring-0 w-2/3 h-[50px] "
          name="type"
          value={quizParams.type}
          disabled={!userChoice}
          onChange={changeHandler}
          required
        >
          <option value="default">Select Type</option>
          <option value="">Both Worlds</option>
          <option value="boolean">True/False</option>
          <option value="multiple">Multiple Choice</option>
        </select>
        <select
          className=" form-select disabled:border-gray-200 disabled:text-stone-400 px-5 bg-transparent text-[13px] sm:text-base border-2 rounded-md border-gray-600 focus:border-gray-900  focus:ring-0 w-2/3 h-[50px] "
          name="difficulty"
          value={quizParams.difficulty}
          disabled={!userChoice}
          onChange={changeHandler}
          required
        >
          <option value="default">Select Difficulty</option>
          <option value="">Mixed Feelings</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="submit"
          className=" border-b-2 w-[40%] sm:w-[25%] xl:w-[13%] border-black "
        >
          Continue &gt;
        </button>
      </form>
    </div>
  );
}

export default Home;
