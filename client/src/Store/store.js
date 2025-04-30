import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice.js";
import postReducer from "../Features/PostSlice.js";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // UseslocalStorage by default
import { combineReducers } from "redux";

const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state instorage
  storage, // The storage method (localStorage)
};

const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  posts: postReducer, // Manage posts slice of the state
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer in the store
});

const persistore = persistStore(store); // Create persistore for rehydration

export { store, persistore };
