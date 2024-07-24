import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase-config';

// Thunk to upload images
export const uploadImages = createAsyncThunk(
  'imageUploader/uploadImages',
  async ({ images, folderName }, { rejectWithValue }) => {
    try {
      const imageUrls = [];
  
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const newImageName = `image_${i + 1}.jpg`;
        const productFolderRef = ref(storage, `Kicks/${folderName}`);
        const imageRef = ref(productFolderRef, newImageName);
        await uploadBytes(imageRef, image);
  
        // Get the URL of the uploaded image
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }
  
      return imageUrls; 
    } catch (error) {
      console.error('Error uploading images:', error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  productFolderName: '',
  loading: false,
  error: null,
};

export const imageUploaderSlice = createSlice({
  name: 'imageUploader',
  initialState,
  reducers: {
    addImages: (state, action) => {
      const newImages = action.payload;
      if (state.images.length + newImages.length > 10) {
        console.warn("You can only upload up to 10 images.");
        return;
      }
      
      state.loading = true;
      state.images = [...state.images, ...newImages];
      state.loading = false;
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((_, i) => i !== action.payload);
    },
    clearImages: (state) => {
      state.images = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addImages,
  removeImage,
  clearImages,
  setLoading,
  setError,
} = imageUploaderSlice.actions;

export const selectUploader = (state) => state.imageUploader;

export default imageUploaderSlice.reducer;
