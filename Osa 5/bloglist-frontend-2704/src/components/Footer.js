import { useSelector, useDispatch } from "react-redux"
import { logUserOut } from "../reducers/userReducer"

import { Navbar, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const logout = async () => {
    dispatch(logUserOut())
  }

  const padding = {
    padding: 5
  }

  if (user) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/">home</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/notes">notes</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">users</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        {user
          ? <em style={padding}>{user.name} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
        <Button onClick={logout}>logout</Button>
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
  }
}

export default Footer