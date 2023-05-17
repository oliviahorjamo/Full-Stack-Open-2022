
// a component for the header of the app
// declare the datatype of the header

interface HeaderProps {
  header: string
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>
      {props.header}
    </h1>
  )
}

export default Header