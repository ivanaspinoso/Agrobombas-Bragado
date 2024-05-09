import axios from "axios";
import { allContactsEndpoint, addContactsEndpoint, delContactsEndpoint, updContactsEndpoint, userContactsEndpoint, byidContactsEndpoint } from "../consts/consts";
import { showContacts, addContact, deleteContact, updateContact, allContact, sendContact } from "../../features/contacts/ContactsSlice";

export const contactAdd = (userNew) => async (dispatch) => {
  // console.log("agregando", userNew);
  try {
    const { data } = await axios.post(`${addContactsEndpoint}`, userNew);
    dispatch({ type: addContact, payload: data.user });
    console.log(data)
    localStorage.setItem("userAdded", true)
  } catch (err) {
    localStorage.setItem("userAdded", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};


export const getAllContacts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allContactsEndpoint}`);
    // console.log("ejecutando action getallusers", data)
    dispatch({ type: allContact, payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}


export const getContactSend = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${byidContactsEndpoint}` + id);
    // console.log("ejecutando action getContactsend", data)
    dispatch({ type: sendContact, payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}



export const getUserContacts = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${userContactsEndpoint}` + id);
    // console.log("ejecutando action getallusers", data)
    dispatch({ type: allContact, payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingContacts", true)
  } catch (err) {
    localStorage.setItem("gettingContacts", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}

export const contactDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${delContactsEndpoint}${id}`)
    dispatch({ type: deleteContact, payload: id });
    localStorage.setItem("contactDeleted", true)
  } catch (err) {
    localStorage.setItem("contactDeleted", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    )
  }
};

export const contactUpdate = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updContactsEndpoint}`, { user });
    dispatch({ type: updateContact, payload: data.user });
    localStorage.setItem("contactUpdated", true)
  } catch (err) {
    localStorage.setItem("contactUpdated", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};
