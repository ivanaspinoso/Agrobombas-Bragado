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
    // Enviar el producto a la API
    const response = await axios.post(`${addProductsEndpoint}`, product);
    
    // Si la creación es exitosa, agregar el producto al estado local
    dispatch(addProduct(response.data));
    
    localStorage.setItem("productAdded", JSON.stringify(true));
  } catch (error) {
    localStorage.setItem("productAdded", JSON.stringify(false));
    console.error("Error al crear el producto:", error.message);
  }
};




// export const familyAdd = (family) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(addFamilyEndpoint, family);
//     dispatch(addFamily(data)); // Esto agrega la nueva familia al estado global
//     localStorage.setItem("familyAdded", true);
//   } catch (err) {
//     localStorage.setItem("familyAdded", false);
//     console.error("Error al agregar familia:", err?.response?.data?.message || err.message);
//   }
// };

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
