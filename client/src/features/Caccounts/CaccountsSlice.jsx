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
           state.caccounts = action.payload || [];
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

export const fetchAllCaccounts = (customerId) => async (dispatch) => {
    try {
      const { data } = await axios.get(`${REACT_APP_API}caccounts/bycustomer/${customerId}`);
      dispatch(allCaccounts(data)); 
    } catch (error) {
      console.error("Error al obtener las cuentas del cliente:", error.message);
    }
  };
  
  
  