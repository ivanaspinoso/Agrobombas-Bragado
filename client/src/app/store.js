import { configureStore } from "@reduxjs/toolkit";

import { composeWithDevTools } from "@redux-devtools/extension";

import contactsReducer from "../features/contacts/ContactsSlice";
import configsReducer from "../features/config/ConfigSlice"
import groupsReducer from "../features/groups/GroupsSlice"
import messagesReducer from '../features/messages/MessagesSlice'
import usersReducer from '../features/users/usersSlice'
import receiptsReducer from '../features/receipts/receiptsSlice'

export const store = configureStore({
  reducer: {
    contactsReducer: contactsReducer,
    configsReducer: configsReducer,
    groupsReducer: groupsReducer,
    messagesReducer: messagesReducer,
    usersReducer: usersReducer,
    receiptsReducer: receiptsReducer
  },
  composeWithDevTools,
  
});