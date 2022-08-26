const Filter = (props) => {
    const filter_str = props.filter_str
    const handle = props.handle
    return (
        <form>
        <div>
          list shown with filter <input
          value={filter_str}
          onChange={handle}
          />
        </div>
      </form>
    )
}

export default Filter
