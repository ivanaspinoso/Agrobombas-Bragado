import axios from "axios";
import { allGroupsEndpoint, addGroupsEndpoint, delGroupsEndpoint, updGroupsEndpoint, userGroupsEndpoint } from "../consts/consts";
import { allgroups, addgroup, deletegroup, updategroup } from "../../features/groups/GroupsSlice";

export const getAllCategories = () => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${allGroupsEndpoint}`);
      dispatch({ type: "groups/allgroups", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data.login));
    } catch (err) {
      alert(
        err?.response && err?.response.data.message
          ? err?.response.data.message
          : err.message
      );
    }
  };

  export const getUserCategories = (id) => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${userGroupsEndpoint}` + id);
      dispatch({ type: "groups/allgroups", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data.login));
    } catch (err) {
      alert(
        err?.response && err?.response.data.message
          ? err?.response.data.message
          : err.message
      );
    }
  };

  export const cateAdd = (category) => async (dispatch) => {
    console.log("agregando",category);
    try {
      const { data } = await axios.post(`${addGroupsEndpoint}`, category);
      dispatch({ type: "groups/addgroup", payload: data });
      localStorage.setItem("categoryAdded",true)
    } catch (err) {
      localStorage.setItem("categoryAdded",err.response.data.message)
      console.log(
        err?.response && err?.response.data.message
          ? err?.response.data.message
          : err.message
      );
    }
  };

  export const getCateAdmin = (id) => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
  /*     console.log(`${REACT_APP_API}/products/` + id); */
      const { data } = await axios.get(`${allGroupsEndpoint}` + id);
/*       console.log(data) */
      dispatch({ type: "groups/allgroups", payload: data });
    } catch (err) {
      console.log(
        err?.response && err?.response.data.message
          ? err?.response.data.message
          : err.message
      );
    }
  };

  export function deleteCategory(id) {
    return (dispatch) => {
      return axios.delete(`${delGroupsEndpoint}${id}`).then((json) => {
        dispatch({ type: "groups/deletegroup", payload: id });
        localStorage.setItem("categoryDeleted",true)
      }).catch(err => {
        localStorage.setItem("categoryDeleted",err.response.data.message)
        console.log(
          err?.response && err?.response.data.message
            ? err?.response.data.message
            : err.message
        )        
      });
    };
  }

  export const updateCategory = (cate) => async (dispatch) => {
    /* console.log(cate) */
    try {
        const { data } = await axios.put(`${updGroupsEndpoint}`, cate);
        dispatch({ type: "groups/updategroup", payload: data });
        localStorage.setItem("categoryUpdated",true)
      }
      catch(err) {
        localStorage.setItem("categoryUpdated",err.response.data.message)
        console.log(
          err?.response && err?.response.data.message
            ? err?.response.data.message
            : err.message
        )        
    };
  }
