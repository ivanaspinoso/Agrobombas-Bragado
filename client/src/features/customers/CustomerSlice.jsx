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
export const { setCustomers, addCustomer, updateCustomer, deleteCustomer, logoutCustomers } = customersSlice.actions;

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
  } catch (error) {
    console.error("Error adding customer:", error);
  }
};

// Función asíncrona para actualizar un cliente
export const updateCustomerDetails = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updateCustomerEndpoint}${customer.id}`, customer);
    dispatch(updateCustomer(data));
    return { success: true };
  } catch (error) {
    console.error("Error updating customer:", error);
    return { success: false, error: error.message };
  }
};


export const customersDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`${deleteCustomerEndpoint}${id}`);
    dispatch(deleteCustomer(id)); // Actualiza el estado de Redux
    localStorage.setItem("customersDeleted", true);
  } catch (err) {
    localStorage.setItem("customersDeleted", false);
    console.error("Error al eliminar familia:", err?.response?.data?.message || err.message);
    // Puedes mostrar una alerta con el error
    swal.fire("Error!", err?.response?.data?.message || err.message, "error");
  }
};


export default customersSlice.reducer;
