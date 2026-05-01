import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  currentAddress: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentAddress: 'Fetching location...',
  coordinates: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setLocationSuccess: (state, action: PayloadAction<{ address: string; coords: { latitude: number; longitude: number } }>) => {
      state.currentAddress = action.payload.address;
      state.coordinates = action.payload.coords;
      state.loading = false;
    },
    setLocationError: (state, action: PayloadAction<string>) => {
      state.currentAddress = 'Location unavailable';
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLocationStart, setLocationSuccess, setLocationError } = locationSlice.actions;
export default locationSlice.reducer;
