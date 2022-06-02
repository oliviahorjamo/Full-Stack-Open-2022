import Person from "./person"

const FilteredList = (props) => {
    const list = props.persons
    const filter_str = props.newFilter
    return list.filter(function(person) {
      return person.name.toUpperCase().indexOf(filter_str.toUpperCase()) !== -1
    }).map(person => 
        <Person key={person.name} person = {person}/>)
    }

export default FilteredList