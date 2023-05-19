import { useState } from "react"
import { Weather, Visibility } from "../types"
import { DiaryEntry } from "../types"
import { createDiaryEntry } from "../services/diaryService"

import { isDiaryEntry } from "../utils"

interface DiaryFormProps {
  diaryEntries: DiaryEntry[],
  setDiaries: (value: DiaryEntry[] | ((prevVar: DiaryEntry[]) => DiaryEntry[])) => void,
  setNotificationWithTimeout: (notification: string | null) => void
}

const NewDiaryEntry = (props: DiaryFormProps) => {
  const [weather, setWeather] = useState<Weather>(Weather.Sunny)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')

  const diaries = props.diaryEntries
  const setDiaries = props.setDiaries
  const setNotificationWithTimeout = props.setNotificationWithTimeout


  const createDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      weather: weather,
      visibility: visibility,
      comment: comment,
      date: date
    }

    // here you should instead call createDiary from app
    // that function should take care of sending the data to the service
   
    const data = await createDiaryEntry(diaryToAdd)
    if (isDiaryEntry(data)) {
      setDiaries(diaries.concat(data))
    } else {
      console.log(data)
      setNotificationWithTimeout(data.message)
    }

    setWeather(Weather.Sunny)
    setVisibility(Visibility.Great)
    setComment('')
    setDate('')
  }

  return (
    <div>
      <h2>Add new diary entry</h2>
      <form onSubmit={createDiary}>
        <div>
        date
        <input 
          type='date'
          name='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        </div>
        <div>
        weather:
          sunny
          <input
            type='radio'
            name='weather'
            value={Weather.Sunny}
            checked={weather === Weather.Sunny}
            onChange={() => setWeather(Weather.Sunny)}
          />
          cloudy
          <input
            type='radio'
            name='weather'
            value={Weather.Cloudy}
            checked={weather === Weather.Cloudy}
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            type='radio'
            name='weather'
            value={Weather.Stormy}
            checked={weather === Weather.Stormy}
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            type='radio'
            name='weather'
            value={Weather.Windy}
            onChange={() => setWeather(Weather.Windy)}
          />
          rainy
          <input
            type='radio'
            name='weather'
            value={Weather.Rainy}
            checked={weather === Weather.Rainy}
            onChange={() => setWeather(Weather.Rainy)}
          />
        </div>
        <div>
          visibility
            great
            <input
              type='radio'
              name='visibility'
              value={Visibility.Great}
              checked = {visibility === Visibility.Great}
              onChange={() => setVisibility(Visibility.Great)}
            />
            good
            <input
              type='radio'
              name='visibility'
              value={Visibility.Good}
              checked = {visibility === Visibility.Good}
              onChange={() => setVisibility(Visibility.Good)}
            />
            ok
            <input
              type='radio'
              name='visibility'
              value={Visibility.Ok}
              checked = {visibility === Visibility.Ok}
              onChange={() => setVisibility(Visibility.Ok)}
            />
            poor
            <input
              type='radio'
              name='visibility'
              value={Visibility.Poor}
              checked = {visibility === Visibility.Poor}
              onChange={() => setVisibility(Visibility.Poor)}
            />
        </div>
        comment
        <input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button type='submit'>submit</button>
      </form>
    </div>
  )

}

export default NewDiaryEntry