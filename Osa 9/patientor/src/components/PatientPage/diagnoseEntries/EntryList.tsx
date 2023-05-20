
import React, { useEffect, useState } from "react";
import { DiagnoseEntry, Entry } from "../../../types";
import diagnoseService from '../../../services/diagnoses'
import HospitalVisit from "./HospitalVisit";
import OccupationalHealthcareVisit from "./OccupationalVisit";
import HealthcheckVisit from "./HealthCheckVisit";

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

const EntryInfo: React.FC<{entry: Entry }> =({entry}) => {
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

  switch(entry.type) {
    case 'Hospital':
      return <HospitalVisit entry={entry} diagnoses={diagnoses} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareVisit entry={entry} diagnoses={diagnoses}/>
    case 'HealthCheck':
      return <HealthcheckVisit entry={entry} diagnoses={diagnoses} />
    default:
      return (
        <div>
          Entry has wrong type
        </div>
      )
  }  
}

export default EntryList

// TODO for entry based rendering

// create a switch case for entry type
