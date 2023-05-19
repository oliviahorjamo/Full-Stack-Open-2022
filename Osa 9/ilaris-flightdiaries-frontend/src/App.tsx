import React, { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import FlightDiary from './components/FlightDiary';
import NewDiaryEntry from './components/NewDiaryEntry';
import Notification from './components/Notification';
import { NotificationEntry } from './types';

function App() {
  const [flightDiaries, setFlightDiaries] = useState<DiaryEntry[]>([])
  const [notification, setNotification] = useState<NotificationEntry>({message: null})

  useEffect(() => {
    getAllDiaries()
    .then(data => {
      setFlightDiaries(data)
    })
  }, [])

  const setNotificationWithTimeout = (message: string | null) => {
    setNotification({message})
    setTimeout(() => {
      setNotification({message: null})
    }, 3000)
  }

  return (
    <div>
      <Notification entry = {notification}></Notification>
      <h2>Diary entries</h2>
      {flightDiaries.map(f => 
        <FlightDiary key={f.id} entry={f}
        />
        )}
        <NewDiaryEntry diaryEntries={flightDiaries} setDiaries={setFlightDiaries} setNotificationWithTimeout={setNotificationWithTimeout}/>
    </div>
  );
}

export default App;


// Open questions:
// How should the notification be typed? Currently I have a notificationType entry but I don't know
// how to use it setNotificatioNWithTimeout props.

// How to refactor:
// Make the app to use Reducers
// instead of having the state of notification in app, it would be in the reducer
// the reducer should be typed
// diaries would be found from the reducer and not passed as a prop to NewDiaryEntry
// the form should not handle the diaries in the state, instead this should happen in the app component
// the form should only gather the data and call the function for adding a diary in app