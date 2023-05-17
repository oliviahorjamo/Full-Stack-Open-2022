import { CourseInfo } from "./Content"

interface TotalProps {
  CourseParts: CourseInfo[]
}

const Total = ({CourseParts}: TotalProps) => {
  const totalExercises = CourseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      Number of exercises{" "}
        {totalExercises}
    </div>
  )
}

export default Total