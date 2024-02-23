import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const adminsAdapter = createEntityAdapter({});

const initialState = adminsAdapter.getInitialState();


export const selectAdminsData = (state) =>
  state.api.endpoints.getAdmins.useQueryState().data ?? [];

export const {
  selectAll: selectAllAdmins,
  selectById: selectAdminById,
  selectIds: selectAdminsIds,
} = adminsAdapter.getSelectors(
  (state) => selectAdminsData(state) || initialState
);
