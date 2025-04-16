// Reducer para Caja
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { allBuysEndpoint, addBuysEndpoint, updBuysEndpoint, delBuysEndpoint, salBuysEndpoint,byidBuyEndpoint, fewsBuyEndpoint } from "../../app/consts/consts";

const initialbuyState = {
  loading: 'idle',
  buys: [],
};

const buySlice = createSlice({
  name: "buys",
  initialState: initialbuyState,
  reducers: {
    allbuys: (state, action) => {
      state.buys = action.payload;
    },
    addbuy: (state, action) => {
      console.log("Nuevo movimiento:", action.payload);
      state.buys.push(action.payload);
    },
    updatebuy: (state, action) => {
      const updatedbuy = action.payload;
      const index = state.buys.findIndex(cf => cf.id === updatedbuy.id);
      if (index >= 0) state.buys[index] = updatedbuy;
    },
    deletebuy: (state, action) => {
      state.buys = state.buys.filter(cf => cf.id !== action.payload);
    },
    deletebuys: (state, action) => {
      state.buys = action.payload // state.buys.filter(cf => cf.id !== action.payload);
    },
    logoutbuys: (state, action) => {
      state.buys = action.payload
    },
    getSaldo: (state, action) =>{
      state.saldo = action.payload;
    },
    logOutSaldo: (state, action) =>{
      state.saldo = action.payload;
    }, 
  },
});

export const { allbuys, addbuy, updatebuy, deletebuy, getSaldo, logOutSaldo, deletebuys } = buySlice.actions;
export default buySlice.reducer;

export const fetchAllbuys = () => async (dispatch) => {
  try {
    const { data } = await axios.get(allBuysEndpoint);
    console.log("Datos obtenidos en fetchAllbuys:", data);
    dispatch(allbuys(data));
  } catch (error) {
    console.error("Error al obtener movimientos de caja:", error);
  }
};

export const addNewbuy = (buy) => async (dispatch) => {
  try {
    const { data } = await axios.post(addBuysEndpoint, buy);
    dispatch(addbuy(data));
    dispatch(fetchAllbuys());

    localStorage.setItem("buyAdded", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("buyAdded", JSON.stringify(error?.response?.data?.message));
    console.error("Error al agregar movimiento de caja:", error);
  }
};

export const updatebuyById = (buy) => async (dispatch) => {
  try {
    console.log("Datos enviados en la petición PUT:", buy);
    const { data } = await axios.put(updBuysEndpoint, buy);
    dispatch(updatebuy(data));
    dispatch(fetchAllbuys());
    localStorage.setItem("buyUpdated", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("buyUpdated", JSON.stringify(error?.response?.data?.message));
    console.error("Error al actualizar movimiento de caja:", error.response?.data || error.message);
    throw error;
  }
};


export const deletebuyById = (id) => async (dispatch) => {
  try {
    await axios.delete(delBuysEndpoint + id);
    dispatch(deletebuy(id));
    localStorage.setItem("buyDeleted", JSON.stringify(true));
  } catch (error) {
      localStorage.setItem("buyDeleted", JSON.stringify(error?.response?.data?.message));
    console.error("Error al eliminar movimiento de caja:", error);
  }
};

export const deletebuyFews = (ids) => async (dispatch) => {
  try {
    console.log("Intentando borrar IDs:", ids);

    const response = await axios.delete(fewsBuyEndpoint, {
      data: ids
    });

    console.log("Respuesta del servidor:", response.data);

    if (response.status === 200) {
      await dispatch(fetchAllbuys());
      
      const updatedBuys = await axios.get(allBuysEndpoint);
      const deletedIdsStillPresent = ids.ids.filter(id => 
        updatedBuys.data.some(buy => buy.id === id)
      );

      if (deletedIdsStillPresent.length > 0) {
        console.error("Algunos IDs no fueron borrados:", deletedIdsStillPresent);
        localStorage.setItem("buysDeleted", JSON.stringify(false));
        return false;
      }

      localStorage.setItem("buysDeleted", JSON.stringify(true));
      console.log("Borrado masivo completado exitosamente");
      return true;
    }
  } catch (error) {
    console.error("Error en deletebuyFews:", error.response?.data || error);
    localStorage.setItem("buysDeleted", JSON.stringify(error?.response?.data?.message));
    return false;
  }
};


export const getBuyById = (id) => async () => {
  try {
    const { data } = await axios.get(byidBuyEndpoint + id);
    return data;
  } catch (error) {
    console.error("Error al obtener compra por ID:", error);
    throw error;
  }
};