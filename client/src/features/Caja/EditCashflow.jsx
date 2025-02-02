import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { updateCashflowById } from "./CashflowSlice";
import { useSelector } from "react-redux";

const EditCashflow = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usersReducer.login);

  const { id, date, description, income, outflow, note, vta_asoc } =
    location.state || {};

  const initialValues = {
    date: date || "",
    description: description || "",
    income: income || "",
    outflow: outflow || "",
    note: note || "",
    vta_asoc,
  };

  const schema = Yup.object().shape({
    date: Yup.date().required("La fecha es requerida"),
    description: Yup.string().required("La descripción es requerida"),
    income: Yup.number()
      .nullable()
      .test(
        "one-required",
        "Debe ingresar al menos un ingreso o un egreso",
        function (value) {
          const { outflow } = this.parent;
          return value > 0 || outflow > 0;
        }
      ),
    outflow: Yup.number()
      .nullable()
      .test(
        "one-required",
        "Debe ingresar al menos un ingreso o un egreso",
        function (value) {
          const { income } = this.parent;
          return value > 0 || income > 0;
        }
      ),
    note: Yup.string().optional(),
  });

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Movimiento
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const cashflowData = {
            id,
            date: values.date,
            description: values.description,
            income: values.income > 0 ? values.income : null,
            outflow: values.outflow > 0 ? values.outflow : null,
            note: values.note || null,
            user_asoc: login?.id,
          };
          console.log("Payload enviado:", cashflowData);

          console.log("Payload enviado:", cashflowData);

          console.log("Datos a enviar para actualizar:", cashflowData);
            await dispatch(updateCashflowById(cashflowData));
            const success = JSON.parse(
              localStorage.getItem("cashflowUpdated")
            );         
            if (success === true) {  
            Swal.fire({
              title: "Genial!",
              text: "Movimiento modificado exitosamente!",
              icon: "success",
            }).then(() => {
              navigate("/show-cashflows", { replace: true });
            });} else {Swal.fire("Error",success,"error")}
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
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
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Descripción *
              </label>
              <Field
                name="description"
                type="text"
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              />
              {errors.description && touched.description && (
                <p className="text-red-500 text-xs italic">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="income"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
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
                <label
                  htmlFor="outflow"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Egreso
                </label>
                <Field
                  name="outflow"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.outflow && touched.outflow && (
                  <p className="text-red-500 text-xs italic">
                    {errors.outflow}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="note"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nota (opcional)
              </label>
              <Field
                name="note"
                type="text"
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              />
            </div>
            {console.log(vta_asoc)}
            {!vta_asoc || vta_asoc === undefined ? (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0b5a85] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar Cambios
              </button>
            ) : (
              <>No se puede editar venta/mov cuenta asociado</>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCashflow;
