import { useState } from "react"
//import { Weather, Visibility } from "../types"
import { DiaryEntry } from "../types"
import { createDiaryEntry } from "../services/diaryService"

interface DiaryFormProps {
  diaryEntries: DiaryEntry[],
  setDiaries: (value: DiaryEntry[] | ((prevVar: DiaryEntry[]) => DiaryEntry[])) => void
}

const NewDiaryEntry = (props: DiaryFormProps) => {
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')

  const diaries = props.diaryEntries
  const setDiaries = props.setDiaries

  const CreateDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()
    // here creating a new entry
    const diaryToAdd = {
      weather: weather,
      visibility: visibility,
      comment: comment,
      date: date,
      id: props.diaryEntries.length + 1
    }
   
    createDiaryEntry(diaryToAdd)
      .then(data => {
        setDiaries(diaries.concat(data))
      })

    setWeather('')
    setVisibility('')
    setComment('')
    setDate('')
  }

  return (
    <div>
      <h2>add new diary entry</h2>
      <form onSubmit={CreateDiary}>
      <label>date</label>
      <input
        name='date'
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <br></br>
      <label>weather</label>
      <input
        value={weather}
        onChange={(event) => setWeather(event.target.value)}
      />
    <br></br>
    <label>visibility</label>
      <input
        value={visibility}
        onChange={(event) => setVisibility(event.target.value)}
      />
      <br></br>
      <label>comment</label>
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