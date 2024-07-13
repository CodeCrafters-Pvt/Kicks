import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const setCredentialsThunk = createAsyncThunk(
  "auth/setCredentialsThunk",
  async (credentials, { dispatch, getState }) => {
    dispatch(setCredentials(credentials));
    const state = getState();
    return state.auth;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
