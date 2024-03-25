import axios from "axios";
import { allConfigsEndpoint, updConfigsEndpoint } from "../consts/consts";
import { allConfig, updateConfig } from "../../features/config/ConfigSlice"; 

export const configUpdate = (config) => async (dispatch) => {
    console.log(updConfigsEndpoint)
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.put(`${updConfigsEndpoint}`, config);
      dispatch({ type: updateConfig, payload: data.config });
      console.log("A ver",data.config)
      localStorage.setItem("appConfig", JSON.stringify(data.config));
      localStorage.setItem("configUpdated", true)
    } catch (err) {
      localStorage.setItem("configUpdated", false /* err.response.data.message */)
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  
  export const getConfig = (id) => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      // console.log(`${configByIdEndpoint}${id}`)
      const { data } = await axios.get(`${allConfigsEndpoint}` + id);
      dispatch({ type: allConfig, payload: data.config });
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
  };