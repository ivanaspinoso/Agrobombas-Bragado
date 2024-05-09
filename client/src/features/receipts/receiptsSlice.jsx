import { createSlice } from "@reduxjs/toolkit";

const initialReceipts = {
  loading: 'idle',
  receipts: [],
};

export const receiptsSlice = createSlice({
  name: "receipts",
  initialState: initialReceipts,
  reducers: {
    showReceipts: (state) => state,
    allReceipts: (state, action) => {
      state.receipts = action.payload
    },
    deleteReceipt: (state, action) => {
      const id = action.payload;
      state.receipts = state.receipts.filter((message) => message.id !== id);
    },
    logoutReceipts: (state, action) => {
      state.receipts = action.payload
    },
  },
});

export const { showReceipts, deleteReceipt, allReceipts, logoutReceipts } = receiptsSlice.actions;

export default receiptsSlice.reducer;