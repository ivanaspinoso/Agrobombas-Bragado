import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialContacts = {
  contacts: [
    {
      id: uuidv4(),
      name: "Federico",
      email: "",
      cellphone: "2342513085",
      address: "",
      city: "",
      zip: "",
      province: "",
      country: "549",
    },
    {
      id: uuidv4(),
      name: "Paula",
      email: "pauitadedia@gmail.com",
      cellphone: "2342463902",
      address: "",
      city: "",
      zip: "",
      province: "",
      country: "549",
    },
    {
      id: uuidv4(),
      name: "Federico",
      email: "fede@fede.com",
      cellphone: "2342513085",
      address: "Saavedra",
      city: "Bragado",
      zip: "",
      province: "Bs As",
      country: "549",
    },
  ],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    showContacts: (state) => state,
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

export const { showContacts, addContact, updateContact, deleteContact } =
contactsSlice.actions;

export default contactsSlice.reducer;