
import { useEffect, useState } from 'react'
import Filter from './filter_form'
import FilteredList from './filtered_list'
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    axios.
    get("http://localhost:3001/persons")
    .then(response => {
      console.log("promise fulfilled")
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])


  const handleNewName = (event) => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNewNumber = (event) => {
    const number = event.target.value
    setNewNumber(number)
  }

  const addNewName = (event) => {
    event.preventDefault()
    const person_names = persons.map(person => person.name)
    if (person_names.indexOf(newName) === -1) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter_str = {newFilter} handle = {handleFilterChange}/>
      <h3>add a new name</h3>
      <form>
        <div>
          name: <input 
          value={newName}
          onChange={handleNewName}/>
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNewNumber}/>
        </div>
        <div>
          <button type = "submit" onClick={addNewName}>add</button>
        </div>
        </form>
      <h2>Numbers</h2>
      <FilteredList persons={persons} newFilter = {newFilter}/>
    </div>
  )

}



export default App
