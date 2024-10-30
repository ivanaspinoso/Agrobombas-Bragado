import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "./CustomerSlice"; 
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../../App.css";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usersReducer.login);

  // Esquema de validación
  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del cliente es requerido"),
    postal_code: Yup.string().required("El código postal es requerido").min(4, "Debe tener al menos 4 caracteres"),
    city: Yup.string().required("La ciudad es requerida"),
    address: Yup.string().required("La dirección es requerida"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Cliente
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", postal_code: "", city: "", address: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const customer = {
            name: values.name,
            postal_code: values.postal_code,
            city: values.city,
            address: values.address,
            userid: login.id
          };
          await dispatch(updateCustomer(customer)); // Usar la acción de customerAdd
          const success = JSON.parse(localStorage.getItem("customerAdded")); // Asegúrate de que tu lógica de cliente ajuste el valor de success
          
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Cliente agregado \n ¿Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm();
              } else if (result.isDenied) {
                navigate("/show-queue-messages"); // Redirigir a la vista de clientes
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("userInfo"),
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
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre:
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
                {errors.name ? <p className="text-red-500 text-xs italic">{errors.name}</p> : ""}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postal_code">
                  Código Postal:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="postal_code"
                  name="postal_code"
                  value={values.postal_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postal_code ? <p className="text-red-500 text-xs italic">{errors.postal_code}</p> : ""}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  Ciudad:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city ? <p className="text-red-500 text-xs italic">{errors.city}</p> : ""}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Dirección:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address ? <p className="text-red-500 text-xs italic">{errors.address}</p> : ""}
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                disabled={isSubmitting}
              >
                Agregar Cliente
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCustomer;
