import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allCustomersEndpoint,updateCustomerEndpoint, deleteCustomerEndpoint } from "../../app/consts/consts";
const initialCustomersState = {
  loading: 'idle',
  customers: [],
};

export const customersSlice = createSlice({
  name: "customers",
  initialState: initialCustomersState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;
      const index = state.customers.findIndex(cust => cust.id === updatedCustomer.id);
      if (index >= 0) state.customers[index] = updatedCustomer;
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(cust => cust.id !== action.payload);
    },
  },
});

export const { setCustomers, updateCustomer, deleteCustomer } = customersSlice.actions;

// Asynchronous Thunks
export const fetchCustomers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allCustomersEndpoint}`);
    dispatch(setCustomers(data));
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

export const updateCustomerDetails = (customer) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updateCustomerEndpoint}` + customer.id, customer);
    dispatch(updateCustomer(data));
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};

export const deleteCustomerById = (id) => async (dispatch) => {
  try {
    await axios.delete(`${deleteCustomerEndpoint}` + id);
    dispatch(deleteCustomer(id));
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};

export default customersSlice.reducer;
