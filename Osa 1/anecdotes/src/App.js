import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [max, setMax] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)
  const range = anecdotes.length

  const handleNextClick = () => {
    const random = findRandom()
    setSelected(random)
  }

  const handleVoteClick = () => {
    const copy = {... points}
    copy[selected] += 1
    setPoints(copy)
  }

  const findRandom = () => {
    let rand = null;
    while(rand === null || rand === selected){
      rand = Math.floor(Math.random() * (range));
    }
    return rand;
  }

  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} points</p>
      <Button handleClick={handleVoteClick} text = "vote" />
      <Button handleClick={handleNextClick} text="next anecdote" />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App
