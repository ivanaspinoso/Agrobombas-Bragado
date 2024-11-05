import axios from "axios";
import {
  allFamiliesEndpoint,
  addFamilyEndpoint,
  updateFamilyEndpoint,
  delFamilyEndpoint,
} from "../consts/consts"; 
import {
  allFamilies,
  addFamily,
  updateFamily,
  deleteFamily,
} from "../../features/families/FamiliesSlice"; 

export const getAllFamilies = () => async (dispatch) => {
  try {
    console.log("action get",allFamiliesEndpoint)
    const { data } = await axios.get(`${allFamiliesEndpoint}`);
    dispatch({ type: "families/allFamilies", payload: data });
    console.table(data)
    localStorage.setItem("gettingFamilies", true);
  } catch (err) {
    localStorage.setItem("gettingFamilies", false);
    console.error("Error al obtener familias:", err?.response?.data?.message || err.message);
  }
};

// Agregar una nueva familia
export const familyAdd = (family) => async (dispatch) => {
  try {
    const { data } = await axios.post(addFamilyEndpoint, family);
    dispatch(addFamily(data)); // Esto agrega la nueva familia al estado global
    localStorage.setItem("familyAdded", true);
  } catch (err) {
    localStorage.setItem("familyAdded", false);
    console.error("Error al agregar familia:", err?.response?.data?.message || err.message);
  }
};

export const familyUpdate = (family) => async (dispatch) => {
  try {
    const { data } = await axios.put(updateFamilyEndpoint, family);
    dispatch(updateFamily(data)); // Esto actualiza la familia en el estado global
    localStorage.setItem("familyUpdated", true);
  } catch (err) {
    localStorage.setItem("familyUpdated", false);
    console.error("Error al actualizar familia:", err?.response?.data?.message || err.message);
  }
};

export const familyDelete = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${delFamilyEndpoint}${id}`);
    console.log('Response from delete:', response.data);
    dispatch(deleteFamily(id));
    localStorage.setItem("familyDeleted", true);
  } catch (err) {
    localStorage.setItem("familyDeleted", false);
    console.error("Error al eliminar familia:", err?.response?.data?.message || err.message);
  }
};


