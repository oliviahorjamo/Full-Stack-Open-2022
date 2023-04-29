import { useSelector } from "react-redux"

import { Link } from "react-router-dom"

const UserPage = () => {
  const users = useSelector(state => state.users)
  console.log('users in user page component', users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
          <tr key={user.username}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}



export default UserPage