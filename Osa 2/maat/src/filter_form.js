const Filter = (props) => {
    const filter_str = props.filter_str
    const handle = props.handle
    return (
        <form>
        <div>
          filter shown with <input
          value={filter_str}
          onChange={handle}
          />
        </div>
      </form>
    )
}

export default Filter
