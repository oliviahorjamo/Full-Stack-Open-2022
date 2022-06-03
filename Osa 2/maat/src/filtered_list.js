
import Country from "./country"

const FilteredList = (props) => {
    const list = props.countries
    const filter_str = props.filter_str

    const filtered_list =  list.filter(function(country) {
      return country.name.official.toUpperCase().indexOf(filter_str.toUpperCase()) !== -1
    })
    const filtered_names = filtered_list
        .map(country => 
            country.name.common)

    if (filtered_names.length > 10) {
        return <p>Too many matched, specify another filter</p>
    } else if (filtered_list.length === 1){
        return <Country country = {filtered_list[0]}></Country>
    } else {
        return (
            filtered_names.map(name => 
                <p>{name}</p>)
        )
    }
    }


export default FilteredList

