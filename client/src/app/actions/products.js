import axios from "axios";
import { allProductsEndpoint, updateProductsEndpoint, deleteProductsEndpoint, addProductsEndpoint, allProductsWebEndpoint, updateCostsEndpoint } from "../../app/consts/consts";
import { deleteProduct, addProduct, updateProduct } from "../../features/products/ProductsSlice";

export const getAllProducts = () => async (dispatch) => {
    try {
        console.log("action get productos", allProductsEndpoint)
        const { data } = await axios.get(`${allProductsEndpoint}`);
        dispatch({ type: "products/allProducts", payload: data });
        console.table(data)
        localStorage.setItem("gettingProducts", true);
    } catch (err) {
        localStorage.setItem("gettingProducts", false);
        console.error("Error al obtener productos:", err?.response?.data?.message || err.message);
    }
};

export const getAllProductsWeb = () => async (dispatch) => {
    try {
        console.log("action get productos", allProductsWebEndpoint)
        const { data } = await axios.get(`${allProductsWebEndpoint}`);
        dispatch({ type: "products/allProductsWeb", payload: data });
        console.table(data)
        localStorage.setItem("gettingProductsWeb", true);
    } catch (err) {
        localStorage.setItem("gettingProductsWeb", false);
        console.error("Error al obtener productos:", err?.response?.data?.message || err.message);
    }
};


export const productAdd = (product) => async (dispatch) => {
    try {
        console.log("action add productos", addProductsEndpoint)
        const { data }  = await axios.post(addProductsEndpoint, product);
        console.log(data)
        dispatch(addProduct(data));
        localStorage.setItem("productAdded", JSON.stringify(true));
    } catch (error) {
        localStorage.setItem("productAdded", JSON.stringify(error?.response?.data?.message /* false */));
        console.error("Error al crear el producto:", error?.response?.data?.message || error.message);
    }
};

export const productUpdate = (product) => async (dispatch) => {
    try {
        console.log("entrando a productudate")
        const { data } = await axios.put(`${updateProductsEndpoint}`, product);
        dispatch(updateProduct(data));
        localStorage.setItem("productUpdated", JSON.stringify(true));
    } catch (error) {
        localStorage.setItem("productUpdated", JSON.stringify(error?.response?.data?.message /* false */));
        console.error("Error updating product:", error);
    }
};

export const deleteProductById = (id) => async (dispatch) => {
    try {
        await axios.delete(`${deleteProductsEndpoint}${id}`);
        dispatch(deleteProduct(id)); 
        localStorage.setItem("productDeleted", JSON.stringify(true));
    } catch (error) {
        localStorage.setItem("productDeleted", JSON.stringify(error?.response?.data?.message /* false */));
        console.error("Error al eliminar el producto:", error.message);
    }
};

export const updateProductsCosts = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(updateCostsEndpoint, data);
            if (response.data.updated) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error updating costs:', error);
            return false;
        }
    };
};







// 👇 por ahora lo dejo pero no lo veo siguiendo los lineamientos principales 👇
// y por el momento, no funcionan

// Thunks
/* export const fetchProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${allProductsEndpoint}`);

        dispatch(setProducts(data)); 👈 Así recolecta los datos, pero no pone la action en la redux devtool



        
                                    👇action en slicereducer
        dispatch({ type: "products/addProduct", payload: data}); 👈 de esta forma recolecta los datos, y coloca la action en la redux devtool, con lo cual podemos hacer seguimiento
                          👆carpeta del slicereducer




    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

export const createProduct = (product) => async (dispatch) => {
    try {
        const response = await axios.post(`${addProductsEndpoint}`, product);

        dispatch(addProduct(response.data));

        localStorage.setItem("productAdded", JSON.stringify(true));
    } catch (error) {
        localStorage.setItem("productAdded", JSON.stringify(false));
        console.error("Error al crear el producto:", error.message);
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
*/