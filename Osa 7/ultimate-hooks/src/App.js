import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  // a hook for the backend
  // gets baseUrl as a parameter, returns 
  // 1. a list of resources
  // 2. a service for creating new items and fetching items

  const [resources, setResources] = useState([])

  // ...


  useEffect(() => {
    // a hook for finding the resources the first time running the application
    // fetch all resources from the back end and set the the state
    
    const getAll = async () => {
      console.log('getAllissa')
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    
    console.log('getting all resources', baseUrl)
    getAll()
  
  }, [])

  const create = async (resource) => {
    console.log('creating a new object', resource)
    const response = await axios.post(baseUrl, resource)
    setResources([...resources, response.data])
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App