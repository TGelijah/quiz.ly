import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Question from "../components/Question";

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
  const [quizQuestions, setQuizQuestions] = useState();
  const [timer, setTimer] = useState(0);
  const [countRightAnswers, setCountRightAnswers] = useState(0);

  function increaseTimer() {
    setTimer((prevTime) => ++prevTime);
  }
  useEffect(() => {
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
          all_answers.sort((answer1, answer2) => {
            if (answer1 > answer2) {
              return -1;
            }
            if (answer1 < answer2) {
              return 1;
            }
            return 0;
          });
          return { ...details, all_answers };
        });
        setQuizQuestions(quizData);
      })
      .catch((err) => {
        navigate("/error");
      });
  }, []);

  useEffect(() => {
    intervalId.current = setInterval(increaseTimer, 1000);
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  function finished() {
    props.setTime(timer);
    props.setScore({ scored: countRightAnswers, total: quizQuestions?.length });
    navigate("/score");
  }

  return (
    <div className=" w-full sm:w-1/2 h-full text-stone-800 bg-stone-100 bg-opacity-70 rounded-sm shadow-xl m-auto bg-scroll p-4 overflow-auto ">
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
  );
}

export default QuizScreen;
