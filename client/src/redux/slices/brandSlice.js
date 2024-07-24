import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import { brandApiSlice } from "../api/brandApiSlice";
  
  const brandsAdapter = createEntityAdapter();
  const initialState = brandsAdapter.getInitialState({
    loading: false,
    error: null,
  });
  
  export const fetchAllBrands = createAsyncThunk(
    "brands/fetchAllBrands",
    async (_, { dispatch }) => {
      const { data } = brandApiSlice.endpoints.fetchBrands.initiate();
      return data;
    }
  );
  
  export const fetchBrandById = createAsyncThunk(
    "brands/fetchBrandById",
    async (brandId, { dispatch }) => {
      const { data } = brandApiSlice.endpoints.getBrandById.initiate(brandId);
      return data;
    }
  );
  
  export const createBrand = createAsyncThunk(
    "brands/createBrand",
    async (brandDetails, { dispatch }) => {
      const { data } = await brandApiSlice.endpoints.createBrand.initiate(brandDetails);
      return data;
    }
  );
  
  export const updateBrandThunk = createAsyncThunk(
    "brands/updateBrand",
    async ({ brandId, ...updatedDetails }, { dispatch }) => {
      const { data } = await brandApiSlice.endpoints.updateBrand.initiate({ brandId, ...updatedDetails });
      return data;
    }
  );
  
  export const deleteBrand = createAsyncThunk(
    "brands/deleteBrand",
    async (brandId, { dispatch }) => {
      await brandApiSlice.endpoints.deleteBrand.initiate(brandId);
      return brandId;
    }
  );
  
  export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
      setBrand: brandsAdapter.setOne,
      updateBrand: brandsAdapter.updateOne,
      removeBrand: brandsAdapter.removeOne,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllBrands.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchAllBrands.fulfilled, (state, action) => {
          state.loading = false;
          brandsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchAllBrands.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchBrandById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBrandById.fulfilled, (state, action) => {
          state.loading = false;
          brandsAdapter.upsertOne(state, action.payload);
        })
        .addCase(fetchBrandById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
          brandsAdapter.addOne(state, action.payload);
        })
        .addCase(updateBrand.fulfilled, (state, action) => {
          brandsAdapter.updateOne(state, {
            id: action.payload._id,
            changes: action.payload,
          });
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
          brandsAdapter.removeOne(state, action.payload);
        });
    },
  });
  
  export const { setBrand, updateBrand, removeBrand } = brandSlice.actions;
  
  export default brandSlice.reducer;
  
  export const {
    selectAll: selectAllBrands,
    selectById: selectBrandById,
    selectIds: selectBrandIds,
  } = brandsAdapter.getSelectors((state) => state.brands);
  