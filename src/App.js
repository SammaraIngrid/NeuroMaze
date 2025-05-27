import React, { useState, useEffect } from 'react';
import './quiz.css';
import questions from './questions';

import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import clickSound from './sounds/click.mp3';
import resultSound from './sounds/result.mp3';

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleTopicSelection = (topic) => {
    playSound(clickSound);
    setSelectedTopic(topic);
    const topicQuestions = shuffleArray(questions[topic]).slice(0, 10);
    setShuffledQuestions(topicQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
  };

  const handleAnswer = (option) => {
    playSound(clickSound);
    const correct = shuffledQuestions[currentQuestion].answer;
    if (option === correct) {
      setScore(score + 1);
      playSound(correctSound);
    } else {
      playSound(wrongSound);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    const next = currentQuestion + 1;
    if (next < shuffledQuestions.length) {
      setCurrentQuestion(next);
      setTimeLeft(15);
    } else {
      setShowResult(true);
      playSound(resultSound);
    }
  };

  const restartQuiz = () => {
    playSound(clickSound);
    const topicQuestions = shuffleArray(questions[selectedTopic]).slice(0, 10);
    setShuffledQuestions(topicQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
  };

  const goBackToMenu = () => {
    playSound(clickSound);
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    setShuffledQuestions([]);
    setTimeLeft(15);
  };

  useEffect(() => {
    if (showResult || !selectedTopic) return;

    if (timeLeft === 0) {
      playSound(wrongSound);
      nextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, selectedTopic]);

  return (
    <div className="quiz-container">
      <img
        src={require('./img/fundo-de-floresta-de-desenhos-animados.jpg')}
        alt="FundoFloresta"
      />
      {!selectedTopic ? (
        <div className="start-menu">
          <h1>Bem-vindo ao NeuroMaze!</h1>
          <h2>Escolha um tema:</h2>
          <div className="topic-buttons">
            {Object.keys(questions).map((topic) => (
              <button
                key={topic}
                className="start-button"
                onClick={() => handleTopicSelection(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="score-container">
            <p className="score">Pontuação: {score}</p>
            <p className="timer">⏰ Tempo: {timeLeft}s</p>
          </div>

          <div className="quiz-content">
            <h1 className="quiz-title">{selectedTopic.toUpperCase()}</h1>

            {showResult ? (
              <div>
                <p className="result">
                  Você acertou {score} de {shuffledQuestions.length} perguntas!
                </p>
                <button className="restart-button" onClick={restartQuiz}>
                  Tentar novamente
                </button>
                <button className="restart-button" onClick={goBackToMenu}>
                  Voltar ao Menu Principal
                </button>
              </div>
            ) : (
              <div>
                <p className="quiz-question">
                  {shuffledQuestions[currentQuestion].question}
                </p>
                {shuffledQuestions[currentQuestion].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleAnswer(option)}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;