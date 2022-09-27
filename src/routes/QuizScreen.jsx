import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Question from "../components/Question";

function QuizScreen(props) {
	const navigate = useNavigate();
	useEffect(() => {
		if (props.confirmedParams === null) {
			navigate("/");
		}
	}, []);

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

	const [quizQuestions, setQuizQuestions] = useState(null);

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
			.then((questions) => setQuizQuestions(questions.results))
			.catch((err) => {
				navigate("/error");
			});
	}, []);

	return (
		<div className=" w-full sm:w-1/2 h-full text-stone-800 bg-stone-100 rounded-sm shadow-md m-auto p-4 overflow-auto ">
			<div className=" flex justify-between w-full h-[10%] ">
				<p>Timer:</p>
				<p>Number of Questions:{quizQuestions?.length}</p>
				<p>Answered: </p>
				<p>Unanswered: </p>
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
						correctAnswer={quest.correct_answer}
						incorrectAnswers={quest.incorrect_answers}
					/>
				);
			})}
		</div>
	);
}

export default QuizScreen;
