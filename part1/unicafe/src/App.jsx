import { useState } from 'react'

const Button =({onClick, text})=> <button onClick={onClick}>{text}</button>
const Header = ({text})=> <h1>{text}</h1>
const StatisticLine = ({text, value})=> {
  return( 
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}
const Statistics = ({feedback}) => {
  const {good, neutral, bad} = feedback
  if(good || neutral || bad){
    const all = good + neutral + bad
    const average = (good - bad)/all
    const positive = good / all * 100 
    return(
      <table>
        <tbody>
        <StatisticLine text= 'good' value={good}/> 
        <StatisticLine text= 'neutral' value= {neutral}/> 
        <StatisticLine text= 'bad' value= {bad}/> 
        <StatisticLine text= 'all' value= {all}/> 
        <StatisticLine text= 'average' value= {average}/> 
        <StatisticLine text= 'positive' value = {positive+' %'} /> 
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodHandler = ()=> setGood(good + 1)
  const neutralHandler = ()=> setNeutral(neutral + 1)
  const badHandler = ()=> setBad(bad + 1)

  return (
    <>
      <Header text='give feedback'/>
      <Button onClick={goodHandler} text={'good'}/>
      <Button onClick={neutralHandler} text={'neutral'}/>
      <Button onClick={badHandler} text={'bad'}/>
      <Header text= 'statistics' />
      <Statistics feedback={{good, neutral, bad}}/>
    </>
  )
}

export default App
