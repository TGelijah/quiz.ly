import ErrorPage from "./ErrorPage";
import Home from "./routes/Home";
import QuizScreen from "./routes/QuizScreen";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Score from "./routes/Score";

function App() {
  const [confirmedParams, setConfirmedParams] = useState(null);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState({});

  return (
    <div className='w-screen h-screen relative bg-[url("./assets/background.jpg")] font-inter overflow-auto '>
      <div className=" w-[150px] h-1/6 text-center text-sm absolute bottom-10 right-4 bg-[rgba(234,234,203,0.5)] text-red-600 shadow-xl font-bold tracking-wide hover:scale-105 hover:shadow-slate-500 hidden xl:flex items-center">
        <a
          href="https://github.com/glorious-elijah/quiz.ly/issues"
          target="_blank"
        >
          👍🏾 make a feature 💡 or report 🪲!
        </a>
      </div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home setConfirmedParams={setConfirmedParams} />}
          />
          <Route
            path="/quiz"
            element={
              <QuizScreen
                confirmedParams={confirmedParams}
                setTime={setTime}
                setScore={setScore}
              />
            }
          />
          <Route path="/score" element={<Score time={time} score={score} />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
