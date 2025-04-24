import React, { useState, useEffect } from 'react';
import './quiz.css';
import questions from './questions';

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
  }, []);

  const handleAnswer = (option) => {
    if (option === shuffledQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const next = currentQuestion + 1;
    if (next < shuffledQuestions.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
    setShuffledQuestions(shuffleArray(questions).slice(0, 10));
  };

  const startQuiz = () => {
    setQuizStarted(true);
    restartQuiz();
  };

  const goBackToMenu = () => {
    setQuizStarted(false);
  };

  return (
    <div className="quiz-container">
      <img
        src={require('./img/fundo-de-floresta-de-desenhos-animados.jpg')}
        alt="FundoFloresta"
      />
      {!quizStarted ? (
        <div className="start-menu">
          <h1>Bem-vindo ao NeuroMaze!</h1>
          <button className="start-button" onClick={startQuiz}>
            Iniciar NeuroMaze
          </button>
        </div>
      ) : (
        <>
          <div className="score-container">
            <p className="score">Pontuação: {score}</p>
          </div>

          <div className="quiz-content">
            <h1 className="quiz-title">QUIZ</h1>

            {shuffledQuestions.length > 0 ? (
              showResult ? (
                <div>
                  <p className="result">
                    Você acertou {score} de {shuffledQuestions.length}{' '}
                    perguntas!
                  </p>
                  <button className="restart-button" onClick={restartQuiz}>
                    Tentar novamente
                  </button>
                  <div />
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
              )
            ) : (
              <p>Carregando...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
