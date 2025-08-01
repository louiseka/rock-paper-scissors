import { useState, useEffect } from "react"
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa"

function App() {
  const options = [
    { name: "Paper", icon: FaHandPaper },
    { name: "Rock", icon: FaHandRock },
    { name: "Scissors", icon: FaHandScissors }
  ]

  const [playerScore, setPlayerScore] = useState(() => {
    const savedPlayerScore = window.localStorage.getItem('saved-player-score')
    return savedPlayerScore !== null ? JSON.parse(savedPlayerScore) : 0
  })

  const [computerScore, setComputerScore] = useState(() => {
    const savedComputerScore = window.localStorage.getItem('saved-computer-score')
    return savedComputerScore !== null ? JSON.parse(savedComputerScore) : 0
  })


  const [gameStart, setGameStart] = useState(false)
  const [playersChoice, setPlayersChoice] = useState("")
  const [cpuChoice, setCpuChoice] = useState("")
  const [result, setResult] = useState("")


  useEffect(() => {
    window.localStorage.setItem('saved-player-score', JSON.stringify(playerScore))
  }, [playerScore])

  useEffect(() => {
    window.localStorage.setItem('saved-computer-score', JSON.stringify(computerScore))
  }, [computerScore])

  function startGame() {
    setGameStart(true)
  }

  function getResult(player, cpu) {
    if (player === cpu) {
      return "It's a draw"
    }
    if (player === "Rock" && cpu === "Scissors" ||
      player === "Paper" && cpu === "Rock" ||
      player === "Scissors" && cpu === "Paper"
    ) {
      setPlayerScore(playerScore + 1)
      return "You win!"
    }
    setComputerScore(computerScore + 1)
    return "You lose!"
  }

  function handleChoice(choice) {
    const cpuChoice = options[Math.floor(Math.random() * options.length)]
    const cpu = cpuChoice.name
    setPlayersChoice(choice)
    setCpuChoice(cpu)
    setResult(getResult(choice, cpu))
  }

  function restartGame() {
    setPlayersChoice("")
    setCpuChoice("")
    setResult("")
  }

  const ChoiceDisplay = ({ label, choice }) => {
    const Icon = options.find(opt => opt.name === choice)?.icon
    return (
      <p> <span className="md-bold-text">{label}</span><span className="indiv-choice">{Icon && <Icon aria-hidden="true" focusable="false" className="icon" />} {choice}</span></p>
    )
  }

  return (
    <main>
      <h1>Rock Paper Scissors </h1>
      {!gameStart && <p className="tagline">Test your luck and strategy against the computer.</p>}
      {gameStart && <div className="score-section">
        <ul>
          <li><span className="md-bold-text">Your score:</span> {playerScore} </li>
          <li><span className="md-bold-text">Computer's score:</span> {computerScore}</li>
        </ul>
      </div>}
      {
        !gameStart &&
        <div>
          <button className="play-btn" onClick={() => startGame()} >Play Game</button>
        </div>
      }
      {
        gameStart &&
        <div>
          {!result && <div className="option-btns-section">
            {options.map(({ name, icon: Icon }) => (
              <button className="option-btn" aria-label={`Choose ${name}`} key={name} onClick={() => handleChoice(name)}><Icon aria-hidden="true" focusable="false" className="icon" /><span>{name}</span></button>
            ))}
          </div>}
          {result &&
            <div className="result-section" aria-live="polite">
              <p className="winner-section"><span className="md-bold-text">The result: </span> {result}</p>
              <button className="play-again-btn" onClick={() => restartGame()}>Play Again</button>
              <div className="choice-section">
                <ChoiceDisplay label="You chose:" choice={playersChoice} />
                <ChoiceDisplay label="Computer chose:" choice={cpuChoice} />
              </div>
            </div>}
        </div>
      }
    </main>
  )
}

export default App
