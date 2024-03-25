import axios from "axios";
import { getUserEndpoint } from "../consts/consts";
import { loginUser, logoutUser } from "../../features/users/usersSlice";

/* export const userAdd = (userNew) => async (dispatch) => {
  console.log("agregando", userNew);
  try {
    const { data } = await axios.post(`${REACT_APP_API}users/add`, userNew);
    dispatch({ type: "USER_ADDED", payload: data });
    localStorage.setItem("userAdded", true)
  } catch (err) {
    localStorage.setItem("userAdded", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}; */

export const getUser = (username, password) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.post(`${getUserEndpoint}`, {
      username,
      password,
    });
    dispatch({ type: loginUser, payload: data.login });
    localStorage.setItem("userInfo", JSON.stringify(data.login));
    localStorage.setItem("allowLogin", "si")
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};


export const logOut = () => async (dispatch) => {
  try {
    localStorage.removeItem('userInfo')
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
    dispatch({ type: logoutUser, payload: {} });
    console.log("saliendo")
  } catch (err) {
    console.log(err)
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
    localStorage.setItem("userUpdated", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
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
    localStorage.setItem("configUpdated", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
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
    localStorage.setItem("userConfig", err.response.data.message);
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
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
    localStorage.setItem("gettingUsers", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
} */
