import { createSlice } from "@reduxjs/toolkit";

const initialContacts = {
  loading: 'idle',
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    showContacts: (state) => state,
    allContact: (state, action) => {
      state.contacts = action.payload
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action) => {
      const { id, name, cellphone } = action.payload;
      const isContactExist = state.contacts.filter((contact) => contact.id === id);

      if (isContactExist) {
        isContactExist[0].name = name;
        isContactExist[0].cellphone = cellphone;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
  },
});

export const { showContacts, addContact, updateContact, deleteContact, allContact } =
contactsSlice.actions;

export default contactsSlice.reducer;