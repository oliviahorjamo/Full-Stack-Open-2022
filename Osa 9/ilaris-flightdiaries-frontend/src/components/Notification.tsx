import { NotificationEntry } from "../types"

interface NotificationProps {
  entry: NotificationEntry
}

const Notification = (props: NotificationProps): JSX.Element => {
  const entry = props.entry

  const style: React.CSSProperties = {
    color: 'red'
  }  

    return (
      <div style={style}>
        {entry.message}
      </div>
    )
  }

export default Notification