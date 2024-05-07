import { createSlice } from "@reduxjs/toolkit";

const initialUsers = {
  loading: 'idle',
  users: [],
  login: {},
  qrCode: ""
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsers,
  reducers: {
    showUsers: (state) => state,
    allUsers: (state, action) => {
      state.users = action.payload
    },
    loginUser: (state, action) => {
      state.login = action.payload
    },
    getQr: (state, action) => {
      state.qrCode = action.payload 
    },
    logoutUser: (state, action) => {
      state.login = action.payload
    },
    logoutUsers: (state, action) => {
      state.users = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    vinculaLogin: (state, action) => {
      const {id} = action.payload;
      const isLoginExist = state.login.filter((login) => login.id === id);

      if (isLoginExist) {
        isLoginExist[0].vinculated = true;
      }
      
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
    updateUserAdm: (state, action) => {
      const { id, /* name, email, cellphone, username, password, address, city, zip, province,  country, active, blocked, */ backwa} = action.payload;
      const isUserExist = state.users.filter((user) => user.id === id);

      if (isUserExist) {
        isUserExist[0].backwa = backwa;
      }
    },

    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const { showUsers, addUser, updateUser, deleteUser, allUsers, loginUser, logoutUser, getQr , logoutUsers, updateUserAdm, vinculaLogin} = usersSlice.actions;

export default usersSlice.reducer;