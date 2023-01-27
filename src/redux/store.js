import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import userReducer from './userSlice'
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
})
// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage
//   }
  
  // const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
      serializableCheck: {
        ignoredActions: 
        [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }
    ),
})

// export let persistor = persistStore(store)