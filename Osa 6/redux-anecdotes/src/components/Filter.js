import { useDispatch } from "react-redux"
import { useState } from "react"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const [filter, setFilterText] = useState('')
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setFilterText(event.target.value)
    dispatch(setFilter(event.target.value))
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input 
      value = {filter} onChange={handleChange} />
    </div>
  )
}

export default Filter