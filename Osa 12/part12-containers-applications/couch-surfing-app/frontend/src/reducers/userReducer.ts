import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { AppDispatch } from "../store";

type User = {
  name: string;
  username: string;
  password: string;
  id: string;
};

const initialState: Array<User> = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch: AppDispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
