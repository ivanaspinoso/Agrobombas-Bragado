import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, Input, Button, Table } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { updatebuyById } from "./BuysSlice";
import { getAllCategories } from "../../app/actions/categories";
import { getAllProducts } from "../../app/actions/products";
import { FaTrashAlt } from "react-icons/fa";

const { Option } = Select;

const EditBuy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: buyToEdit } = useLocation(); // 👈 viene del botón editar
  const products = useSelector((state) => state.productsReducer.products);
  const login = useSelector((state) => state.usersReducer.login);

  const [orderlines, setOrderlines] = useState(buyToEdit?.orderlines || []);
  const [subtotal, setSubtotal] = useState(buyToEdit?.subtotal || 0);
  const [pago, setPago] = useState(buyToEdit?.paga || 0);
  const [resto, setResto] = useState(buyToEdit?.resta || 0);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const newSubtotal = orderlines.reduce((sum, item) => sum + item.subtotal, 0);
    setSubtotal(newSubtotal);
    setResto(newSubtotal - pago);
  }, [orderlines, pago]);

  const updateOrderline = (index, field, value) => {
    setOrderlines((prev) => {
      const updated = [...prev];
      if (field === "customPrice") {
        updated[index].customPrice = value;
        updated[index].selectedPrice = [updated[index].price, updated[index].price2, updated[index].price3].includes(value) ? value : undefined;
      } else if (field === "price") {
        updated[index].selectedPrice = value;
        updated[index].customPrice = value;
      } else if (field === "quantity") {
        updated[index].quantity = value;
      }
      updated[index].subtotal = updated[index].quantity * updated[index].customPrice;
      return updated;
    });
  };

  const removeOrderline = (key) => {
    setOrderlines((prev) => prev.filter((item) => item.key !== key));
  };

  const schema = Yup.object().shape({
    fecha: Yup.string().required("La fecha es obligatoria"),
    supplier: Yup.string().required("El proveedor es obligatorio"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        fecha: format(new Date(buyToEdit?.fecha), "yyyy-MM-dd"),
        supplier: buyToEdit?.supplier || "",
        address: buyToEdit?.address || "",
        celphone: buyToEdit?.cellphone || "",
        modopago: buyToEdit?.notapaga || "",
        paga: buyToEdit?.paga || 0,
        resta: buyToEdit?.resta || 0,
        invoice: buyToEdit?.invoice || "",
      }}
      onSubmit={async (values) => {
        const updatedBuy = {
          id: buyToEdit.id,
          fecha: new Date(values.fecha).toISOString().split("T")[0],
          supp_asoc: buyToEdit.supp_asoc, // o volver a seleccionarlo si lo permitís
          user_asoc: login.id,
          provider: values.supplier,
          total: subtotal,
          invoice: buyToEdit?.invoice || "",
          noteadmin: values.modopago || "",
        };
        

        await dispatch(updatebuyById(updatedBuy));

        const success = JSON.parse(localStorage.getItem("buyUpdated"));
        if (success === true) {
          Swal.fire("Actualizado", "Compra actualizada correctamente", "success");
          navigate("/show-configs");
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
          <Field name="supplier" as={Input} />

          <label>Dirección:</label>
          <Field name="address" as={Input} />

          <label>Celular:</label>
          <Field name="celphone" as={Input} />

          <label>Modo de Pago:</label>
          <Field name="modopago" as={Input} />

          <Table
            dataSource={orderlines}
            rowKey="key"
            columns={[
              {
                title: "Producto",
                dataIndex: "name",
              },
              {
                title: "Precio",
                dataIndex: "price",
                render: (text, record, index) => (
                  <div className="flex gap-2">
                    <Select
                      value={record.selectedPrice}
                      style={{ width: "250px" }}
                      onChange={(value) => updateOrderline(index, "price", value)}
                    >
                      <Option value={record.price}>Precio: ${record.price?.toFixed(2)}</Option>
                      <Option value={record.price2}>Tarjeta: ${record.price2?.toFixed(2)}</Option>
                      <Option value={record.price3}>s/IVA: ${record.price3?.toFixed(2)}</Option>
                    </Select>

                    <Input
                      type="number"
                      value={record.customPrice}
                      onChange={(e) => updateOrderline(index, "customPrice", Number(e.target.value))}
                      style={{ width: "100px" }}
                    />
                  </div>
                ),
              },
              {
                title: "Cantidad",
                dataIndex: "quantity",
                render: (text, record, index) => (
                  <Input
                    type="number"
                    value={text}
                    onChange={(e) => updateOrderline(index, "quantity", Number(e.target.value))}
                  />
                ),
              },
              {
                title: "Subtotal",
                dataIndex: "subtotal",
                render: (text) => <Input type="number" value={text} readOnly />,
              },
              {
                title: "Acciones",
                dataIndex: "actions",
                render: (_, record) => (
                  <Button danger onClick={() => removeOrderline(record.key)}>
                    <FaTrashAlt />
                  </Button>
                ),
              },
            ]}
          />

          <label>Paga:</label>
          <Field name="paga" as={Input} value={pago} type="number"
  onChange={(e) => setPago(e.target.value)}
  onBlur={() => setResto(subtotal - pago)}
/>


          <label>Resto:</label>
          <Field name="resta" as={Input} type="number" value={resto} readOnly />
          <label>N° Factura/Remito:</label>
<Field name="invoice" as={Input} />

          <div className="flex gap-4 mt-4">
            <Button type="primary" htmlType="submit">
              Guardar Cambios
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/show-configs")}
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
