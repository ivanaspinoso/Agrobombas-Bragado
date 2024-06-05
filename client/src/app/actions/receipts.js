import axios from "axios";
import { allReceipts, deleteReceipt } from "../../features/receipts/receiptsSlice";
import { delReceiptsEndpoint, userReceiptsEndpoint } from "../consts/consts";


export const getUserReceipts = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${userReceiptsEndpoint}` + id);
      console.log("ejecutando action obtener recibidos", data)
      dispatch({ type: "receipts/allReceipts", payload: data });
      //  localStorage.setItem("appConfig", JSON.stringify(data.config));
      localStorage.setItem("gettingUserReceipts", true)
    } catch (err) {
      localStorage.setItem("gettingUserReceipts", err.response.data.message)
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
  
  export const receiptDelete = (id) => async (dispatch) => {
    try {
      const { data } = await axios.delete(`${delReceiptsEndpoint}` + id);
      // console.log("ejecutando action getusermessages", data)
      dispatch({ type: "receipts/deleteReceipt", payload: id });
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