import axios from "axios";
import {
  getUserEndpoint,
  addUserEndpoint,
  getQRUserEndpoint,
  allUsersEndpoint,
  updUserssEndpoint,
  updadmUserssEndpoint,
  delUsersEndpoint,
} from "../consts/consts";
// import {
//   addUser,
//   loginUser,
//   logoutUser,
//   getQr,
//   allUsers,
//   logoutUsers,
//   updateUser,
//   updateUserAdm,
//   vinculaLogin,
//   instanceAdd,
// } from "../../features/users/usersSlice";
// import { logoutGroups } from "../../features/groups/GroupsSlice";
// import { logoutConfig } from "../../features/config/ConfigSlice";
// import { logoutContacts } from "../../features/contacts/ContactsSlice";
// import { logoutMessages } from "../../features/messages/MessagesSlice";
// import { logoutReceipts } from "../../features/receipts/receiptsSlice";

export const userAdd = (userNew) => async (dispatch) => {
  console.log("agregando", userNew);
  try {
    const { data } = await axios.post(`${addUserEndpoint}`, userNew);
    dispatch({ type: "users/addUser", payload: data.user });
    localStorage.setItem("userAdded", true);
    localStorage.setItem("newUser", data.user.id)
  } catch (err) {
    localStorage.setItem("userAdded", err.response.data.message);
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
};

export const getUser = (username, password) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.post(`${getUserEndpoint}`, {
      username,
      password,
    });
    dispatch({ type: "users/loginUser", payload: data.login });
    localStorage.setItem("userInfo", JSON.stringify(data.login));
    localStorage.setItem("allowLogin", true);
  } catch (err) {
    localStorage.setItem("userInfo", err);
    localStorage.setItem("allowLogin", false);
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
};

export const getQRUser = (username, password, userid) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username, password)
    const { data } = await axios.post(`${getQRUserEndpoint}`, {
      username,
      password,
    });
    dispatch({ type: "users/getQr", payload: data.qrcode });
    localStorage.setItem("userQR", JSON.stringify(data.qrcode));
  } catch (err) {
    localStorage.setItem("userQR", err?.response?.data.error);
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
};

// Generate instance in Waapi to connect this app with whatsapp to send and receiot messages
export const addInstance = () => async (dispatch) => {
  try {
    var data = {};
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization:
          "Bearer AoGFVf56BAaI3ROzBuByrqpwjvyKI1BFgdgtjm1Adaeb1b81",
      },
    };

    fetch("https://waapi.app/api/v1/instances", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        data = response;
      })
      .catch((err) => console.error(err));
    /* 
      const headoptions = {
        accept: 'application/json',
        authorization: 'Bearer AoGFVf56BAaI3ROzBuByrqpwjvyKI1BFgdgtjm1Adaeb1b81'
      }
      // console.log(username, password)
      const { data } = await axios.post('https://waapi.app/api/v1/instances', {
        headers: headoptions
      });
     */
    dispatch({ type: "users/instanceAdd", payload: data });
    localStorage.setItem("userQR", JSON.stringify(data));
  } catch (err) {
    localStorage.setItem("userQR", err?.response?.data.error);
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allUsersEndpoint}`);
    // console.log("ejecutando action getallusers", data)
    dispatch({ type: "users/allUsers", payload: data });
    // localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingUsers", true);
  } catch (err) {
    localStorage.setItem("gettingUsers", false);
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data.message
        : err?.message
    );
  }
};

export const userUpdate = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updUserssEndpoint}`, { user });
    dispatch({ type: "users/updateUser", payload: data.user });
    localStorage.setItem("contactUpdated", true);
  } catch (err) {
    localStorage.setItem("contactUpdated", err?.response.data.message);
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data?.message
        : err?.message
    );
  }
};

export const userUpdateAdm = (user) => async (dispatch) => {
  try {
    console.log("modioficar useradmin");
    const { data } = await axios.put(`${updadmUserssEndpoint}`, { user });
    dispatch({ type: "users/updateUserAdm", payload: data.user });
    console.log("dadadad", data);
    localStorage.setItem("contactUpdated", true);
  } catch (err) {
    localStorage.setItem("contactUpdated", err?.response.data.message);
    console.log(
      err?.response && err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message
    );
  }
};

export const userDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${delUsersEndpoint}${id}`);
    dispatch({ type: "users/deleteUser", payload: id });
    localStorage.setItem("contactDeleted", true);
  } catch (err) {
    localStorage.setItem("contactDeleted", err?.response?.data.message);
    console.log(
      err.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await dispatch({ type: "users/logoutUser", payload: {} });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("allowLogin");
    localStorage.removeItem("userAdded");
    localStorage.removeItem("userConfig");
    localStorage.removeItem("appConfig");
    /*     localStorage.removeItem("userInfo");
        localStorage.removeItem("userUpdated")
        localStorage.removeItem("allowLogin")
        // Carteles de categoria admin
        localStorage.removeItem("categoryDeleted")
        localStorage.removeItem("categoryAdded")
        localStorage.removeItem("categoryUpdated")
        // Carteles de productadmin
        localStorage.removeItem("productDeleted")
        localStorage.removeItem("productAdded")
        localStorage.removeItem("productUpdated")
        // Configuración 
        localStorage.removeItem("configUpdated")
        localStorage.removeItem("userConfig")
        localStorage.removeItem("appConfig")
        // Carteles de marca admin
        localStorage.removeItem("brandDeleted")
        localStorage.removeItem("brandAdded")
        localStorage.removeItem("brandUpdated") */

    await dispatch({ type: "groups/logoutGroups", payload: [] });
    await dispatch({ type: "config/logoutConfig", payload: {} });
    await dispatch({ type: "users/logoutUsers", payload: [] });
    await dispatch({ type: "contacts/logoutContacts", payload: [] });
    await dispatch({ type: "messages/logoutMessages", payload: [] });
    await dispatch({ type: "receipts/logoutReceipts", payload: [] });
    await dispatch({ type: "families/logoutFamilies", payload: [] });
    await dispatch({ type: "company/logoutCompany", payload: [] });
    console.log("saliendo");
  } catch (err) {
    console.log(err);
  }
};

/* export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${REACT_APP_API}users/update`, { user }, {
      headers: {
        // 'Authorization': `x-access-token ${user.token}`
        "x-access-token": user.token,
      }
    });

    dispatch({ type: "PUT_USER_DETAIL", payload: data.user });
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    localStorage.setItem("userUpdated", true)
  } catch (err) {
    localStorage.setItem("userUpdated", err?.response.data.message)
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
}; */

/* export const updateConfigs = (config, token) => async (dispatch) => {
  // dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) 
  try {
    // console.log(username,password)
    const { data } = await axios.put(`${REACT_APP_API}configs`, config, {
      headers: {
        // 'Authorization': `x-access-token ${user.token}`
        "x-access-token": token,
      }
    });
    dispatch({ type: "PUT_CONFIG_DETAIL", payload: data.config });
    localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("configUpdated", true)
  } catch (err) {
    localStorage.setItem("configUpdated", err?.response.data.message)
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
}; */

/* export const getConfig = (id) => async (dispatch) => {
  // dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } })
  try {
    // console.log(username,password)
    // console.log(`${configByIdEndpoint}${id}`)
    const { data } = await axios.get(`${configByIdEndpoint}${id}`);
    dispatch({ type: "GET_CONFIG_DETAIL", payload: data.config });
    localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("userConfig", true);
  } catch (err) {
    localStorage.setItem("userConfig", err?.response.data.message);
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
}; */

/* export const getAllUsers = (token) => async (dispatch) => {
  try {
    console.log("Token",token)
    const { data } = await axios.get(`${REACT_APP_API}users`, {
      headers: {
        // 'Authorization': `x-access-token ${user.token}` 
        "x-access-token": token,
      }
    });
    console.log("ejecutando action getallusers",data)
    dispatch({ type: "GET_USERS_ADMIN", payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingUsers", true)
  } catch (err) {
    localStorage.setItem("gettingUsers", err?.response.data.message)
    console.log(
      err?.response && err?.response.data.message
        ? err?.response.data.message
        : err.message
    );
  }
} */
