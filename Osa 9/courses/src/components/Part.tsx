
import { CoursePart,
  CoursePartBase,
  CoursePartBaseWithDescription,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartBackground
} from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const BasicInfo = ({coursePart}: { coursePart: CoursePart }): JSX.Element => {
  return (
    <h4>
      {coursePart.name} {coursePart.exerciseCount}
    </h4>
  )
}

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  console.log(coursePart)
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <BasicInfo coursePart={coursePart} />
          <em>{coursePart.description}</em>
        </div>
      )
    case 'group':
        return (
          <div>
            <BasicInfo coursePart={coursePart} />
            <p>Project exercises {coursePart.groupProjectCount}</p>
          </div>
        )
    case 'background':
      return (
        <div>
          <BasicInfo coursePart={coursePart} />
          <em>{coursePart.description}</em>
          <p>Background material: {coursePart.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <BasicInfo coursePart={coursePart} />
          <em>{coursePart.description}</em>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part