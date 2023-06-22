import { useAppDispatch } from "./hooks";
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { initializeUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // here initialize users in the first version
    // later no initializations here but only in components?
    dispatch(initializeUsers());
  }, [dispatch]);

  // later create a router here that creates the

  return (
    <div>
      <div>
        <Link to="/">home</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
};

export default App;
