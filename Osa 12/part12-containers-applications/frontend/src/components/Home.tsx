import { useAppSelector } from "../hooks";

const Home = () => {
  const users = useAppSelector((state) => state.users);

  if (!users) {
    return <div></div>;
  }
  return <div>{users.map((u) => u.username)}</div>;
};

export default Home;
