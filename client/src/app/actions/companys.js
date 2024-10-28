import axios from "axios";
import {
  allConfigsEndpoint,
  updConfigsEndpoint,
  addConfigsEndpoint,
  usrConfigsEndpoint,
  getCompanysEndpoint,
} from "../consts/consts";
import {
  allConfig,
  updateConfig,
  addConfig,
} from "../../features/company/CompanysSlice";

export const companyAdd = (configNew) => async (dispatch) => {
  // console.log("agregando", configNew);
  try {
    const { data } = await axios.post(`${addConfigsEndpoint}`, configNew);
    console.log(data);
    dispatch({ type: "config/addConfig", payload: data });
    localStorage.setItem("configAdded", true);
  } catch (err) {
    localStorage.setItem("configAdded", err?.response?.data.message);
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};

export const companyUpdate = (config) => async (dispatch) => {
  console.log(updConfigsEndpoint);
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.put(`${updConfigsEndpoint}`, config);
    dispatch({ type: "config/updateConfig", payload: data.config });
    console.log("A ver", data.config);
    localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("configUpdated", true);
  } catch (err) {
    localStorage.setItem(
      "configUpdated",
      false /* err?.response?.data.message */
    );
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};

export const getCompany = (id) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    console.log("entré")
    const { data } = await axios.get(`${getCompanysEndpoint}` + id);
    dispatch({ type: "company/allCompany", payload: data.company });
    // localStorage.setItem("Company", JSON.stringify(data.compsny));
    localStorage.setItem("getCompany", true);
  } catch (err) {
    localStorage.setItem("getCompany", err?.response?.data.message);
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};

export const getConfigbyUser = (id) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    // console.log(`${configByIdEndpoint}${id}`)
    const { data } = await axios.get(`${usrConfigsEndpoint}` + id);
    console.log(data)
    dispatch({ type: "config/allConfig", payload: data });
    localStorage.setItem("appConfig", JSON.stringify(data));
    localStorage.setItem("userConfig", true);
  } catch (err) {
    localStorage.setItem("userConfig", err?.response?.data.message);
    console.log(
      err?.response && err?.response?.data.message
        ? err?.response?.data.message
        : err.message
    );
  }
};
