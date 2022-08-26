
import Country from "./country"

const FilteredList = (props) => {
    const list = props.countries
    const filter_str = props.filter_str
    const handleClick = props.handle
    const selected_country = props.country

    if (typeof selected_country.name == 'undefined') {
        const filtered_list =  list.filter(function(country) {
            return country.name.common.toUpperCase().indexOf(filter_str.toUpperCase()) !== -1
          })
          if (filtered_list.length > 10) {
              return <p>Too many matched, specify another filter</p>
          } else if (filtered_list.length === 1){
              return <Country country = {filtered_list[0]}></Country>
          } else {
            console.log('countries:', filtered_list)
              return (
                filtered_list.map(country => 
                    <p key={country.name.common}>{country.name.common}<button onClick={event => {handleClick(event, country)}}>
                    show
                  </button></p>)
              )
          }
    }
    }


export default FilteredList


// seuraavat tehtävät:
// tee nappi mistä voi palata takasin
// pitää näytää countries sivulla
// tän pitää triggeröidä valitun maan palauttaminen tyhjäks

// erota country ja filtered_list omikseen
// nyt ongelmana on että lista ja valittu maa renderöidään samalla eli ei keritä ottamaan huomioon efektiä