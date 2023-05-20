import { HospitalEntry, DiagnoseEntry } from '../../../types'
import { LocalHospital } from '@mui/icons-material'

interface HospitalVisitProps {
  entry: HospitalEntry,
  diagnoses: DiagnoseEntry[]
}

const HospitalVisit = ({entry, diagnoses}: HospitalVisitProps): JSX.Element => {
  
  const style: React.CSSProperties = {
    padding: '10px',
    borderColor: 'black',
    borderRadius: '2px',
    border: 'solid'
  }
  
  console.log('entry in hospital visit', entry)
  console.log('diangoses in hospital visit', diagnoses)
  return (
    <div style = {style}>
      <div style={{display: 'flex', alignItems: 'center'}}>
      {entry.date} <LocalHospital/>
      </div>
      <em>{entry.description}</em>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

export default HospitalVisit