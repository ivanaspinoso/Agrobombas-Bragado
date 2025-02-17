import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { addNewCashflow } from "./CashflowSlice";
import { useNavigate } from "react-router-dom";

const AddCashflow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useSelector((state) => state.usersReducer.login);
  
    const schema = Yup.object().shape({
      date: Yup.date().required("La fecha es requerida"),
      description: Yup.string().required("La descripción es requerida"),
      income: Yup.number()
        .nullable()
        .test("one-required", "Debe ingresar al menos un ingreso o un egreso", function (value) {
          const { outflow } = this.parent;
          return value > 0 || outflow > 0;
        }),
      outflow: Yup.number()
        .nullable()
        .test("one-required", "Debe ingresar al menos un ingreso o un egreso", function (value) {
          const { income } = this.parent;
          return value > 0 || income > 0;
        }),
      note: Yup.string().optional(),
    });
  
    return (
      <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
        <h2 className="text-left text-xl font-bold uppercase mb-6" style={{ letterSpacing: "2px" }}>
          Agregar Movimiento
        </h2>
        <Formik
          initialValues={{
            date: "",
            description: "",
            income: 0,
            outflow: 0,
            note: "",
          }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const dataToSend = {
                date: values.date,
                description: values.description,
                income: values.income > 0 ? values.income : null,
                outflow: values.outflow > 0 ? values.outflow : null,
                note: values.note || null,
                user_asoc: login.id, 
              };
            console.log(dataToSend)

              await dispatch(addNewCashflow(dataToSend));
              const success = JSON.parse(
                localStorage.getItem("cashflowAdded")
              );
              if (success === true) {
              Swal.fire({
                title: "Movimiento agregado con éxito",
                text: "¿Desea agregar otro movimiento?",
                icon: "success",
                showDenyButton: true,
                confirmButtonText: "Sí",
                denyButtonText: "No",
              }).then((result) => {
                if (result.isConfirmed) {
                  resetForm();
                } else {
                  navigate("/show-cashflows");
                }
              })} else {Swal.fire("Error",success,"error")}
              setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6">
                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha *
                </label>
                <Field
                  name="date"
                  type="date"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.date && touched.date && (
                  <p className="text-red-500 text-xs italic">{errors.date}</p>
                )}
              </div>
  
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción *
                </label>
                <Field
                  name="description"
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-xs italic">{errors.description}</p>
                )}
              </div>
  
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="income" className="block text-gray-700 text-sm font-bold mb-2">
                    Ingreso
                  </label>
                  <Field
                    name="income"
                    type="number"
                    className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  />
                  {errors.income && touched.income && (
                    <p className="text-red-500 text-xs italic">{errors.income}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="outflow" className="block text-gray-700 text-sm font-bold mb-2">
                    Egreso
                  </label>
                  <Field
                    name="outflow"
                    type="number"
                    className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  />
                  {errors.outflow && touched.outflow && (
                    <p className="text-red-500 text-xs italic">{errors.outflow}</p>
                  )}
                </div>
              </div>
  
              <div className="mb-6">
                <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                  Nota (opcional)
                </label>
                <Field
                  name="note"
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>
              <div className="flex gap-4 mt-4">

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0b5a85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Agregar Movimiento
              </button>
              <button 
              type="button"
              onClick={() => navigate("/show-cashflows")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff4d4f]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </button>
            </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  
  
  export default AddCashflow;
  
