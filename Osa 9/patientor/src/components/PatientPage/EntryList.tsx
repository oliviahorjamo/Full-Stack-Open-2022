
import { Entry } from "../../types";

interface EntryListProps {
  entries: Entry[]
} 

interface EntryProps {
  entry: Entry
}

const EntryList = ({entries}: EntryListProps): JSX.Element => {
  if (entries.length === 0) {
    return (
      <div>

      </div>
    )
  }
  
  return (
    <div>
      <h3>Entries</h3>
        {entries.map(e => 
          <EntryInfo key={e.id} entry={e}></EntryInfo>
          )}
    </div>
  )
}

const EntryInfo = ({entry}: EntryProps): JSX.Element => {
  return (
    <div>
      <p>{entry.date} <em>{entry.description}</em></p>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <div>
          <p>Diagnose codes:</p>
          <ul>
          {entry.diagnosisCodes?.map(d => 
            <li key={d}>{d}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EntryList