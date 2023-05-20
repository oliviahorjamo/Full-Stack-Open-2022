import { Patient } from "../../types"
import { Female, Male, Transgender } from "@mui/icons-material"
import EntryList from "./EntryList"

interface PatientProps {
  patient: Patient | null | undefined
}

const PatientPage = ({patient}: PatientProps) => {

  if (!patient) {
    return (
      <div>
        <p>Could not find a patient with the given id</p>
      </div>
    )
  }

  let Icon = Transgender
  if (patient.gender === 'male') {
    Icon = Male
  } else if (patient.gender === 'female') {
    Icon = Female
  }

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center'}}>
      <h2>{patient.name}</h2>
      <Icon />
      </div>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <EntryList entries={patient.entries}/>
    </div>
  )
}

export default PatientPage