import { useState } from "react"

function App() {
  const options = ["Paper", "Rock", "Scissors"]

  const [playersChoice, setPlayersChoice] = useState("")
  const [cpuChoice, setCpuChoice] = useState("")
  const [result, setResult] = useState("")

  function getResult(player, cpu) {
    if (player === cpu) {
      return "It's a draw"
    }
    if (player === "Rock" && cpu === "Scissors" ||
      player === "Paper" && cpu === "Rock" ||
      player === "Scissors" && cpu === "Paper"
    ) {
      return "You win!"
    } return "You lose!"
  }

  function handleClick(choice) {
    const cpu = options[Math.floor(Math.random() * options.length)]
    setPlayersChoice(choice)
    setCpuChoice(cpu)
    setResult(getResult(choice, cpu))
  }

  return (
    <>
      <h1> Rock, Paper, and Scissors </h1>
      <div>
        {options.map((option) => (
          <button key={option} onClick={() => handleClick(option)}>{option}</button>
        ))}
      </div>
      <div>
        <p>You chose: {playersChoice}</p>
        <p>Computer chose: {cpuChoice}</p>
        <p>The result: {result}</p>
      </div>
    </>


  )
}

export default App
