import { createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();


export const selectUsersData = (state) =>
  state.api.endpoints.getUsers.useQueryState().data ?? [];

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) || initialState
);
