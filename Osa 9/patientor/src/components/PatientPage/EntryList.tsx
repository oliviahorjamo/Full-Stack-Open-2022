
import { useEffect, useState } from "react";
import { DiagnoseEntry, Entry } from "../../types";
import diagnoseService from '../../services/diagnoses'

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
  const [diagnoses, setDiagnoses] = useState<DiagnoseEntry[]>([])

  useEffect(() => {
    const fetchDiagnoseList = async () => {
      const allDiagnoses = await diagnoseService.getAll();
      const entryDiagnoses = allDiagnoses.filter(d =>
        entry.diagnosisCodes?.includes(d.code))
      setDiagnoses(entryDiagnoses);
    };
    void fetchDiagnoseList();
  }, []);

  console.log('diagnoses fetched', diagnoses)

  return (
    <div>
      <p>{entry.date} <em>{entry.description}</em></p>
      {diagnoses && diagnoses.length > 0 && (
        <div>
          <p>Diagnose codes:</p>
          <ul>
          {diagnoses.map(d => 
            <li key={d.code}>{d.code} {d.name}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default EntryList