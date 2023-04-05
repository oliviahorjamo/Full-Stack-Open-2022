import AnecdoteList from "./AnecdoteList"
import Filter from "./Filter"
import Notification from "./Notification"

const Home = () => {
  // komponentti kotinäkymälle

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default Home