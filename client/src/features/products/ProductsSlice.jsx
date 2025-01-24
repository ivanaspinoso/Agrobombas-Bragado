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
      const { id, name, description,price,cost ,percent,price1, stock, families,price2,article,prov_code,iva21,updatedAt} = action.payload;
      const productToUpdate = state.products.find((product) => product.id === id);
      if (productToUpdate) {
        productToUpdate.name = name;
        productToUpdate.description = description;
        productToUpdate.cost = cost;
        productToUpdate.percent = percent;
        productToUpdate.price = price;
        productToUpdate.price1 = price1;
        productToUpdate.price2 = price2;
        productToUpdate.stock = stock;
        productToUpdate.families = families;
        productToUpdate.article = article;
        productToUpdate.prov_code=prov_code;
        productToUpdate.iva21=iva21;
        productToUpdate.updatedAt=updatedAt
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

export const { updateProduct, deleteProduct, addProduct, logoutProducts } = productsSlice.actions;
 
export default productsSlice.reducer;
