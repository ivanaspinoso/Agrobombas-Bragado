import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "../features/contacts/ContactsSlice";
import booksReducer from "../features/books/BooksSlice"

const store = configureStore({
  reducer: {
    booksReducer: booksReducer,
    contactsReducer: contactsReducer,
  },
});

export default store;