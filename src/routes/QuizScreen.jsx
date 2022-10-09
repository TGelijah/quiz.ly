import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Question from "../components/Question";
import loading from "../assets/loading.gif";

function QuizScreen(props) {
  const navigate = useNavigate();
  // useEffect(() => {
  // 	if (props.confirmedParams === null) {
  // 		navigate("/");
  // 	}
  // }, []);

  let getURL = (amount, category, difficulty, type) => {
    if (amount && category && difficulty && type) {
      return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    }
    if (amount && category && difficulty && !type) {
      return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    }
    if (amount && category && !difficulty && type) {
      return `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`;
    }
    if (amount && !category && difficulty && type) {
      return `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    }
    if (amount && category && !difficulty && !type) {
      return `https://opentdb.com/api.php?amount=${amount}&category=${category}`;
    }
    if (amount && !category && difficulty && !type) {
      return `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
    }
    if (amount && !category && !difficulty && type) {
      return `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
    }
    if (amount && !category && !difficulty && !type) {
      return `https://opentdb.com/api.php?amount=${amount}`;
    }
  };

  let intervalId = useRef("");
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [timer, setTimer] = useState(0);
  const [countRightAnswers, setCountRightAnswers] = useState(0);
  const [loader, setLoader] = useState(false);

  function increaseTimer() {
    setTimer((prevTime) => ++prevTime);
  }
  function descendingSort(item1, item2) {
    if (item1 > item2) {
      return -1;
    }
    if (item1 < item2) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    if (!quizQuestions) {
      fetch(
        getURL(
          props.confirmedParams?.amount,
          props.confirmedParams?.category,
          props.confirmedParams?.difficulty,
          props.confirmedParams?.type
        )
      )
        .then((res) => res.json())
        .then((data) => {
          const quizData = data.results.map((details) => {
            let all_answers = [];
            details.incorrect_answers.forEach((answer) =>
              all_answers.push(answer)
            );
            all_answers.push(details.correct_answer);
            all_answers.sort((answer1, answer2) =>
              descendingSort(answer1, answer2)
            );
            return { ...details, all_answers };
          });
          setQuizQuestions(quizData);
          setLoader(true);
        })
        .catch((err) => {
          navigate("/error");
        });
    }
  }, []);

  useEffect(() => {
    if (loader) {
      intervalId.current = setInterval(increaseTimer, 1000);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [loader]);

  function finished() {
    props.setTime(timer);
    props.setScore({ scored: countRightAnswers, total: quizQuestions?.length });
    navigate("/score");
  }

  return (
    <>
      {loader ? (
        <div className=" w-full sm:w-2/3 h-full text-stone-800 bg-stone-100 bg-opacity-70 rounded-sm shadow-xl m-auto bg-scroll p-4 overflow-auto ">
          <div className=" flex justify-between w-full h-[10%] ">
            <p>Questions:{quizQuestions?.length}</p>
            <p>Timer:{timer}</p>
          </div>
          {quizQuestions?.map((quest, index) => {
            return (
              <Question
                key={index}
                number={index + 1}
                category={quest.category}
                type={quest.type}
                difficulty={quest.difficulty}
                question={quest.question}
                allAnswers={quest.all_answers}
                correctAnswer={quest.correct_answer}
                setCountRightAnswers={setCountRightAnswers}
              />
            );
          })}
          <div className="w-full h-[10%] flex justify-end ">
            <button onClick={finished} className=" mr-5 underline ">
              Finish
            </button>
          </div>
        </div>
      ) : (
        <div className=" w-full h-full bg-black bg-opacity-30 flex justify-center items-center ">
          <img src={loading} alt="loading" className=" scale-[30%] " />
        </div>
      )}
    </>
  );
}

export default QuizScreen;
