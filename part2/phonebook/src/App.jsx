import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({notifMessage})=>{
  if(notifMessage === null) return
  const {type, message} = notifMessage
  return(
    <div className={type}>
      {message}
    </div>
  )
}
const Filter = ({searchInput, handleSearch})=>{
  return <div>
    filter shown with: <input value={searchInput} onChange={handleSearch}/>
  </div>
}
const PersonForm = ({onSubmit, onNameChange, onNumberChange, newName, newNumber})=>{
  return(
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={onNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
const Persons = ({persons, handleRemove})=>{
  const personsElements = persons.map(
    (person)=> <SinglePerson key={person.id} person={person} handleRemove={handleRemove}/>
    )
  return <>{personsElements}</>
}
const SinglePerson = ({person, handleRemove}) => <p>{person.name} {person.number} <button onClick={()=> handleRemove(person.name, person.id)}>delete</button></p>

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [filteredNames, setfilteredNames] = useState([])
  const [notifMessage, setNotifMessage] = useState(null)
  useEffect(()=>{
    personService
      .getAll()
      .then(response=> setPersons(response))
  },[])
  const addPerson = (event)=> {
    event.preventDefault()
    let personId = ''
    if(persons.some((current)=> {
      personId = current.id
      return current.name.toLocaleLowerCase() === newName.toLocaleLowerCase() && current.number !== newNumber})) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
        .update(personId, newName, newNumber)
        .then(() => personService.getAll().then(data=>{
          setPersons(data)
          setNotifMessage({type:'success', message:`Updated ${newName}'s phone number`})
          setTimeout(()=>setNotifMessage(null), 3000)
        }))
        .catch(()=>{
          personService
          .getAll()
          .then(data=> {
            setNotifMessage({type: 'error', message: `Information of ${newName} has already been removed from server`})
            setTimeout(()=>{
              setNotifMessage(null)
              setPersons(data)
            }, 3000)
          })
        })
      } 
      return
    }
    
    if(newName.trimStart().length) {
      personService
      .create({name:newName, number: newNumber})
      .then(data=> {
        setPersons([...persons, data])
        setNotifMessage({type:'success', message:`Added ${newName}`})
        setTimeout(()=>setNotifMessage(null), 3000)
      })
      
    }
    else alert('Add a name')
  }
  const handleNameChange = (event)=> setNewName(event.target.value)
  const handleNumberChange = (event)=> setNewNumber(event.target.value)
  const handleSearch = (event) => {
    const targetInput = event.target.value
    const newResults = []
    console.log(targetInput)
    if(targetInput.trim().length){
      
      persons.forEach((person)=>{
      if(person.name.toLocaleLowerCase().includes(targetInput.toLocaleLowerCase())) newResults.push(person)
      }
      )
      
    }
    setfilteredNames(newResults)
    setSearchInput(targetInput)
  }
  const handleRemove = (name, id)=> {
    if(confirm(`Delete ${name}`)){
      personService
        .remove(id)
        .then(() => personService
                    .getAll()
                    .then(response=>{
                      setPersons(response)
                      setNotifMessage({type: "success", message: `${name} was removed successfully`})
                      }
                    )
        )
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifMessage={notifMessage} />
      <Filter searchInput={searchInput} handleSearch={handleSearch} />
      <h2>Add new</h2>
      <PersonForm 
        onSubmit={addPerson} 
        onNameChange={handleNameChange} 
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredNames.length? filteredNames : persons } handleRemove = {handleRemove} />
    </div>
  )
}

export default App
