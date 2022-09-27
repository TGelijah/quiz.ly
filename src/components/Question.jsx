import React from "react";

function Question(props) {
	console.log(props.correctAnswer);
	//BUG const test = { ...props.incorrectAnswers, props.correctAnswer}
	console.log();
	return (
		<article className=" w-full h-1/5 mt-7 ">
			<label>Q{props.number}.</label>
			<p>{props.question}</p>
			<fieldset>
				{/* {answers.map((answer, index) => {
					return (
						<input key={index} type={"checkbox"}>
							{answer}
						</input>
					);
				})} */}
			</fieldset>
		</article>
	);
}

export default Question;
