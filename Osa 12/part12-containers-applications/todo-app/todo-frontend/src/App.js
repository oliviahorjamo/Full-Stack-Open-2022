import './App.css';
import TodoView from './Todos/TodoView'

function App() {
  return (
    <div className="App">
      <TodoView />
    </div>
  );
}

export default App;

// Now your frontend listens to that backend at 3001
// The steps taken to achieve this
// change the backend default port from 3001 to 3000 in bin/www in backend
// set REACT_BACKEND_API_URL to http://localhost:3001 in frontend

// To get the backend running you
// started the redis server by installing redis-server locally and running redis-server
// this starts the redis server locally on port 6379
// note that the process is not killed when you shut down the computer
// previously the backend worked only when ran in container because
// you started the redis server in container but not locally

// Next steps
// Now you can connect to the backend that is running either locally or in a container
// so
// containerize the frontend so that you can run it containerized while connecting to a local backend
// create a Docker file in the frontend
// set ENV to have REACT_BACKEND_API_URL correctly so that it can be used in the
// containerized app (containers can't use .env)
// (though probably not needed here as i've hardcoded the backend url)
// build the frontend in the container and run the container
// after this you'll have a containerized frontend connected to a local backend