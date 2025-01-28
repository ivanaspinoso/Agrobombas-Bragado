// Reducer para Caja
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { allCashflowEndpoint, addCashflowEndpoint, updCashflowEndpoint, delCashflowEndpoint, salCashflowEndpoint, } from "../../app/consts/consts";

const initialCashFlowState = {
  loading: 'idle',
  cashflows: [],
  saldo: {}
};

const cashflowSlice = createSlice({
  name: "cashflows",
  initialState: initialCashFlowState,
  reducers: {
    allCashflows: (state, action) => {
      state.cashflows = action.payload;
    },
    addCashflow: (state, action) => {
      console.log("Nuevo movimiento:", action.payload);

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
    logoutCashflows: (state, action) => {
      state.cashflows = action.payload
    },
    getSaldo: (state, action) =>{
      state.saldo = action.payload;
    },
    logOutSaldo: (state, action) =>{
      state.saldo = action.payload;
    }, 
  },
});

export const { allCashflows, addCashflow, updateCashflow, deleteCashflow, getSaldo, logOutSaldo } = cashflowSlice.actions;
export default cashflowSlice.reducer;

export const fetchAllCashflows = () => async (dispatch) => {
  try {
    const { data } = await axios.get(allCashflowEndpoint);
    console.log("Datos obtenidos en fetchAllCashflows:", data);
    dispatch(allCashflows(data));
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
  }
};

export const obtenerSaldo = () => async (dispatch) => {
  try {
    const { data } = await axios.get(salCashflowEndpoint);
    console.log("Datos obtenidos en saldos:", data);
    dispatch(getSaldo(data));
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
  }
};

export const addNewCashflow = (cashflow) => async (dispatch) => {
  try {
    const { data } = await axios.post(addCashflowEndpoint, cashflow);
    dispatch(addCashflow(data));
    dispatch(fetchAllCashflows());

  } catch (error) {
    console.error("Error al agregar movimiento de caja:", error);
  }
};

export const updateCashflowById = (cashflow) => async (dispatch) => {
  try {
    console.log("Datos enviados en la petición PUT:", cashflow);
    const { data } = await axios.put(updCashflowEndpoint, cashflow);
    dispatch(updateCashflow(data));
    dispatch(fetchAllCashflows());
  } catch (error) {
    console.error("Error al actualizar movimiento de caja:", error.response?.data || error.message);
    throw error;
  }
};


export const deleteCashflowById = (id) => async (dispatch) => {
  try {
    await axios.delete(delCashflowEndpoint + id);
    dispatch(deleteCashflow(id));
  } catch (error) {
    console.error("Error al eliminar movimiento de caja:", error);
  }
};