import axios from "axios";

import { allCustomersEndpoint,addCustomerEndpoint,updateCustomerEndpoint,deleteCustomerEndpoint } from "../consts/consts";
import { addCustomer, updateCustomerDetails, deleteCustomer } from '../../features/customers/CustomerSlice';

// import { allCustomers,addCustomers,updateCustomers,deleteCustomers } from "../../features/customers/CustomerSlice";

// Obtener todas las familias
export const getAllCustomers = () => async (dispatch) => {
  try {
    console.log("action get",allCustomersEndpoint)
    const { data } = await axios.get(`${allCustomersEndpoint}`);
    dispatch({ type: "families/allCustomers", payload: data });
    // dispatch(allFamilies(data)); // Esto despacha la lista de familias al estado global
    console.table(data)
    localStorage.setItem("gettingFamilies", true);
  } catch (err) {
    localStorage.setItem("gettingFamilies", false);
    console.error("Error al obtener familias:", err?.response?.data?.message || err.message);
  }
};

export const customersAdd = (customer) => async (dispatch) => {
    try {
      const { data } = await axios.post(addCustomerEndpoint, customer);
      if (data) {
        // Save to localStorage if needed
        localStorage.setItem("customersAdd", JSON.stringify(true)); // or whatever response handling is necessary
        dispatch(addCustomer(data));
      } else {
        localStorage.setItem("customersAdd", JSON.stringify(false));
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      localStorage.setItem("customersAdd", JSON.stringify(false));
    }
  };
  

// Actualizar una familia existente
export const customersUpdate = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.put(updateCustomerEndpoint, customer);
    dispatch(updateCustomerDetails(data)); // Esto actualiza la familia en el estado global
    localStorage.setItem("customersUpdated", true);
  } catch (err) {
    localStorage.setItem("customersUpdated", false);
    console.error("Error al actualizar familia:", err?.response?.data?.message || err.message);
  }
};

// Eliminar una familia
export const customersDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${deleteCustomerEndpoint}${id}`);
    dispatch(deleteCustomer(id)); // Esto elimina la familia del estado global
    localStorage.setItem("customersDeleted", true);
  } catch (err) {
    localStorage.setItem("customersDeleted", false);
    console.error("Error al eliminar familia:", err?.response?.data?.message || err.message);
  }
};
