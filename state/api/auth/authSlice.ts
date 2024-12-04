import { IUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const getLoggedUser = (state) => state.authSlice.user;
