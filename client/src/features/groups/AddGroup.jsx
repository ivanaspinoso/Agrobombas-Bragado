import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cateAdd } from "../../app/actions/categories"; // Cambia a la acción correcta si es necesario
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../../App.css";

const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);

  // Ajustamos el esquema de validación
  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del proveedor es requerido"),
    code: Yup.number().required("El código es requerido").min(1, "El código debe ser un número positivo"),
    description: Yup.string().optional(),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Proveedor
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", description: "", code: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const supplier = {
            name: values.name,
            description: values.description,
            code: values.code,
            userid: login.id
          };
          await dispatch(cateAdd(supplier)); 
          const success = JSON.parse(localStorage.getItem("categoryAdded")); 
          
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
                resetForm({ name: "", description: "", code: "" });
              } else {
                navigate("/show-groups");
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("categoryAdded"),
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
                  Nombre del Proveedor:
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                  Código:
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.code && <p className="text-red-500 text-xs italic">{errors.code}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Email:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Agregar Proveedor
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddGroup;
