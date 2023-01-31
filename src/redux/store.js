import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import modalReducer from './modalSlice'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const rootReducers = combineReducers({
    user:userReducer,
    cart:cartReducer,
    modal:modalReducer
})
const persistConfig = {
    key: 'root',
    version: 1,
    storage
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
      serializableCheck: false
      //  {
      //   ignoredActions: 
      //   [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // }
    }
    )
})
export let persistor = persistStore(store)