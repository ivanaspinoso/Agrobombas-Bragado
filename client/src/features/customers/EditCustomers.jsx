import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
// import { updateCustomerDetails } from "../../app/actions/customers";
import { customersUpdate } from "../../app/actions/customers";

const EditCustomers = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Extracting customer details from location state
  const { id, name, postal_code,phone,address,city,cuit,web  } = location.state;

  const navigate = useNavigate();

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del cliente es requerido"),
    // description: Yup.string().required("La descripción es requerida").min(4, "Al menos 4 caracteres"),
    postal_code: Yup.string().required("El código postal es requerido"),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">Editar Cliente</h2>
      <Formik
        validationSchema={schema}
        initialValues={{ name, postal_code,phone,address,city,cuit,web }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            const customer = {
              id,
              name: values.name,
              postal_code: values.postal_code,
              phone:values.phone,
              address:values.address,
              city:values.city,
              cuit:values.cuit,
              web:values.web,
            };
            const { success, error } = await dispatch(customersUpdate(customer));
          
            if (success) {
              Swal.fire({
                title: "Genial!",
                text: "Cliente modificado exitosamente!",
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm();
                  navigate("/queue-messages", { replace: true });
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: error,
                icon: "error",
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

              {/* <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <p className="mt-2 text-red-600">{errors.description}</p>
                )}
              </div> */}

              <div className="mb-4">
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Código Postal:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.postal_code ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="postal_code"
                  name="postal_code"
                  value={values.postal_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postal_code && touched.postal_code && (
                  <p className="mt-2 text-red-600">{errors.postal_code}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Teléfono:</label>
                <input
                  type="text"
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección:</label>
                <input
                  type="text"
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
                  type="text"
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
                <label htmlFor="cuit" className="block text-sm font-medium text-gray-700">Cuit:</label>
                <input
                  type="text"
                  className={`shadow form-input block w-full mt-1 ${errors.cuit ? 'border-red-500' : 'border-gray-300'} rounded`}
                  id="cuit"
                  name="cuit"
                  value={values.cuit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cuit && touched.cuit && (
                  <p className="mt-2 text-red-600">{errors.cuit}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="web" className="block text-sm font-medium text-gray-700">Web:</label>
                <input
                  type="text"
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
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Editar Cliente
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditCustomers;
