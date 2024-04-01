import axios from "axios";
import { allMessagesEndpoint, userMessagesEndpoint, addMessagesEndpoint, delMessagesEndpoint, updMessagesEndpoint } from "../consts/consts";
import { allmessages, addmessage, deletemessage, updatemessage } from "../../features/messages/MessagesSlice";

export const messageAdd = (messageNew) => async (dispatch) => {
    console.log("agregando mensaje", messageNew);
    try {
      const { data } = await axios.post(`${addMessagesEndpoint}`, messageNew);
      dispatch({ type: addmessage, payload: data.mensaje });
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

  export const getAllMessagess = () => async (dispatch) => {
    try {
      const { data } = await axios.get(`${allMessagesEndpoint}`);
      console.log("ejecutando action getallmessages", data)
      dispatch({ type: allmessages, payload: data });
      //  localStorage.setItem("appConfig", JSON.stringify(data.config));
      localStorage.setItem("gettingMessages", true)
    } catch (err) {
      localStorage.setItem("gettingMessages", err.response.data.message)
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
  
  export const getUserMessages = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${userMessagesEndpoint}` + id);
      console.log("ejecutando action getusermessages", data)
      dispatch({ type: allmessages, payload: data });
      //  localStorage.setItem("appConfig", JSON.stringify(data.config));
      localStorage.setItem("gettingUserMessages", true)
    } catch (err) {
      localStorage.setItem("gettingUserMessages", err.response.data.message)
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
  