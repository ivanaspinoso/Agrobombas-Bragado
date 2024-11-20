import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
// 👉 por ahora no desactivada: import { createProduct } from "./ProductsSlice";
import { getAllCategories } from "../../app/actions/categories";
import { getAllFamilies } from "../../app/actions/families";
// 👉 por ahora no desactivada: import { fetchProducts } from "./ProductsSlice";
import "../../App.css";
import { productAdd } from "../../app/actions/products";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);

  const providers = useSelector((state) => state.groupsReducer.groups);
  const families = useSelector((state) => state.familiesReducer.families);

  /* 👇 ya fueron obtenidos en main y por eso los tomo en las 2 lineas anteriores 👆
    useEffect(() => {
      dispatch(getAllCategories());
      dispatch(getAllFamilies());
    }, [dispatch]); 
  */

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del producto es requerido"),
    description: Yup.string().optional(),
    stock: Yup.number().required("El stock es requerido").integer("Debe ser un número entero"),
    cost: Yup.number().required("El costo es requerido").positive("Debe ser un número positivo"),
    percent: Yup.number().positive("Debe ser un número positivo"),
    price: Yup.number().required("El precio es requerido").positive("Debe ser un número positivo"),
    iva21: Yup.number().positive("Debe ser un número positivo"),
    iva10: Yup.number().positive("Debe ser un número positivo"),
    price1: Yup.number().positive("Debe ser un número positivo"),
    price2: Yup.number().positive("Debe ser un número positivo"),
    prov_code: Yup.number().required("El proveedor es requerido"),
    families: Yup.array().min(1, "Debe seleccionar al menos una familia de producto"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-6 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Producto
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "", description: "", stock: "", cost: "", percent: "", price: "", iva21: "", iva10: "", price1: "", price2: "", prov_code: "", families: []
        }}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const productData = {
            name: values.name,
            description: values.description,
            stock: values.stock,
            cost: values.cost,
            percent: values.percent,
            price: values.price,
            iva21: values.iva21,
            iva10: values.iva10,
            price1: values.price1,
            price2: values.price2,
            prov_code: values.prov_code,
            families: values.families,
            exist: true,
            isOfert: false,
            show: true,
            userid: login?.id,
          };

//  👉 por ahora no desactivada ya que me manejo con el resultado de la action:        try {
            await dispatch(productAdd(productData));
            // 👉 por ahora no desactivada: await dispatch(fetchProducts());

            const success = JSON.parse(localStorage.getItem("productAdded"));
            console.log("Objeto", success);
            if (success && success === true) {
              Swal.fire({
                title: "Genial!",
                text: "Producto agregado. ¿Desea seguir agregando?",
                icon: "success",
                showDenyButton: true,
                confirmButtonText: 'Sí',
                denyButtonText: 'No',
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm();
                } else {
                  navigate("/show-products");
                }
              });
            } /* /  👉 por ahora no desactivada ya que me manejo con el resultado de la action: catch (error) */ else {
              Swal.fire({
                title: "Error",
                text: "Hubo un problema al agregar el producto.",
                icon: "error",
              });
            }/* /  👉 por ahora no desactivada ya que me manejo con el resultado de la action: finally { */
              setSubmitting(false);
            /* } */
          }}

     
        
      >
        {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto *</label>
              <Field name="name" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción (Opcional)</label>
              <Field name="description" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock *</label>
                <Field name="stock" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
              </div>

              <div>
                <label htmlFor="cost" className="block text-gray-700 text-sm font-bold mb-2">Costo *</label>
                <Field name="cost" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.cost && <p className="text-red-500 text-xs italic">{errors.cost}</p>}
              </div>

              <div>
                <label htmlFor="percent" className="block text-gray-700 text-sm font-bold mb-2">Porcentaje de Ganancia</label>
                <Field name="percent" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.percent && <p className="text-red-500 text-xs italic">{errors.percent}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio *</label>
                <Field name="price" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="iva21" className="block text-gray-700 text-sm font-bold mb-2">IVA 21%</label>
                <Field name="iva21" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.iva21 && <p className="text-red-500 text-xs italic">{errors.iva21}</p>}
              </div>

              <div>
                <label htmlFor="iva10" className="block text-gray-700 text-sm font-bold mb-2">IVA 10.5%</label>
                <Field name="iva10" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.iva10 && <p className="text-red-500 text-xs italic">{errors.iva10}</p>}
              </div>

              <div>
                <label htmlFor="price1" className="block text-gray-700 text-sm font-bold mb-2">Precio Alternativo 1</label>
                <Field name="price1" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.price1 && <p className="text-red-500 text-xs italic">{errors.price1}</p>}
              </div>

              <div>
                <label htmlFor="price2" className="block text-gray-700 text-sm font-bold mb-2">Precio Alternativo 2</label>
                <Field name="price2" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.price2 && <p className="text-red-500 text-xs italic">{errors.price2}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="prov_code" className="block text-gray-700 text-sm font-bold mb-2">Proveedor *</label>
              <select
                name="prov_code"
                value={values.prov_code}
                onChange={handleChange}
                onBlur={handleBlur}

                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map(provider => (
                  <option key={provider.id} value={provider.code}>{provider.name}</option>
                ))}
              </select>
              {errors.prov_code && <p className="text-red-500 text-xs italic">{errors.prov_code}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="families" className="block text-gray-700 text-sm font-bold mb-2">Rubro/Familia *</label>
              <select
                multiple
                name="families"
                value={values.families}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions, option => option.value);
                  setFieldValue("families", options);
                }}
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1 h-20"
              >
                {families.map(family => (
                  <option key={family.id} value={family.id}>{family.name}</option>
                ))}
              </select>
              {errors.families && <p className="text-red-500 text-xs italic">{errors.families}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="selectedFamilies" className="block text-gray-700 text-sm font-bold mb-2">Familias Seleccionadas:</label>
              <textarea
                id="selectedFamilies"
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1 h-20"
                value={values.families.map(famId => families.find(f => f.id === parseInt(famId))?.name).join(', ')}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Producto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProducts;
