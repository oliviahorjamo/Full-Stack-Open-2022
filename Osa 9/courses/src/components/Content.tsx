import Part from "./Part"
import { CoursePart } from "../types"

const Content = ({ courseInfo }: { courseInfo: CoursePart }): JSX.Element => {
  return (
    <div>
    <Part coursePart={courseInfo}/>
    </div>
  )
}

export default Content