// caccountSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addCaccountEndpoint,
  cusCaccountEndpoint,
  delCaccountEndpoint,
  salCaccountEndpoint,
  updCaccountEndpoint,
} from "../../app/consts/consts";
const initialCaccountState = {
  caccounts: [],
  saldo: {},
};

const caccountSlice = createSlice({
  name: "caccounts",
  initialState: initialCaccountState,
  reducers: {
    allCaccounts: (state, action) => {
      state.caccounts = action.payload || [];
    },
    addCaccount: (state, action) => {
      console.log("Nuevo movimiento de cuenta:", action.payload);
      state.caccounts.push(action.payload);
    },
    updateCaccount: (state, action) => {
      const updatedCaccount = action.payload;
      const index = state.caccounts.findIndex(
        (c) => c.id === updatedCaccount.id
      );
      if (index >= 0) state.caccounts[index] = updatedCaccount;
    },
    deleteCaccount: (state, action) => {
      state.caccounts = state.caccounts.filter((c) => c.id !== action.payload);
    },
    logoutCaccounts: (state, action) => {
      state.caccounts = action.payload;
    },
    getSaldo: (state, action) => {
      state.saldo = action.payload;
    },
    logOutSaldo: (state, action) => {
      state.saldo = action.payload;
    },
  },
});

export const {
  allCaccounts,
  addCaccount,
  updateCaccount,
  deleteCaccount,
  getSaldo,
  logOutSaldo,
} = caccountSlice.actions;
export default caccountSlice.reducer;

// caccountSlice.js

export const fetchAllCaccounts = (customerId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${cusCaccountEndpoint}${customerId}`);
    dispatch(allCaccounts(data));
  } catch (error) {
    console.error("Error al obtener las cuentas del cliente:", error.message);
  }
};

export const obtenerSaldo = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.get(salCaccountEndpoint+ customer);
    console.log("Datos obtenidos en saldos:", data);
    dispatch(getSaldo(data));
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
  }
};

export const addNewCaccounts = (move) => async (dispatch) => {
  try {
    const { data } = await axios.post(addCaccountEndpoint,move);
    dispatch(addCaccount(data));
    localStorage.setItem("caccountAdded", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("caccountAdded", JSON.stringify(error?.response?.data?.message));
    console.error("Error al obtener las cuentas del cliente:", error.message);
  }
};

export const editCaccounts = (move) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updCaccountEndpoint},${move}`);
    dispatch(addCaccount(data));
    localStorage.setItem("caccountAdded", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("caccountAdded", JSON.stringify(error?.response?.data?.message));
    console.error("Error al obtener las cuentas del cliente:", error.message);
  }
};


export const deleteCaccountById = (id) => async (dispatch) => {
  try {
    await axios.delete(delCaccountEndpoint + id);
    dispatch(deleteCaccount(id));
    localStorage.setItem("caccountDeleted", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("caccountDeleted", JSON.stringify(error?.response?.data?.message));
    console.error("Error al eliminar movimiento de cuenta:", error);
  }
};