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
  const { id, name, postal_code } = location.state;

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
        initialValues={{ name, postal_code }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
            const customer = {
              id,
              name: values.name,
              postal_code: values.postal_code,
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
