import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
const Section = ({title, anecdote, votes}) =>{
  return(
    <>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const nextAnecHandler =()=>{
    const newSelected = getRandomInt(anecdotes.length)
    setSelected(newSelected)
  }
  const voteHandler = ()=>{
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const maxVotesAnecd =()=> votes.indexOf(Math.max(...votes))
  return (
    <div>
      <Section title = {'Anecdote of the day'} anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text = {'vote'} onClick= {voteHandler} />
      <Button text = {'next anecdote'} onClick= {nextAnecHandler} />
      <Section 
        title = {'Anecdote with most votes'} 
        anecdote={anecdotes[maxVotesAnecd()]} 
        votes={votes[maxVotesAnecd()]}
      />
    </div>
  )
}

export default App
