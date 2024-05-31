import { configureStore, combineReducers, compose, applyMiddleware} from "@reduxjs/toolkit";

import { composeWithDevTools } from '@redux-devtools/extension';

import contactsReducer from "../features/contacts/ContactsSlice";
import configsReducer from "../features/config/ConfigSlice"
import groupsReducer from "../features/groups/GroupsSlice"
import messagesReducer from '../features/messages/MessagesSlice'
import usersReducer from '../features/users/usersSlice'
import receiptsReducer from '../features/receipts/receiptsSlice'

import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { thunk } from "redux-thunk";

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

// const composeEnhancers = process.env.REACT_APP_NODE_ENV === 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : (null || compose);

// const composeEn = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // devTools: false,
  // composeWithDevTools(applyMiddleware(thunk)),
  // Agrega otras opciones según sea necesario
   /* 
    enhancers: (defaultEnhancers) => {
      return defaultEnhancers().concat(window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
      return composeEnhancers(applyMiddleware(thunk))
    }, */
  
  // devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(composeWithDevTools(applyMiddleware(thunk)))
  // enhancers: composeEnhancers(applyMiddleware(thunk)),
});