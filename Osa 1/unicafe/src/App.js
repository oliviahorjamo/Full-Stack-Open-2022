import { useEffect, useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive_share, setSharePositive] = useState(0)
  const [positives_count, setCountPositive] = useState(0)

  useEffect(() => {
    setAverage(sum / count)
    setSharePositive(positives_count / count * 100 + "%")
  })


  const handleGoodClick = () => {
    setGood(good + 1)
    setCount(count + 1)
    setSum(sum + 1)
    setCountPositive(positives_count + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setCount(count + 1)
  }


  const handleBadClick = () => {
    setBad(bad + 1)
    setCount(count + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>count: {count}</p>
      <p>average: {average}</p>
      <p>positive: {positive_share}</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App;