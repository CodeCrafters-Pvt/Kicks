import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  persist: localStorage.getItem("persist") === "true" ? true : false,
};

export const setCredentialsThunk = createAsyncThunk(
  "auth/setCredentialsThunk",
  async (credentials, { dispatch, getState }) => {
    dispatch(setCredentials(credentials));
    const state = getState();
    localStorage.setItem("persist", state.auth.persist.toString());
    return state.auth;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, persist } = action.payload;
      state.user = user;
      state.token = token;
      state.persist = persist;
      localStorage.setItem("persist", persist);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.persist = false;
      localStorage.removeItem("persist");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectPersist = (state) => state.auth.persist;
