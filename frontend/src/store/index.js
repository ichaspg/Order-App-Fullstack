import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  cart: cartSlice.reducer,
  order:orderSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// const store = configureStore({
//   reducer: {
//     cart: cartSlice.reducer,
//     order:orderSlice.reducer,
//   }
// });

const store = configureStore({
  reducer : persistedReducer,
  middleware: [thunk]
})

export default store;
