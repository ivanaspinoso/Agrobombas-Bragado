import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { cateAdd } from "../../app/actions/categories"; // Cambia a la acción correcta si es necesario
// import { addProduct } from "./ProductsSlice";
import { createProduct } from "./ProductsSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../../App.css";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del producto es requerido"),
    description: Yup.string().required("La descripcion del producto es requerido"),
    price: Yup.string().required("El precio del producto es requerido"),
    cost: Yup.string().required("El costo del producto es requerido"),

  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Producto
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", description: "", price: "",cost:"" }}
        
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const products = {
            name: values.name,
            description: values.description,
            price: values.price,
            cost: values.cost,
            userid: login.id
          };
          console.log("Enviando producto:", products); // Agrega este log

          await dispatch(createProduct(products)); 
          const success = JSON.parse(localStorage.getItem("productAdded")); 
          
          if (success) {
            Swal.fire({
              title: "Genial!",
              text: "Proveedor agregado. ¿Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ name: "", description: "", price: "",cost:"" });
              } else {
                navigate("/show-messages");
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("productAdded"),
              icon: "error"
            });
          }
          setSubmitting(false);
        }}
      >
        {props => {
          const {
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre del Producto:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Descripcion:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Precio:
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
                  Costo:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="cost"
                  name="cost"
                  value={values.cost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cost && <p className="text-red-500 text-xs italic">{errors.cost}</p>}
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

export default AddProducts;
