import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { productApiSlice } from "../api/productApiSlice";

const productsAdapter = createEntityAdapter();
const initialState = productsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { dispatch }) => {
    const { data } = productApiSlice.endpoints.getAllProducts.initiate();
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { dispatch }) => {
    const { data } =
      productApiSlice.endpoints.getProductById.initiate(productId);
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: productsAdapter.setOne,
    updateProduct: productsAdapter.updateOne,
    removeProduct: productsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        productsAdapter.upsertOne(state, action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setProduct, updateProduct, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.products);
