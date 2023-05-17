export interface CourseInfo {
  key?: string,
  name: string,
  exerciseCount: number
}

const Content = ({ courseInfo }: { courseInfo: CourseInfo }): JSX.Element => {
  const {name, exerciseCount} = courseInfo
  return (
    <p>
        {name} {exerciseCount}
      </p>
  )
}

export default Content