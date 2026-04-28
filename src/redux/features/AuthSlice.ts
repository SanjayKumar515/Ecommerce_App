import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../api';

interface AuthState {
  userData: any | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const initialState: AuthState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// login
export const login = createAsyncThunk( 'login', async ( params: any, thunkApi ) => {
  console.log( '🚀 ~ file: AuthSlice.ts:12 ~ login ~ params:', params );
  try {
    const response = await API.post( 'auth/login', params );
    console.log( '🚀 ~ file: AuthSlice.ts:16 ~ login ~ response:', response );
    return response.data;
  } catch ( error ) {
    console.log( '🚀 ~ file: AuthSlice.ts:16 ~ login ~ error:', error );
    return thunkApi.rejectWithValue( error );
  }
} );

const AuthSlice = createSlice( {
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // login cases
    builder.addCase( login.pending, state => {
      state.isLoading = true;
    } );
    builder.addCase( login.fulfilled, ( state, action ) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    } );
    builder.addCase( login.rejected, ( state ) => {
      state.isLoading = false;
      state.isError = true;
    } );
  },
} );

export default AuthSlice.reducer;
