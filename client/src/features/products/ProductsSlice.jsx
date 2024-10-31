import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { allProductsEndpoint, updateProductsEndpoint, deleteProductsEndpoint,addProductsEndpoint } from "../../app/consts/consts";

const initialProductsState = {
  loading: 'idle',
  products: [],
};

const ProductsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
        state.products.push(action.payload);
      },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(prod => prod.id === updatedProduct.id);
      if (index >= 0) state.products[index] = updatedProduct;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(prod => prod.id !== action.payload);
    },
  },
});

export const { setProducts, updateProduct, deleteProduct,addProduct } = ProductsSlice.actions;

// Thunks
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${allProductsEndpoint}`);
    dispatch(setProducts(data));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const createProduct = (product) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${addProductsEndpoint}`, product);
      dispatch(addProduct(data));
      localStorage.setItem("productAdded", true); // Para manejar el éxito
    } catch (error) {
      localStorage.setItem("productAdded", JSON.stringify(error.response?.data?.message || error.message));
      console.error("Error creating product:", error);
    }
  };

export const updateProductDetails = (product) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${updateProductsEndpoint}` + product.id, product);
    dispatch(updateProduct(data));
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const deleteProductById = (id) => async (dispatch) => {
  try {
    await axios.delete(`${deleteProductsEndpoint}` + id);
    dispatch(deleteProduct(id));
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


export default ProductsSlice.reducer;
