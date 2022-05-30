import { useEffect, useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [sum, setSum] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive_share, setSharePositive] = useState(0)
  const [positives_count, setCountPositive] = useState(0)
  const all = [good, neutral, bad, count, sum, average, positive_share]

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
      <Statistics good = {good} neutral = {neutral} bad = {bad} count = {count} 
      sum = {sum} average = {average} positive_share = {positive_share}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.count === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticsTable props = {props}/>
  </div>
  )
}

const StatisticsTable = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{props.props.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.props.bad}</td>
        </tr>
        <tr>
          <td>count</td>
          <td>{props.props.count}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{props.props.average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{props.props.positive_share}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default App;