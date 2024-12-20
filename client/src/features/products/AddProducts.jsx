import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { createProduct } from "./ProductsSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del producto es requerido"),
    description: Yup.string().optional(),
    price: Yup.number().required("El precio es requerido"),
    units: Yup.string().optional(),
    minunit: Yup.number().required("La unidad mínima es requerida"),
    stepunit: Yup.number().required("El paso de unidad es requerido"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Producto
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "",
          description: "",
          price: "",
          units: "unidad",
          minunit: 1,
          stepunit: 1,
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(createProduct(values));
          const success = JSON.parse(localStorage.getItem("productAdded"));

          if (success) {
            Swal.fire({
              title: "Producto agregado",
              text: "¿Desea seguir agregando productos?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm();
              } else {
                navigate("/show-messages");
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al agregar el producto.",
              icon: "error",
            });
          }
          setSubmitting(false);
        }}
      >
        {props => {
          const { values, errors, handleChange, handleBlur, handleSubmit } = props;

          return (
            <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre del Producto:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Descripción:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Precio:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Agregar Producto
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddProduct;
