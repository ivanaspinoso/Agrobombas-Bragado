import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { updateProduct } from "./ProductsSlice";
import { getAllCategories } from "../../app/actions/categories";
import { getAllFamilies } from "../../app/actions/families";

const EditProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extrae los datos del producto de location.state
  const {
    id,
    name,
    description,
    stock,
    cost,
    percent,
    price,
    iva21,
    iva10,
    price1,
    price2,
    prov_code,
    families,
  } = location.state || {};

  const login = useSelector((state) => state.usersReducer.login);
  const providers = useSelector((state) => state.groupsReducer.groups);
  const familyOptions = useSelector((state) => state.familiesReducer.families);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllFamilies());
  }, [dispatch]);

  const initialValues = {
    name: name || "",
    description: description || "",
    stock: stock || "",
    cost: cost || "",
    percent: percent || "",
    price: price || "",
    iva21: iva21 || "",
    iva10: iva10 || "",
    price1: price1 || "",
    price2: price2 || "",
    prov_code: prov_code || "",
    families: families || [],
  };

  const schema = Yup.object().shape({
    name: Yup.string().optional(),
    stock: Yup.number().optional().integer("Debe ser un número entero"),
    cost: Yup.number().positive("Debe ser un número positivo").optional(),
    percent: Yup.number().positive("Debe ser un número positivo").optional(),
    price: Yup.number().positive("Debe ser un número positivo").optional(),
    iva21: Yup.number().positive("Debe ser un número positivo").optional(),
    iva10: Yup.number().positive("Debe ser un número positivo").optional(),
    price1: Yup.number().positive("Debe ser un número positivo").optional(),
    price2: Yup.number().positive("Debe ser un número positivo").optional(),
    prov_code: Yup.number().optional(),
    families: Yup.array().optional(), 
});

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">Editar Producto</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const productData = { id, ...values, userid: login?.id };
          dispatch(updateProduct(productData));

          Swal.fire({
            title: "Genial!",
            text: "Producto modificado exitosamente!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/show-messages", { replace: true });
            }
          });

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto *</label>
              <Field name="name" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              {errors.name && touched.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
              <Field name="description" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock *</label>
                <Field name="stock" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.stock && touched.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
              </div>

              <div>
                <label htmlFor="cost" className="block text-gray-700 text-sm font-bold mb-2">Costo</label>
                <Field name="cost" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              </div>

              <div>
                <label htmlFor="percent" className="block text-gray-700 text-sm font-bold mb-2">Porcentaje de Ganancia</label>
                <Field name="percent" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              </div>

              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio *</label>
                <Field name="price" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.price && touched.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
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
              {errors.prov_code && touched.prov_code && <p className="text-red-500 text-xs italic">{errors.prov_code}</p>}
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
                {familyOptions.map(family => (
                  <option key={family.id} value={family.id}>{family.name}</option>
                ))}
              </select>
              {errors.families && touched.families && <p className="text-red-500 text-xs italic">{errors.families}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Editar Producto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
