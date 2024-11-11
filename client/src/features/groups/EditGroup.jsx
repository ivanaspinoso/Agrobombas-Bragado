import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
// import { updategroup } from "./GroupsSlice";
import { updateCategory } from "../../app/actions/categories";

const EditGroup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [id] = useState(location.state.id);
  const [name] = useState(location.state.name);
  const [code] = useState(location.state.code);
  const [address] = useState(location.state.address);
  const [email] = useState(location.state.email || ""); // Agregar email con valor predeterminado si falta
  const navigate = useNavigate();

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
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Proveedor
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name:"", code:"", email:"",address:"",city:"",phone:"",web:""}}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const categoryData = {
            name: values.name,
            code: values.code,
            email:values.email,
            address:values.address,
            city:values.city,
            phone:values.phone,
            web:values.web,
            id: id,
          };
          dispatch(updateCategory(categoryData));
          const success = JSON.parse(localStorage.getItem('categoryUpdated'));
          if (success) {
            Swal.fire({
              title: "Genial!",
              text: "Grupo de contactos modificado!",
              icon: "success",
            }).then(() => {
              resetForm({ name: "", code: "",email:"",address:"",city:"",phone:"",web:"" });
              navigate("/show-groups", { replace: true });
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className="mt-2 text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.code && touched.code && (
                  <p className="mt-2 text-red-600">{errors.code}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  className={`shadow form-input block w-full mt-1 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <p className="mt-2 text-red-600">{errors.email}</p>
                )}
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
                disabled={isSubmitting || !values.name || !values.code || Object.keys(errors).length > 0}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar Proveedor
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditGroup;
