import axios from "axios";
import { allMessagesEndpoint, addMessagesEndpoint, delMessagesEndpoint, updMessagesEndpoint } from "../consts/consts";
import { allmessages, addmessage, deletemessage, updatemessage } from "../../features/messages/MessagesSlice";

export const messageAdd = (messageNew) => async (dispatch) => {
    console.log("agregando", messageNew);
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