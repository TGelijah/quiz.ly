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
    <div className='w-screen h-screen bg-[url("./assets/background.jpg")] font-inter overflow-auto '>
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
