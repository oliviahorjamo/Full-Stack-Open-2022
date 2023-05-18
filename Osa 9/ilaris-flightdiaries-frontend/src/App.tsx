import React, { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import FlightDiary from './components/FlightDiary';
import NewDiaryEntry from './components/NewDiaryEntry';

function App() {
  const [flightDiaries, setFlightDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries()
    .then(data => {
      setFlightDiaries(data)
    })
  }, [])

  console.log(flightDiaries)

  return (
    <div>
      <h2>Diary entries</h2>
      {flightDiaries.map(f => 
        <FlightDiary key={f.id} entry={f}
        />
        )}
        <NewDiaryEntry diaryEntries={flightDiaries} setDiaries={setFlightDiaries}/>
    </div>
  );
}

export default App;


// 9.17 allow adding diary entries from the front end

// 1. make a diaryService addDiary method
// 2. make a state for newDiary
// 3. make a form for adding a new diary
// 4. create an event handler for submitting the form that calls addDiary
// 5. 