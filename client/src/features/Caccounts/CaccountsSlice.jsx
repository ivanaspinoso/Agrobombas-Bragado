// caccountSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_API } from "../../app/consts/consts";
const initialCaccountState = {
  caccounts: [],
};

const caccountSlice = createSlice({
  name: "caccounts",
  initialState: initialCaccountState,
  reducers: {
    allCaccounts: (state, action) => {
        console.log("Despatching allCaccounts with:", action.payload); // Verifica que los datos lleguen correctamente

      state.caccounts = action.payload;
    },
    addCaccount: (state, action) => {
      console.log("Nuevo movimiento de cuenta:", action.payload);
      state.caccounts.push(action.payload);
    },
    updateCaccount: (state, action) => {
      const updatedCaccount = action.payload;
      const index = state.caccounts.findIndex(c => c.id === updatedCaccount.id);
      if (index >= 0) state.caccounts[index] = updatedCaccount;
    },
    deleteCaccount: (state, action) => {
      state.caccounts = state.caccounts.filter(c => c.id !== action.payload);
    },
    logoutCaccounts: (state, action) => {
      state.caccounts = action.payload;
    },
  },
});

export const { allCaccounts, addCaccount, updateCaccount, deleteCaccount } = caccountSlice.actions;
export default caccountSlice.reducer;

// caccountSlice.js

// Obtener todos los movimientos de cuenta para un cliente
export const fetchAllCaccounts = (customerId) => async (dispatch) => {
    try {
      console.log("Fetching accounts for customerId:", customerId); 
      const { data } = await axios.get(`${REACT_APP_API}caccounts/bycustomer/${customerId}`);
      console.log("Datos obtenidos del backend:", data); 
      dispatch(allCaccounts(data.response)); 
    } catch (error) {
      console.error("Error al obtener las cuentas del cliente:", error.message);
    }
  };
  
  
  