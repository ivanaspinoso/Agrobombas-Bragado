import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, Input, Button } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { updatebuyById } from "./BuysSlice";

const { Option } = Select;

const EditBuy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: buyToEdit } = useLocation();
  const suppliers = useSelector((state) => state.customersReducer.customers);
  const login = useSelector((state) => state.usersReducer.login);

  const [subtotal, setSubtotal] = useState(buyToEdit?.total || 0);

  const schema = Yup.object().shape({
    fecha: Yup.string().required("La fecha es obligatoria"),
    supp_asoc: Yup.number().required("Seleccionar proveedor"),
    provider: Yup.string().required("El nombre del proveedor es obligatorio"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        fecha: format(new Date(buyToEdit?.fecha), "yyyy-MM-dd"),
        supp_asoc: buyToEdit?.supplierId || "",
        provider: buyToEdit?.provider || "",
        invoice: buyToEdit?.invoice || "",
        noteadmin: buyToEdit?.noteadmin || "",
      }}
      onSubmit={async (values) => {
        const updatedBuy = {
          id: buyToEdit.id,
          fecha: new Date(values.fecha).toISOString().split("T")[0],
          supp_asoc: values.supp_asoc,
          user_asoc: login.id,
          provider: values.provider,
          invoice: values.invoice,
          total: subtotal,
          noteadmin: values.noteadmin,
        };

        await dispatch(updatebuyById(updatedBuy));

        const success = JSON.parse(localStorage.getItem("buyUpdated"));
        if (success === true) {
          Swal.fire("Actualizado", "Compra actualizada correctamente", "success");
          navigate("/show-buys");
        } else {
          Swal.fire("Error", success, "error");
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="p-6 bg-white rounded shadow-md">
          <label>Fecha:</label>
          <Input
            type="date"
            name="fecha"
            value={values.fecha}
            onChange={(e) => setFieldValue("fecha", e.target.value)}
          />

          <label>Proveedor:</label>
          <Select
            showSearch
            placeholder="Seleccionar Proveedor"
            style={{ width: "100%" }}
            value={values.supp_asoc}
            onChange={(value) => {
              const selected = suppliers.find((s) => s.id === Number(value));
              if (selected) {
                setFieldValue("supp_asoc", selected.id);
                setFieldValue("provider", selected.name);
              }
            }}
          >
            {suppliers.map((s) => (
              <Option key={s.id} value={s.id}>
                {s.name}
              </Option>
            ))}
          </Select>

          <label>N° Factura/Remito:</label>
          <Field name="invoice" as={Input} />

          <label>Notas Internas:</label>
          <Field name="noteadmin" as={Input} />
          <label>Total:</label>
<Input
  type="number"
  value={subtotal}
  onChange={(e) => setSubtotal(Number(e.target.value))}
/>


          <div className="flex gap-4 mt-4">
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/show-buys")}
              style={{ backgroundColor: "#ff4d4f", color: "white" }}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditBuy;