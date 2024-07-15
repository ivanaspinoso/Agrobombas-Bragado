import axios from "axios";
import { allMessagesEndpoint, userMessagesEndpoint, addMessagesEndpoint, resMessagesEndpoint, delMessagesEndpoint, updMessagesEndpoint, queMessagesEndpoint } from "../consts/consts";
import { allmessages, addmessage, deletemessage, updatemessage, allmessqueued } from "../../features/messages/MessagesSlice";

export const getAllMessagess = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allMessagesEndpoint}`);
    // console.log("ejecutando action getallmessages", data)
    dispatch({ type: "messages/allmessages", payload: data });
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
    // console.log("ejecutando action getusermessages", data)
    dispatch({ type: "messages/allmessages", payload: data });
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

export const messageAdd = (messageNew) => async (dispatch) => {
  // console.log("agregando mensaje", messageNew);
  try {
    const { data } = await axios.post(`${addMessagesEndpoint}`, messageNew);
    dispatch({ type: "messages/addmessage", payload: data.mensaje });
    console.log("obtenido al añadir",data.mensaje)
    localStorage.setItem("messAdded", data.mensaje.id)
    console.log("obtenido al añadir",data.mensaje.id,"en added",localStorage.getItem("messAdded"))
  } catch (err) {
    localStorage.setItem("messaAdded", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const resultMessage = (message) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${resMessagesEndpoint}` , message);
    // console.log("ejecutando action getusermessages", data)
    dispatch({ type: "messages/updatemessage", payload: data });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingResultMessages", true)
  } catch (err) {
    localStorage.setItem("gettingResultMessages", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}

export const messageDelete = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${delMessagesEndpoint}` + id);
    // console.log("ejecutando action getusermessages", data)
    dispatch({ type: "messages/deletemessage", payload: id });
    //  localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("gettingResultMessages", true)
  } catch (err) {
    localStorage.setItem("gettingResultMessages", err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
}