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
  const [userName, setUserName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [ranking, setRanking] = useState([]);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);
  const [timerActive, setTimerActive] = useState(false); // New state to control timer activity

  useEffect(() => {
    const savedRanking = JSON.parse(localStorage.getItem('quizRanking')) || [];
    setRanking(savedRanking);
  }, []);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      playSound(clickSound);
      setShowNameInput(false);
    }
  };

  // Helper function to start the timer for a new question
  const startNewQuestionTimer = () => {
    setTimeLeft(15);
    setTimerActive(true);
  };

  const handleTopicSelection = (topic) => {
    playSound(clickSound);
    setSelectedTopic(topic);
    const topicQuestions = shuffleArray(questions[topic]).slice(0, 10);
    setShuffledQuestions(topicQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStartTime(Date.now());
    setQuizEndTime(null);
    startNewQuestionTimer(); // Start timer for the first question
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
      startNewQuestionTimer(); // Start timer for the next question
    } else {
      setTimerActive(false); // Stop timer when quiz ends
      setQuizEndTime(Date.now());
      setShowResult(true);
      playSound(resultSound);
    }
  };

  useEffect(() => {
    if (showResult && quizEndTime && quizStartTime) {
      updateRanking();
    }
  }, [showResult, quizEndTime, quizStartTime]);

  const updateRanking = () => {
    const timeTaken = ((quizEndTime - quizStartTime) / 1000).toFixed(1);
    const newEntry = { name: userName, score: score, topic: selectedTopic, time: parseFloat(timeTaken) };

    const updatedRanking = [...ranking, newEntry].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });

    localStorage.setItem('quizRanking', JSON.stringify(updatedRanking));
    setRanking(updatedRanking);
  };

  const restartQuiz = () => {
    playSound(clickSound);
    const topicQuestions = shuffleArray(questions[selectedTopic]).slice(0, 10);
    setShuffledQuestions(topicQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStartTime(Date.now());
    setQuizEndTime(null);
    startNewQuestionTimer(); // Restart timer for the new attempt
  };

  const goBackToMenu = () => {
    playSound(clickSound);
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    setShuffledQuestions([]);
    setTimeLeft(15); // Reset timeLeft, but timer won't start until a topic is selected
    setUserName('');
    setShowNameInput(true);
    setQuizStartTime(null);
    setQuizEndTime(null);
    setTimerActive(false); // Ensure timer is off when going back to menu
  };

  // Timer logic
  useEffect(() => {
    // If timer is not active, or quiz results are showing, do nothing
    if (!timerActive || showResult) {
      return;
    }

    // If time runs out for the current question
    if (timeLeft === 0) {
      playSound(wrongSound);
      nextQuestion(); // Move to the next question
      return; // Do not set a new interval if time is 0
    }

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup function: clear the interval when component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [timeLeft, timerActive, showResult, currentQuestion, shuffledQuestions.length]); // Dependencies for the timer effect

  const getRankText = (index) => {
    switch (index) {
      case 0: return '1º Lugar 🥇';
      case 1: return '2º Lugar 🥈';
      case 2: return '3º Lugar 🥉';
      default: return `${index + 1}º Lugar`;
    }
  };

  return (
    <div className="quiz-container">
      <img
        src={require('./img/fundo.png')}
        alt="FundoFloresta"
      />

      {showNameInput ? (
        <div className="start-menu">
          <h1>Bem-vindo ao NeuroMaze!</h1>
          <form onSubmit={handleNameSubmit}>
            <h2>Por favor, digite seu nome:</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Seu nome"
              required
              className="name-input"
            />
            <button type="submit" className="start-button">
              Começar
            </button>
          </form>
        </div>
      ) : !selectedTopic ? (
        <div className="start-menu">
          <h1>Olá, {userName}!</h1>
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
                  Parabéns, {userName}! Você acertou {score} de {shuffledQuestions.length} perguntas em {((quizEndTime - quizStartTime) / 1000).toFixed(1)} segundos!
                </p>
                <h3>Ranking Geral:</h3>
                <ol className="ranking-list">
                  {ranking.map((entry, index) => (
                    <li key={index} className={
                        entry.name === userName &&
                        entry.score === score &&
                        entry.topic === selectedTopic &&
                        entry.time === parseFloat(((quizEndTime - quizStartTime) / 1000).toFixed(1))
                        ? 'highlight-me' : ''
                    }>
                      <span className="ranking-position">{getRankText(index)}</span>
                      <span className="ranking-info">
                        {entry.name} - {entry.score} acertos ({entry.topic}) <br/> ⏰ {entry.time}s
                      </span>
                    </li>
                  ))}
                </ol>
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
