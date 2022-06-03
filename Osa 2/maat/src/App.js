
import { useEffect, useState } from 'react'
import axios from "axios"
import Filter from './filter_form'
import FilteredList from './filtered_list'

//hae maat palvelimelta
//luo axios
//luo maille tila, lista sanakirjoista / olioista
//

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryShown, setNewCountry] = useState('')
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    axios.
    get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data)
    })
  }, [])


  const handleFilterChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
  }

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter_str = {newFilter} handle = {handleFilterChange}/>
      <FilteredList filter_str = {newFilter} countries = {countries}></FilteredList>
      </div>
  )

}

export default App

