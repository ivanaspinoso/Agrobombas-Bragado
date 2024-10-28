import { createSlice } from "@reduxjs/toolkit";

const initialCompanys = {
  companys: [],
};

export const companysSlice = createSlice({
  name: "company",
  initialState: initialCompanys,
  reducers: {
    showCompanys: (state) => state,
    allCompany: (state, action) => {
      state.companys = action.payload
    },
    addCompany: (state, action) => {
      state.companys.push(action.payload);
    },
    updateCompany: (state, action) => {
      const { id, business, slogan, messagewauno, messagewados, messagewatres, messagewacuatro, horario, deliveryprice, address,
        zip, city, province, country, longitude, latitude } = action.payload;

      state.companys.business = business;
      state.companys.slogan = slogan;
      state.companys.messagewauno = messagewauno;
      state.companys.messagewados = messagewados;
      state.companys.messagewatres = messagewatres;
      state.companys.messagewacuatro = messagewacuatro;
      state.companys.horario = horario;
      state.companys.deliveryprice = deliveryprice;
      state.companys.address = address;
      state.companys.city = city;
      state.companys.zip = zip;
      state.companys.province = province;
      state.companys.country = country;
      state.companys.longitude = longitude;
      state.companys.latitude = latitude;
    },
    logoutCompany: (state, action) => {
      state.companys = action.payload
    }
  },
});

export const { showCompanys, allCompany, updateCompany, logoutCompany, addCompany } = companysSlice.actions;

export default companysSlice.reducer;