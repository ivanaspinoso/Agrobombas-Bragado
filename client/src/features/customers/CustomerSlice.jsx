import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
allCustomersEndpoint,
  updateCustomerEndpoint,
  deleteCustomerEndpoint,
  addCustomerEndpoint, // Agrega este endpoint si no lo has definido aún
} from "../../app/consts/consts";
import swal from 'sweetalert2';

const initialCustomers = {
  loading: "idle",
  customers: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomers,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    allCustomers: (state, action) => {
      state.customers = action.payload;
    },
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const { id, name, postal_code,phone,address,city,cuit,web, birthday } = action.payload;
      const customerToUpdate = state.customers.find((customer) => customer.id === id);
      if (customerToUpdate) {
        customerToUpdate.name = name;
        customerToUpdate.postal_code = postal_code;
        customerToUpdate.phone = phone;
        customerToUpdate.address = address;
        customerToUpdate.city = city;
        customerToUpdate.cuit = cuit;
        customerToUpdate.web = web;
        customerToUpdate.birthday = birthday
      }
    },
    deleteCustomer: (state, action) => {
      const id = action.payload;
      state.customers = state.customers.filter((customer) => customer.id !== id);
    },
    logoutCustomers: (state, action) => {
      state.customers = action.payload
    },
  },
});

// Acciones
export const { setCustomers, addCustomer, updateCustomer, deleteCustomer, logoutCustomers, allCustomers } = customersSlice.actions;

// Función asíncrona para obtener todos los clientes
export const fetchCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(allCustomersEndpoint);
    dispatch(setCustomers(data));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

// Función asíncrona para agregar un cliente
export const addNewCustomer = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.post(addCustomerEndpoint, customer);
    dispatch(addCustomer(data));
    localStorage.setItem("customerAdded",JSON.stringify(true));
  } catch (err) {
    localStorage.setItem("customerAdded", JSON.stringify(err?.response?.data?.message));
    console.error("Error adding customer:", err);
  }
};

// Función asíncrona para actualizar un cliente
export const updateCustomerDetails = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updateCustomerEndpoint}`, customer);
    dispatch(updateCustomer(data));
    localStorage.setItem("customerUpdated",JSON.stringify(true));
  } catch (err) {
    localStorage.setItem("customerUpdated", JSON.stringify(err?.response?.data?.message));
    console.error("Error updating customer:", err);
  }
};


export const customersDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${deleteCustomerEndpoint}${id}`);
    dispatch(deleteCustomer(id)); // Actualiza el estado de Redux
    localStorage.setItem("customerDeleted",JSON.stringify(true));
  } catch (err) {
    localStorage.setItem("customerDeleted", JSON.stringify(err?.response?.data?.message));
    console.error("Error al eliminar familia:", err?.response?.data?.message || err.message);
  }
};

// Obtener todas las clientes
export const getAllCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(allCustomersEndpoint);
    dispatch(setCustomers(data));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }

/*   try {
    console.log("action get",allCustomersEndpoint)
    const { data } = await axios.get(`${allCustomersEndpoint}`);
    dispatch({ type: "customers/allCustomers", payload: data });
 */    // dispatch(allFamilies(data)); // Esto despacha la lista de familias al estado global
/*     console.table(data)
    localStorage.setItem("gettingCustomers", true);
  } catch (err) {
    localStorage.setItem("gettingCustomers", false);
    console.error("Error al obtener familias:", err?.response?.data?.message || err.message);
  }
 */};


export default customersSlice.reducer;
