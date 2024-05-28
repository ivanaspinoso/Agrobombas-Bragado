import { configureStore, combineReducers, defaultEnhancers } from "@reduxjs/toolkit";

// import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

import contactsReducer from "../features/contacts/ContactsSlice";
import configsReducer from "../features/config/ConfigSlice"
import groupsReducer from "../features/groups/GroupsSlice"
import messagesReducer from '../features/messages/MessagesSlice'
import usersReducer from '../features/users/usersSlice'
import receiptsReducer from '../features/receipts/receiptsSlice'

import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contactsReducer", "configsReducer", "groupsReducer", "messagesReducer", "usersReducer", "receiptsReducer"],
}

const rootReducer = combineReducers({
  contactsReducer: contactsReducer,
  configsReducer: configsReducer,
  groupsReducer: groupsReducer,
  messagesReducer: messagesReducer,
  usersReducer: usersReducer,
  receiptsReducer: receiptsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  // Agrega otras opciones según sea necesario
/* 
  enhancers: (defaultEnhancers) => {
    return defaultEnhancers.concat(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
  },
 */
  // devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  // composeWithDevToolsDevelopmentOnly
});