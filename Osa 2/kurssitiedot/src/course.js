const Course = ({course}) => {
    return (
      <div>
        <Header header = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>{props.header}</h1>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
          {parts.map(part =>
            <Part key = {part.name} part = {part}/>
            )}
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
        <p>
          {part.name} {part.exercises}
        </p>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce(function(sum, part) {
      return sum + part.exercises
    }, 0)
  
    return (
      <div>
        <p>
          <b>Number of exercises {sum}</b>
        </p>
      </div>
    )
  }

  export default Course