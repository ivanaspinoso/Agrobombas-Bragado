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
      const { id, category, description } = action.payload;
      const isgroupExist = state.groups.filter((group) => group.id === id);

      if (isgroupExist) {
        isgroupExist[0].category = category;
        isgroupExist[0].description = description;
      }
    },
    deletegroup: (state, action) => {
      const id = action.payload;
      state.groups = state.groups.filter((group) => group.id !== id);
    },
  },
});

export const { showgroups, addgroup, updategroup, deletegroup, allgroups } =
groupsSlice.actions;

export default groupsSlice.reducer;