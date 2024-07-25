import { createSlice } from "@reduxjs/toolkit";

const initialContacts = {
  loading: 'idle',
  contacts: [],
  admcontacts: [],
  aenviar: {},
  auxcontacts: []
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: initialContacts,
  reducers: {
    showContacts: (state) => state,
    allContact: (state, action) => {
      state.contacts = action.payload
      state.auxcontacts = action.payload
    },
    admContact: (state, action) => {
      state.admcontacts = action.payload
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    sendContact: (state, action) => {
      state.aenviar = action.payload;
    },
    updateContact: (state, action) => {
      const { id, name, email, cellphone, address, city, zip, province,  country, } = action.payload;
      const isContactExist = state.contacts.filter((contact) => contact.id === id);
      if (isContactExist) {
        isContactExist[0].name = name;
        isContactExist[0].cellphone = cellphone;
        isContactExist[0].email = email;
        isContactExist[0].address = address;
        isContactExist[0].city = city;
        isContactExist[0].zip = zip;
        isContactExist[0].province = province;
        isContactExist[0].country = country;
      }
      const isAuxContactExist = state.auxcontacts.filter((contact) => contact.id === id);
      if (isAuxContactExist) {
        isAuxContactExist[0].name = name;
        isAuxContactExist[0].cellphone = cellphone;
        isAuxContactExist[0].email = email;
        isAuxContactExist[0].address = address;
        isAuxContactExist[0].city = city;
        isAuxContactExist[0].zip = zip;
        isAuxContactExist[0].province = province;
        isAuxContactExist[0].country = country;
      }

    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
      state.auxcontacts = state.auxcontacts.filter((contact) => contact.id !== id);
    },
    logoutContacts: (state, action) => {
      state.contacts = action.payload
      state.auxcontacts = action.payload
    },
    sortContacts: (state, action) => {
      state.contacts = action.payload
    },
    filterContacts: (state, action) => {
      state.contacts = action.payload
    }
  },
});

export const { showContacts, addContact, updateContact, deleteContact, allContact, sendContact, logoutContacts, sortContacts, admContact, filterContacts } = contactsSlice.actions;

export default contactsSlice.reducer;