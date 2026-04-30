import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../api';

interface ProductsState {
  products: any[] | null;
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  isMoreLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: ProductsState = {
  products: null,
  total: 0,
  skip: 0,
  limit: 30,
  isLoading: false,
  isMoreLoading: false,
  isSuccess: false,
  isError: false,
};

// All Products
export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async (
    params: { skip: number; limit: number; category?: string; search?: string } | undefined,
    thunkApi,
  ) => {
    try {
      const skip = params?.skip ?? 0;
      const limit = params?.limit ?? 30;
      const category = params?.category;
      const search = params?.search;

      let url = 'products';
      if ( search ) {
        url = `products/search?q=${ search }&`;
      } else if ( category && category !== 'All' ) {
        url = `products/category/${ category }?`;
      } else {
        url = 'products?';
      }

      url += `skip=${ skip }&limit=${ limit }`;

      const response = await API.get( url );
      return response.data;
    } catch ( error ) {
      return thunkApi.rejectWithValue( error );
    }
  },
);

const ProductsSlice = createSlice( {
  name: 'ProductsSlice',
  initialState,
  reducers: {
    resetProducts: state => {
      state.products = null;
      state.skip = 0;
      state.total = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase( getAllProducts.pending, ( state, action ) => {
      if ( action.meta.arg?.skip && action.meta.arg.skip > 0 ) {
        state.isMoreLoading = true;
      } else {
        state.isLoading = true;
      }
      state.isError = false;
    } );
    builder.addCase( getAllProducts.fulfilled, ( state, action ) => {
      state.isLoading = false;
      state.isMoreLoading = false;
      state.isSuccess = true;

      const newProducts = action.payload.products;
      if (
        state.products &&
        action.meta.arg?.skip &&
        action.meta.arg.skip > 0
      ) {
        // Prevent duplicates
        const existingIds = new Set( state.products.map( p => p.id ) );
        const uniqueNew = newProducts.filter( ( p: any ) => !existingIds.has( p.id ) );
        state.products = [ ...state.products, ...uniqueNew ];
      } else {
        state.products = newProducts;
      }

      state.total = action.payload.total;
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
    } );
    builder.addCase( getAllProducts.rejected, state => {
      state.isLoading = false;
      state.isMoreLoading = false;
      state.isError = true;
    } );
  },
} );

export const { resetProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;
