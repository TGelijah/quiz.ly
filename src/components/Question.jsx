import React from "react";

function Question(props) {
  function checkAnswer(e) {
    if (e.target.value === props.correctAnswer) {
      props.setCountRightAnswers((prevState) => prevState + 1);
    }
  }
  return (
    <article className=" w-full h-auto mt-4 px-4 ">
      <div className=" w-full h-auto flex ">
        <label>Q{props.number}.</label>
        <p
          className=" ml-2 "
          dangerouslySetInnerHTML={{ __html: props.question }}
        />
      </div>
      <form className=" grid grid-cols-2 grid-rows-1 mt-2 px-2 lg:px-8 ">
        {props.allAnswers.map((answer, index) => (
          <div key={index} className=" w-full h-full p-2 ">
            <input
              type="radio"
              name={props.number}
              id={props.number + String(index)}
              onClick={checkAnswer}
              value={answer}
            />
            <label
              htmlFor={props.number + String(index)}
              dangerouslySetInnerHTML={{ __html: answer }}
              className=" ml-2 select-none "
            />
          </div>
        ))}
      </form>
    </article>
  );
}

export default Question;
