import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country}) => {
    console.log(country)
    return (
        <div>
            <h1>{country.name.common}</h1>
            capital {country.capital}
            <br></br>
            area {country.area}
            <h2>languages</h2>
            <LanguageList country = {country}></LanguageList>
            <Flag country = {country}></Flag>
        </div>
    )
}

const LanguageList = ({country}) => {
    const languages = Object.values(country.languages)
    console.log(languages)
    return (
        <ul>
        {languages.map(language =>
            <li>{language}</li>)
        }
        </ul>
    )
}

const Flag = ({country}) => {
    const flag_url = country.flags.png
    console.log(flag_url)
    return (
        <img src = {flag_url} alt = "new"></img>
    )
}


export default Country
