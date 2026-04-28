import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

interface ProductsState {
  products: any | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductsState = {
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// All Products
export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async ( _, thunkApi ) => {
    try {
      const response = await API.get( 'products' );
      console.log(
        '🚀 ~ file: ProductsSlice.ts:13 ~ getAllProducts ~ response:',
        response,
      );
      return response.data;
    } catch ( error ) {
      console.log(
        '🚀 ~ file: ProductsSlice.ts:16 ~ getAllProducts ~ error:',
        error,
      );
      return thunkApi.rejectWithValue( error );
    }
  },
);

const ProductsSlice = createSlice( {
  name: 'ProductsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // getAllProducts cases
    builder.addCase( getAllProducts.pending, state => {
      state.isLoading = true;
    } );
    builder.addCase( getAllProducts.fulfilled, ( state, action ) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    } );
    builder.addCase( getAllProducts.rejected, ( state ) => {
      state.isLoading = false;
      state.isError = true;
    } );
  },
} );

export default ProductsSlice.reducer;
