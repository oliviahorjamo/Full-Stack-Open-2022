
import { useState } from 'react'
import Filter from './filter_form'
import FilteredList from './filtered_list'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

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

  const filterList = () => {
    const list = persons
    const filter_str = newFilter
    return list.filter(function(person) {
      return person.name.toUpperCase().indexOf(filter_str.toUpperCase()) !== -1
    })
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
