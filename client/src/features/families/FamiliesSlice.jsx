// src/features/families/familiesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert2';

const initialFamilies = {
  loading: 'idle',
  families: [],
};

export const familiesSlice = createSlice({
  name: "families",
  initialState: initialFamilies,
  reducers: {
    allFamilies: (state, action) => {
      state.families = action.payload;
    },
    addFamily: (state, action) => {
      state.families.push(action.payload);
    },
    updateFamily: (state, action) => {
      const { id, name, description } = action.payload;
      const familyToUpdate = state.families.find((family) => family.id === id);
      if (familyToUpdate) {
        familyToUpdate.name = name;
        familyToUpdate.description = description;
      }
    },
    deleteFamilySuccess: (state, action) => {
      state.families = state.families.filter(family => family.id !== action.payload);
    },
    logoutFamilies: (state, action) => {
      state.families = action.payload
    }
  },
});

export const { allFamilies, addFamily, updateFamily, deleteFamilySuccess } = familiesSlice.actions;

export const deleteFamily = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://backend.sib-2000.com.ar/agb/families/delete/${id}`);
    dispatch(deleteFamilySuccess(id));
    localStorage.setItem("familyDeleted", "true");
  } catch (err) {
    localStorage.setItem("familyDeleted", "false");
    console.error("Error al eliminar familia:", err?.response?.data?.message || err.message);
    swal.fire("Error!", err?.response?.data?.message || err.message, "error");
  }
};
export default familiesSlice.reducer; 
