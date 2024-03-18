import { createSlice } from "@reduxjs/toolkit";

const initialConfigs = {
  configs: [],
};

export const configsSlice = createSlice({
  name: "config",
  initialState: initialConfigs,
  reducers: {
    showConfig: (state) => state,
    allConfig: (state, action) => {
      state.configs = action.payload
    },
    updateConfig: (state, action) => {
      const { id, business, slogan, messagewauno, messagewados, messagewatres, messagewacuatro, horario, deliveryprice, address,
        zip, city, province, country, longitude, latitude } = action.payload;

      state.configs.business = business;
      state.configs.slogan = slogan;
      state.configs.messagewauno = messagewauno;
      state.configs.messagewados = messagewados;
      state.configs.messagewatres = messagewatres;
      state.configs.messagewacuatro = messagewacuatro;
      state.configs.horario = horario;
      state.configs.deliveryprice = deliveryprice;
      state.configs.address = address;
      state.configs.city = city;
      state.configs.zip = zip;
      state.configs.province = province;
      state.configs.country = country;
      state.configs.longitude = longitude;
      state.configs.latitude = latitude;
    },
  },
});

export const { showConfig, allConfig, updateConfig } = configsSlice.actions;

export default configsSlice.reducer;