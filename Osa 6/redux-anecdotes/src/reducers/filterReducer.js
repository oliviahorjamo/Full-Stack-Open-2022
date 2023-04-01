import { createSlice } from "@reduxjs/toolkit"
// a reducer for the filter

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter(state='', action) {
      return action.payload
    }
  }

})

/*
export const filterChange = filter => {
  // an action creator for the filter
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

const filterReducer = (state = '', action) => {
  // set the payload of the action to the filter of the store
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}
*/

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer