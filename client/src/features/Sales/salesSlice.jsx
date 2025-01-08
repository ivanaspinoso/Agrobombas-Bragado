import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allSalesEndpoint, addSalesEndpoint, updateSalesEndpoint, deleteSalesEndpoint } from "../../app/consts/consts";

const initialSalesState = {
  sales: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState: initialSalesState,
  reducers: {
    allSales: (state, action) => {
      state.sales = action.payload;
    },
    addSale: (state, action) => {
      console.log("Nueva venta agregada:", action.payload);
      state.sales.push(action.payload);
    },
    updateSale: (state, action) => {
      const updatedSale = action.payload;
      const index = state.sales.findIndex(sale => sale.id === updatedSale.id);
      if (index >= 0) state.sales[index] = updatedSale;
    },
    deleteSale: (state, action) => {
      state.sales = state.sales.filter(sale => sale.id !== action.payload);
    },
  },
});

export const { allSales, addSale, updateSale, deleteSale } = salesSlice.actions;
export default salesSlice.reducer;

// 🔹 Obtener todas las ventas
export const fetchAllSales = () => async (dispatch) => {
  try {
    const { data } = await axios.get(allSalesEndpoint);
    console.log("Ventas obtenidas:", data);
    dispatch(allSales(data));
  } catch (error) {
    console.error("Error al obtener ventas:", error);
  }
};

// 🔹 Agregar una nueva venta
// export const addNewSale = (sale) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(addSalesEndpoint, sale);
//     dispatch(addSale(data));
//     dispatch(fetchAllSales());  // Refrescar lista
//   } catch (error) {
//     console.error("Error al agregar venta:", error);
//   }
// };

// // 🔹 Actualizar una venta
// export const updateSaleById = (sale) => async (dispatch) => {
//   try {
//     console.log("Datos enviados en la actualización de venta:", sale);
//     const { data } = await axios.put(`${updateSalesEndpoint}${sale.id}`, sale);
//     dispatch(updateSale(data));
//     dispatch(fetchAllSales());  // Refrescar lista
//   } catch (error) {
//     console.error("Error al actualizar venta:", error.response?.data || error.message);
//     throw error;
//   }
// };

// // 🔹 Eliminar una venta
//  export const deleteSaleById = (id) => async (dispatch) => {
//    try {
//      await axios.delete(`${deleteSalesEndpoint}${id}`);
//      dispatch(deleteSale(id));
//    } catch (error) {
//      console.error("Error al eliminar venta:", error);
//    }
//  };
