import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "../features/contacts/ContactsSlice";
import booksReducer from "../features/books/BooksSlice"
import configsReducer from "../features/config/ConfigSlice"
import groupsReducer from "../features/groups/GroupsSlice"
import messagesReducer from '../features/messages/MessagesSlice'
import usersReducer from '../features/users/usersSlice'

const store = configureStore({
  reducer: {
    booksReducer: booksReducer,
    contactsReducer: contactsReducer,
    configsReducer: configsReducer,
    groupsReducer: groupsReducer,
    messagesReducer: messagesReducer,
    usersReducer: usersReducer
  },
});

export default store;