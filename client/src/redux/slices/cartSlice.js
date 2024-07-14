import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { store } from "../store";
import {
  cartApiSlice,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
  useClearCartMutation,
} from "../api/cartApiSlice";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    pendingChanges: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addItemToLocalCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
      state.pendingChanges.push({ type: "add", item: newItem });
      localStorage.setItem("pendingChanges", state.pendingChanges);
    },
    removeItemFromLocalCart: (state, action) => {
      const { itemId } = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.pendingChanges.push({ type: "remove", itemId });
      localStorage.setItem("pendingChanges", state.pendingChanges);
    },
    clearLocalCart: (state) => {
      state.items = [];
      state.pendingChanges = [];
      localStorage.removeItem("pendingChanges");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApiSlice.endpoints.addProductToCart.matchPending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      cartApiSlice.endpoints.addProductToCart.matchFulfilled,
      (state) => {
        state.isLoading = false;
        state.pendingChanges = [];
        localStorage.removeItem("pendingChanges");
      }
    );
    builder.addMatcher(
      cartApiSlice.endpoints.addProductToCart.matchRejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }
    );
  },
});

export const { addItemToLocalCart, removeItemFromLocalCart, clearLocalCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const confirmCartChanges = createAsyncThunk(
  "cart/confirmCartChanges",
  async (_, { getState }) => {
    try {
      const { pendingChanges } = getState().cart;
      await Promise.all(
        pendingChanges.map(async (change) => {
          if (change.type === "add") {
            await useAddProductToCartMutation(change.item).unwrap();
          } else if (change.type === "remove") {
            await useRemoveProductFromCartMutation(change.itemId).unwrap();
          }
        })
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Periodically attempt to sync pending changes with the backend
setInterval(() => {
  const pendingChanges = localStorage.getItem("pendingChanges");
  if (pendingChanges && pendingChanges.length > 0) {
    store.dispatch(confirmCartChanges());
  }
}, 30000);

export default cartSlice.reducer;
