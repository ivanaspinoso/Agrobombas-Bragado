import { createSlice } from "@reduxjs/toolkit";

const initialUsers = {
  loading: 'idle',
  users: [],
  login: {}
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {
    showUsers: (state) => state,
    allUser: (state, action) => {
      state.users = action.payload
    },
    loginUser: (state, action) => {
      state.login = action.payload
    },
    logoutUser: (state, action) => {
      state.login = {}
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email, cellphone, username, password, address, city, zip, province,  country, active, blocked} = action.payload;
      const isUserExist = state.users.filter((user) => user.id === id);

      if (isUserExist) {
        isUserExist[0].name = name;
        isUserExist[0].cellphone = cellphone;
        isUserExist[0].username = username;
        isUserExist[0].password = password;
        isUserExist[0].email = email;
        isUserExist[0].address = address;
        isUserExist[0].city = city;
        isUserExist[0].zip = zip;
        isUserExist[0].province = province;
        isUserExist[0].country = country;
        isUserExist[0].active = active;
        isUserExist[0].blocked = blocked;
      }
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      state.userss = state.userss.filter((user) => user.id !== id);
    },
  },
});

export const { showUsers, addUser, updateUser, deleteUser, allUsers, loginUser, logoutUser } =
usersSlice.actions;

export default usersSlice.reducer;