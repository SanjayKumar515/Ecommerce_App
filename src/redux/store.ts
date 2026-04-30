import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/CounterSlice';
import AuthSlice from './features/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import ProductsSlice from './features/ProductsSlice';
import CartSlice from './features/CartSlice';
import WishlistSlice from './features/WishlistSlice';
import OrderSlice from './features/OrderSlice';

const reducers = combineReducers( {
  counter: counterSlice,
  auth: AuthSlice,
  products: ProductsSlice,
  cartItems: CartSlice,
  wishlist: WishlistSlice,
  orders: OrderSlice,
} );

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [ 'auth', 'counter', 'cartItems', 'wishlist', 'orders' ],
};

const persistedReducer = persistReducer( persistConfig, reducers );

const store = configureStore( {
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware( { serializableCheck: false } ),
} );

const persistor = persistStore( store );

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
