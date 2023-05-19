import { DiaryEntry } from "../types";

// a component for a flight diary
// renders one diaryEntry which is of type DiaryEntry

interface FlightDiaryProps {
  entry: DiaryEntry
}

const FlightDiary = ({entry}: FlightDiaryProps): JSX.Element => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  );
};

export default FlightDiary