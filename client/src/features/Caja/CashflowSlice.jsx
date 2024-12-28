// Reducer para Caja
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialCashFlowState = {
  // loading: 'idle',
  cashflows: [],
};

const cashflowSlice = createSlice({
  name: "cashflows",
  initialState: initialCashFlowState,
  reducers: {
    allCashflows: (state, action) => {
      state.cashflows = action.payload;
    },
    addCashflow: (state, action) => {
      state.cashflows.push(action.payload);
    },
    updateCashflow: (state, action) => {
      const updatedCashflow = action.payload;
      const index = state.cashflows.findIndex(cf => cf.id === updatedCashflow.id);
      if (index >= 0) state.cashflows[index] = updatedCashflow;
    },
    deleteCashflow: (state, action) => {
      state.cashflows = state.cashflows.filter(cf => cf.id !== action.payload);
    },
  },
});

export const { allCashflows, addCashflow, updateCashflow, deleteCashflow } = cashflowSlice.actions;
export default cashflowSlice.reducer;

// Acciones para Caja
export const fetchAllCashflows = () => async (dispatch) => {
  try {
    const { data } = await axios.get("https://backend.sib-2000.com.ar/agb/cashflows/");
    console.log("Datos obtenidos en fetchAllCashflows:", data); // Depuración
    dispatch(allCashflows(data));
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
  }
};


export const addNewCashflow = (cashflow) => async (dispatch) => {
  try {
    const { data } = await axios.post("https://backend.sib-2000.com.ar/agb/cashflows/add", cashflow);
    dispatch(addCashflow(data));
  } catch (error) {
    console.error("Error al agregar movimiento de caja:", error);
  }
};

export const updateCashflowById = (cashflow) => async (dispatch) => {
  try {
    const { data } = await axios.put("https://backend.sib-2000.com.ar/agb/cashflows/update", cashflow);
    dispatch(updateCashflow(data));
  } catch (error) {
    console.error("Error al actualizar movimiento de caja:", error);
  }
};

export const deleteCashflowById = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://backend.sib-2000.com.ar/agb/cashflows/delete/${id}`);
    dispatch(deleteCashflow(id));
  } catch (error) {
    console.error("Error al eliminar movimiento de caja:", error);
  }
};