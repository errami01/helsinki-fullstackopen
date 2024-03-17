

const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) =>{ 
  const sum = parts.reduce((acc, part)=> acc + part.exercises, 0)
  return <h4>Total of exercises {sum}</h4>
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>{ 
  const partComponents = parts.map((part)=> <Part key={part.id} part={part} />)
  return <>
    {partComponents}     
  </>
  }
const Course = ({course})=>{
    const {name, parts} = course
    return(
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
    )
  }

export default Course