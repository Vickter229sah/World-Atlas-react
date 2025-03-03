import { useEffect, useState } from "react";

const FlagQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timer, setTimer] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // Controls game visibility

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();

      const quizQuestions = data.map((country) => {
        const otherCountries = data
          .filter((c) => c.name.common !== country.name.common)
          .map((c) => c.name.common);
        const options = shuffleArray([country.name.common, ...getRandomItems(otherCountries, 3)]);

        return {
          question: "Which country does this flag belong to?",
          options: options,
          correctAnswer: country.name.common,
          image: country.flags.svg,
        };
      });

      setQuizData(quizQuestions);
    };

    fetchQuizData();
  }, []);

  const getRandomItems = (array, count) => {
    return shuffleArray(array).slice(0, count);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = quizData[currentQuestionIndex];

    setSelectedAnswer(answer);
    setIsCorrect(answer === currentQuestion.correctAnswer);

    setTimeout(() => {
      if (answer === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quizData.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        alert(`Quiz over! Your score is: ${score + 1}`);
        setGameStarted(false); // Hide the game when quiz ends
      }

      setSelectedAnswer(null);
      setIsCorrect(null);
      setIsTimeUp(false);
      setTimer(15);
    }, 1000);
  };

  useEffect(() => {
    if (timer > 0 && !isTimeUp && gameStarted) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timer === 0) {
      setIsTimeUp(true);
      handleAnswer(null);
    }
  }, [timer, isTimeUp, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(15);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const stopGame = () => {
    setGameStarted(false);
  };

  if (!quizData.length) {
    return <div>Loading quiz...</div>;
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flag-quiz-container">
      <h1>Flag Quiz Game</h1>

      {!gameStarted ? (
        <button onClick={startGame} style={{margin:"auto"}} >Start Game</button>
      ) : (
        <>
            <br />
            <br />
          <img src={currentQuestion.image} alt="Flag" style={{ width: "300px", height: "auto" }} />
          <p>{currentQuestion.question}</p>

          <div className="timer">
            <p>Time Left: {timer} seconds</p>
          </div>

          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                style={{
                  backgroundColor:
                    selectedAnswer === option
                    ? isCorrect
                    ? "green"
                    : "red"
                    : option === currentQuestion.correctAnswer && selectedAnswer
                    ? "darkgreen"
                    : "black",
                    color: selectedAnswer ? "pink" : "white",
                    cursor: "pointer",
                    padding: "10px",
                    margin: "5px",
                    border: "1px solid #04cceb",
                    borderRadius: "5px",
                    fontSize: "16px",
                    transition: "background-color 0.3s",
                  }}
                  disabled={selectedAnswer !== null}
                  >
                {option}
              </button>
            ))}
          </div>

          <p>Score: {score}</p>
            <button onClick={stopGame} style={{margin:"auto"}}>Stop Game</button>
        </>
      )}
    </div>
  );
};

export default FlagQuiz;
