import { DiagnoseEntry, HealthCheckEntry } from '../../../types'
import { Healing, Favorite } from '@mui/icons-material'

interface HealthcheckVisitProps {
  entry: HealthCheckEntry,
  diagnoses: DiagnoseEntry[]
}

const healthRateColors = {
  0: 'green',
  1: 'yellow',
  2: 'orange',
  3: 'red'
}


const HealthcheckVisit = ({entry, diagnoses}: HealthcheckVisitProps): JSX.Element => {

  const style: React.CSSProperties = {
    padding: '10px',
    borderColor: 'black',
    borderRadius: '2px',
    border: 'solid'
  }

  const heartColor = healthRateColors[entry.healthCheckRating]

  return (
    <div style = {style}>
      <div style={{display: 'flex', alignItems: 'center'}}>
      {entry.date} <Healing/>
      </div>
      <em>{entry.description}</em>
      <br></br>
      <Favorite style={{color: heartColor}}/>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}

export default HealthcheckVisit