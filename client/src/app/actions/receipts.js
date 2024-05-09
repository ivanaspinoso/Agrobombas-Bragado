import axios from "axios";
import { allReceipts } from "../../features/receipts/receiptsSlice";
import { userReceiptsEndpoint } from "../consts/consts";


export const getUserReceipts = (id) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${userReceiptsEndpoint}` + id);
      console.log("ejecutando action obtener recibidos", data)
      dispatch({ type: allReceipts, payload: data });
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
  