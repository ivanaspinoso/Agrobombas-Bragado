// src/features/families/familiesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from 'sweetalert2';
import { delFamilyEndpoint } from "../../app/consts/consts";
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
  console.log("Intentando eliminar familia con ID:", id);

  try {
    const response = await axios.delete(`${delFamilyEndpoint}/${id}`);
    
    if (response.status === 200) {
      dispatch(deleteFamilySuccess(id));
      localStorage.setItem("familyDeleted", JSON.stringify(true)); 
    }
  } catch (err) {
    const errorMessage = err?.response?.data?.message || "Error desconocido";
    localStorage.setItem("familyDeleted", JSON.stringify(errorMessage));
    console.error("Error al eliminar familia:", errorMessage);
  }
};

export default familiesSlice.reducer; 
