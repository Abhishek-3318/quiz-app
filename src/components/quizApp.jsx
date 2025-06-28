import React, { useState, useEffect } from 'react';
import './QuizApp.css';

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
  },
];

export default function QuizApp() {
  const [testStarted, setTestStarted] = useState(false); // 👈 new state
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(15);
  const [animate, setAnimate] = useState(false);

  const currentQuestion = questions[index];

  // ⏱ Timer logic
  useEffect(() => {
    if (!testStarted || showResult) return;

    if (timer === 0 && !isSaved) {
      handleSave(); // auto-save
    }

    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, [testStarted, timer, isSaved, showResult]);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleSave = () => {
    if (selected === currentQuestion.answer) {
      setScore(score + 1);
    }
    setIsSaved(true);
  };

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setSelected(null);
      setIsSaved(false);
      setTimer(15);

      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleStartTest = () => {
    setTestStarted(true);
  };

  return (
    <div className="quiz-container">
      <h2 className="title">Colorful Quiz App</h2>

      {!testStarted ? (
        <div>
          <h3>Click the button below to begin your test.</h3>
          <button onClick={handleStartTest} className="start-btn">Start Test</button>
        </div>
      ) : showResult ? (
        <div className="result">
          <h3>Your Score: {score} / {questions.length}</h3>
          <button onClick={() => window.location.reload()}>Restart</button>
        </div>
      ) : (
        <div className={`question-box ${animate ? 'slide' : ''}`}>
          <h4>{index + 1}. {currentQuestion.question}</h4>
          <p className="timer">⏱ Time left: {timer}s</p>
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(option)}
              className={`option-btn option-${i + 1} ${selected === option ? 'selected' : ''}`}
            >
              {option}
            </button>
          ))}

          <div className="buttons">
            <button onClick={handleSave} disabled={!selected || isSaved}>
              Save
            </button>
            <button onClick={handleNext} disabled={!isSaved}>
              {index + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
