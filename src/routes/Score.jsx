import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function Score(props) {
  const navigate = useNavigate();
  // const [highscore, setHighscore] = useState(
  //   JSON.parse(localStorage.getItem("highscore"))
  // );
  // const userData = {
  //   name: "",
  //   time: props.time,
  //   score: props.score.scored,
  //   numberOfQuestion: props.score.total,
  // };
  // const [userScore, setUserScore] = useState(userData);

  useEffect(() => {
    if (props.score.total === undefined || props.score.total === null) {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("highscore", JSON.stringify(highscore));
  // }, [highscore]);

  // function changeHandler(e) {
  //   setUserScore((prevState) => {
  //     return {
  //       ...prevState,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // }

  // function save() {
  //   setHighscore((prevState) => {
  //     return [...prevState, userScore];
  //   });
  // }

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center ">
      <div className="  bg-[rgba(100,25,30,0.1)] shadow-md rounded-md  w-1/3 h-1/2 ">
        <div className=" w-full h-5/6 text-xl text-stone-800 flex flex-col justify-center items-center ">
          <p>
            Time Elapsed:{" "}
            {parseInt(props.time / 60) + "m:" + parseInt(props.time % 60) + "s"}
          </p>
          <p>
            Score: {props.score.scored}/{props.score.total}
          </p>
        </div>
        <div className=" w-full h-1/6 flex justify-evenly items-center ">
          <button onClick={() => navigate("/")} className=" underline ">
            Go Home
          </button>
          {/* <button onClick={save} className=" underline ">
            Save
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Score;
