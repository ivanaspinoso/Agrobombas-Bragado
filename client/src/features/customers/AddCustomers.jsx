import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import "../../App.css";
import { customersAdd } from "../../app/actions/customers";

const AddCustomers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usersReducer.login);

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre de la familia es requerido"),
    postal_code: Yup.number().required("Codigo postal es requerida").min(4, "Al menos 4 caracteres"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Cliente
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name: "", postal_code: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const family = {
            name: values.name,
            postal_code: values.postal_code,
            userid: login.id
          };
          await dispatch(customersAdd(family));
          const success = JSON.parse(localStorage.getItem("customersAdd"));
          console.log("Objeto", success);
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Familia agregada \n ¿Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ name: "", postal_code: "" });
              } else if (result.isDenied) {
                navigate("/queue-messages");
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
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <Form onSubmit={handleSubmit} className="border rounded p-4 max-w-xl w-full mx-auto">
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
                  Codigo postal:
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Teléfono:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone ? <p className="text-red-500 text-xs italic">{errors.phone}</p> : ""}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuit">
                  Cuit:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="cuit"
                  name="cuit"
                  value={values.cuit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cuit ? <p className="text-red-500 text-xs italic">{errors.cuit}</p> : ""}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="web">
                  Web:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="web"
                  name="web"
                  value={values.web}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.web ? <p className="text-red-500 text-xs italic">{errors.web}</p> : ""}
              </div>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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

export default AddCustomers;
