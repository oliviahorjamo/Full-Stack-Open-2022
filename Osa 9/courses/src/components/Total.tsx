import { CoursePart } from "../types"

interface TotalProps {
  CourseParts: CoursePart[]
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