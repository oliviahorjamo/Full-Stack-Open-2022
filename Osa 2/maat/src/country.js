//import { useState, useEffect } from "react"
//import axios from "axios"


import { useEffect, useState } from 'react'
import axios from "axios"

const Country = (props) => {
    const country = props.country
    const handleClick = props.handle
    const capital_lat = country.capitalInfo.latlng[0]
    const capital_lon = country.capitalInfo.latlng[1]
    const [weather, setWeather] = useState({})
    const api_key = process.env.REACT_APP_API_KEY

    //var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent( city ) + "&cnt=1";
    //var url = https://api.openweathermap.org/data/3.0/onecall?q=helsinki&appid={api_key}

    var url_weather = "https://api.openweathermap.org/data/3.0/onecall?lat="+capital_lat+"&lon="+capital_lon+"&appid="+api_key
    console.log(url_weather)

    useEffect(() => {
        axios.
        get(url_weather)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
    }, {})

    var url_icon = "http://openweathermap.org/img/wn/10d@2x.png"

        return (
            <div>
                <h1>{country.name.common}</h1>
                capital {country.capital}
                <br></br>
                area {country.area}
                <h2>languages</h2>
                <LanguageList country = {country}></LanguageList>
                <Flag country = {country}></Flag>
                <br></br>
                <h1> Weather in {country.capital}</h1>
                <p>temperature {} celcius</p>
                <p>wind {} m/s</p>
                <button onClick={handleClick}>
                        return to search page
                        </button>
            </div>
        )

}

const LanguageList = ({country}) => {
    const languages = Object.values(country.languages)
    return (
        <ul>
        {languages.map(language =>
            <li key={language}>{language}</li>)
        }
        </ul>
    )
}

const Flag = ({country}) => {
    const flag_url = country.flags.png
    return (
        <img src = {flag_url} alt = "new"></img>
    )
}


export default Country
