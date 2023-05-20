import { OccupationalHealthcareEntry, DiagnoseEntry} from '../../../types'
import { WorkOutline } from '@mui/icons-material'

interface OccupationalHealthcareVisitProps {
  entry: OccupationalHealthcareEntry,
  diagnoses: DiagnoseEntry[]
}

const OccupationalHealthcareVisit = ({entry, diagnoses}: OccupationalHealthcareVisitProps): JSX.Element => {
  
  const style: React.CSSProperties = {
    padding: '10px',
    borderColor: 'black',
    borderRadius: '2px',
    border: 'solid'
  }

  return (
    <div style = {style}>
      <div style={{display: 'flex', alignItems: 'center'}}>
      {entry.date} <WorkOutline /> {entry.employerName}
      </div>
      <em>{entry.description}</em>
      <br></br>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}


export default OccupationalHealthcareVisit