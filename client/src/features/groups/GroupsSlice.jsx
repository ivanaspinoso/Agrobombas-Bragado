import { createSlice } from "@reduxjs/toolkit";

const initialGroups = {
  loading: 'idle',
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState: initialGroups,
  reducers: {
    showgroups: (state) => state,
    allgroups: (state, action) => {
      state.groups = action.payload
    },
    addgroup: (state, action) => {
      state.groups.push(action.payload);
    },
    updategroup: (state, action) => {
      const { id, name, code } = action.payload;
      const isgroupExist = state.groups.filter((group) => group.id === id);

      if (isgroupExist) {
        isgroupExist[0].name = name;
        isgroupExist[0].code = code;
      }
    },
    deletegroup: (state, action) => {
      const id = action.payload;
      state.groups = state.groups.filter((group) => group.id !== id);
    },
       
    logoutGroups: (state, action) => {
      state.groups = action.payload
    },
  },
});

export const { showgroups, addgroup, updategroup, deletegroup, allgroups, logoutGroups } =
groupsSlice.actions;

export default groupsSlice.reducer;