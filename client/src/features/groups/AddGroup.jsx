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
    name: Yup.string().required("El grupo es requerido"),
    code: Yup.string().required("El código es requerido").min(2, "Al menos 2 caracteres"),
    email: Yup.string().email("Debe ser un email válido").required("El email es requerido"),
    address: Yup.string(), // Campo de dirección opcional
    city: Yup.string(), // Campo de ciudad opcional
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Debe contener solo números")
      .min(7, "Debe tener al menos 7 dígitos")
      .optional(),
    web: Yup.string().url("Debe ser una URL válida").optional(), // Campo de URL opcional
  });


  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Proveedor
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{name:"", code:"", email:"",address:"",city:"",phone:"",web:"" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const supplier = {
            name: values.name,
            code: values.code,
            email:values.email,
            address:values.address,
            city:values.city,
            phone:values.phone,
            web:values.web,
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
                resetForm({ name:"", code:"", email:"",address:"",city:"",phone:"",web:"" });
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
            handleSubmit,
            touched,
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
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
                  Provincia:
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  id="province"
                  name="province"
                  value={values.province}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.province && <p className="text-red-500 text-xs italic">{errors.province}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección:</label>
                <input
                  type="address"
                  className={`shadow form-input block w-full mt-1 ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <p className="mt-2 text-red-600">{errors.address}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad:</label>
                <input
                  type="city"
                  className={`shadow form-input block w-full mt-1 ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && touched.city && (
                  <p className="mt-2 text-red-600">{errors.city}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                <input
                  type="phone"
                  className={`shadow form-input block w-full mt-1 ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone && (
                  <p className="mt-2 text-red-600">{errors.phone}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="web" className="block text-sm font-medium text-gray-700">Web:</label>
                <input
                  type="web"
                  className={`shadow form-input block w-full mt-1 ${errors.web ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="web"
                  name="web"
                  value={values.web}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.web && touched.web && (
                  <p className="mt-2 text-red-600">{errors.web}</p>
                )}
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
