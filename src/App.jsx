import { useState } from "react"

function App() {
  const options = ["Paper", "Rock", "Scissors"]

  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [gameStart, setGameStart] = useState(false)
  const [playersChoice, setPlayersChoice] = useState("")
  const [cpuChoice, setCpuChoice] = useState("")
  const [result, setResult] = useState("")

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
    const cpu = options[Math.floor(Math.random() * options.length)]
    setPlayersChoice(choice)
    setCpuChoice(cpu)
    setResult(getResult(choice, cpu))
  }

  function restartGame() {
    setPlayersChoice("")
    setCpuChoice("")
    setResult("")
  }

  return (
    <>
      <h1>Rock Paper Scissors </h1>
      <div>
        <h2>Score</h2>
        <ul>
          <li>Your score: {playerScore}</li>
          <li>Computer's score: {computerScore}</li>
        </ul>
      </div>
      {
        !gameStart &&
        <div>
          <p>Test your luck and strategy against the computer.</p>
          <h2>Choices</h2>
          <ul>
            <li>Rock crushes Scissors</li>
            <li>Paper covers Rock</li>
            <li>Scissors cuts Paper</li>
          </ul>
          <button onClick={() => startGame()} >Start Game</button>
        </div>
      }
      {
        gameStart &&
        <div>
          {!result && <div>
            {options.map((option) => (
              <button key={option} onClick={() => handleChoice(option)}>{option}</button>
            ))}
          </div>}
          <div>
            <p>You chose: {playersChoice}</p>
            <p>Computer chose: {cpuChoice}</p>
            <p>The result: {result}</p>
          </div>
          {result && <button onClick={() => restartGame()}>Play Again</button>}
        </div>
      }
    </>
  )
}

export default App
