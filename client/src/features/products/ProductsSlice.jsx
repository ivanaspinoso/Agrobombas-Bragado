import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  loading: 'idle',
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    allProducts: (state, action) => {
      state.products = action.payload;
    },
    // 👇 no se que hace set products, pero por las dudas no lo borro
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // 👆 no se que hace set products, pero por las dudas no lo borro
    addProduct: (state, action) => {
        state.products.push(action.payload);
      },
    // updateProduct: (state, action) => {
    //   const updatedProduct = action.payload;
    //   const index = state.products.findIndex(prod => prod.id === updatedProduct.id);
    //   if (index >= 0) state.products[index] = updatedProduct;
    // },
    updateProduct: (state, action) => {
      const { id, name, description,price,cost } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === id);
      if (productToUpdate) {
        productToUpdate.name = name;
        productToUpdate.description = description;
        productToUpdate.price = price;
        productToUpdate.cost = cost;

      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(prod => prod.id !== action.payload);
    },
    logoutProducts: (state, action) => {
      state.products = action.payload
    }
  },
});

export const { updateProduct, deleteProduct,addProduct } = productsSlice.actions;
export default productsSlice.reducer;
