import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Select, Input, Button, Table } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { submitSale } from "./salesSlice";
import { getAllCustomers } from "../customers/CustomerSlice";
import { getAllProducts } from "../../app/actions/products";
import { FaTrashAlt } from "react-icons/fa";
import { fetchAllCashflows } from "../Caja/CashflowSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddSales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customersReducer.customers);
  const products = useSelector((state) => state.productsReducer.products);
  const login = useSelector((state) => state.usersReducer.login);

  const [orderlines, setOrderlines] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [resto, setResto] = useState(0);
  const [pago, setPago] = useState(0);
  const [selPrice, setSelPrice] = useState(0);

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setSubtotal(orderlines.reduce((sum, item) => sum + item.subtotal, 0));
    setResto(subtotal - pago);
  }, [orderlines]);

  const schema = Yup.object().shape({
    fecha: Yup.string().required("La fecha es obligatoria"),
    client: Yup.string().required("El cliente es obligatorio"),
    // modopago: Yup.string().required("Modo de pago requerido"),
    // paga: Yup.number().min(0, "Debe ser positivo"),
  });

  const addOrderline = (product) => {
    setSelPrice(product.price)
    const newOrderline = {
      key: `${product.id}-${Date.now()}`,
      id: product.id,
      article: product.article,
      name: product.name,
      cost: product.cost,
      price: product.price,
      price2: product.price2,
      price3: product.price3,
      quantity: 1,
      subtotal: product.price,
      customPrice: product.price,
    };
    setOrderlines((prevOrderlines) => [...prevOrderlines, newOrderline]);
  };

  // const updateOrderline = (index, field, value) => {
  //   const newOrderlines = [...orderlines];
  
  //   if (field === "price") {
  //     newOrderlines[index].customPrice = value; // Solo afecta el input
  //   } else {
  //     newOrderlines[index][field] = value;
  //   }
  
  //   if (field === "quantity" || field === "price") {
  //     newOrderlines[index].subtotal = newOrderlines[index].quantity * newOrderlines[index].customPrice;
  //   }
  
  //   setOrderlines(newOrderlines);
  //   setSubtotal(newOrderlines.reduce((sum, item) => sum + item.subtotal, 0));
  //   setResto(subtotal - pago);
  // };
  const updateOrderline = (index, field, value) => {
    setOrderlines((prevOrderlines) => {
      const newOrderlines = [...prevOrderlines];
  
      if (field === "customPrice") {
        newOrderlines[index].customPrice = value;
  
        if (
          value === newOrderlines[index].price ||
          value === newOrderlines[index].price2 ||
          value === newOrderlines[index].price3
        ) {
          newOrderlines[index].selectedPrice = value;
        } else {
          newOrderlines[index].selectedPrice = undefined; 
        }
      } else if (field === "price") {
        newOrderlines[index].selectedPrice = value;
        newOrderlines[index].customPrice = value;
      } else if (field === "quantity") {
        newOrderlines[index].quantity = value; 
      }
  
      newOrderlines[index].subtotal = newOrderlines[index].quantity * newOrderlines[index].customPrice;
  
      const newSubtotal = newOrderlines.reduce((sum, item) => sum + item.subtotal, 0);
      
      setSubtotal(newSubtotal);
      setResto(newSubtotal - pago);
  
      return newOrderlines;
    });
  };
  
  
   
  
    
  const removeOrderline = (key) => {
    setOrderlines((prevOrderlines) => {
      const newOrderlines = prevOrderlines.filter((item) => item.key !== key); // 🔹 Ahora usa `key` en lugar de `index`

      const newSubtotal = newOrderlines.reduce(
        (sum, item) => sum + item.subtotal,
        0
      );
      setSubtotal(newSubtotal);
      setResto(newSubtotal - pago);

      return newOrderlines;
    });
  };


  useEffect(() => {
    const newSubtotal = orderlines.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );
    setSubtotal(newSubtotal);
    setResto(newSubtotal - pago);
  }, [orderlines, pago]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        fecha: format(new Date(), "yyyy-MM-dd"),
        client: "",
        client_asoc: "",
        address: "",
        celphone: "",
        modopago: "",
        paga: 0,
        resta: 0,
      }}
      onSubmit={async (values) => {
        const saleData = {
          fecha: new Date(values.fecha).toISOString(), 
          client: values.client,
          client_asoc: values.client_asoc,
          address: values.address || "",
          cellphone: values.celphone || "",
          notapaga: values.modopago,
          paga: pago,
          resta: resto,
          subtotal,
          total: subtotal,
          orderlines,
          user_asoc: login.id,
        };
       
        await dispatch(submitSale(saleData));

        const success = JSON.parse(localStorage.getItem("saleAdded"));
        // console.log("Objeto", success);
        if (success && success === true) {
          Swal.fire("Éxito", "Venta registrada", "success");
          await dispatch(getAllProducts());
          await dispatch(fetchAllCashflows());
          navigate("/show-configs");
        } else {
          Swal.fire("Error", success, "error");
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="p-6 bg-white rounded shadow-md">
          {/* 📌 SECCIÓN 1 - INFORMACIÓN DEL CLIENTE */}
          <label>Fecha:</label>
          <Input
            type="date"
            name="fecha"
            value={values.fecha}
            onChange={(e) => setFieldValue("fecha", e.target.value)}
          />

          <label>Cliente:</label>
          <Select
            showSearch
            placeholder="Seleccionar Cliente"
            style={{ width: "100%" }}
            onChange={(value) => {
              const selectedCustomer = customers.find((c) => c.id === value);
              if (selectedCustomer) {
                setFieldValue("client", selectedCustomer.name);
                setFieldValue("client_asoc", selectedCustomer.id);
                setFieldValue("address", selectedCustomer.address);
                setFieldValue("celphone", selectedCustomer.phone);
              }
            }}
            filterOption={(input, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
          >
            {customers.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <label>Dirección:</label>
          <Field name="address" as={Input} readOnly />

          <label>Celular:</label>
          <Field name="celphone" as={Input} readOnly />

          {/* 📌 SECCIÓN 2 - SELECCIÓN DE PRODUCTOS */}
          <label>Productos:</label>
          <div className="flex gap-2">
            <Select
              showSearch
              placeholder="Agregar Producto"
              style={{ width: "100%" }}
              onChange={(value) => {
                const product = products.find((p) => p.id === value);
                if (product) addOrderline(product);
              }}
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              options={products.map((p) => ({
                value: p.id,
                label: `${p.name} - ${p.article}`,
              }))}
            />

            {/*             <Button type="primary" onClick={() => addOrderline({ id: "", name: "Nuevo Producto", price1: 0, quantity: 1 })}>
              +
            </Button> */}
          </div>

          <Table
            dataSource={orderlines}
            rowKey="key"
            columns={[
              {
                title: "Producto",
                dataIndex: "name",
                render: (text, record, index) => (
                  <Select
                    showSearch
                    defaultValue={text}
                    onChange={(value) => {
                      const product = products.find((p) => p.id === value);
                      if (product) {
                        updateOrderline(index, "id", product.id);
                        updateOrderline(index, "name", product.name);
                        updateOrderline(index, "price", product.price);
                        updateOrderline(index, "price2", product.price2);
                        updateOrderline(index, "price3", product.price3);
                      }
                    }}
                  >
                    {products.map((p) => (
                      <Option key={p.id} value={p.id}>
                        {p.name}
                      </Option>
                    ))}
                  </Select>
                ),
              },
              {
                title: "Precio",
                dataIndex: "price",
                render: (text, record, index) => (
                  <div className="flex gap-2">
                    <Select
                      value={record.selectedPrice} 
                      style={{ width: "250px" }}
                      onChange={(value) => {
                        updateOrderline(index, "price", value);
                      }}
                    >
                      <Option value={record.price}>Precio: ${record.price?.toLocaleString(undefined,{minimumFractionDigits: 2})}</Option>
                      <Option value={record.price2}>Tarjeta: ${record.price2?.toLocaleString(undefined,{minimumFractionDigits: 2})}</Option>
                      <Option value={record.price3}>s/IVA: ${record.price3?.toLocaleString(undefined,{minimumFractionDigits: 2})}</Option>
                    </Select>
              
                    <Input
                      type="number"
                      value={record.customPrice} // Se actualiza independientemente
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
                    onChange={(e) =>
                      updateOrderline(index, "quantity", Number(e.target.value))
                    }
                  />
                ),
              },
              {
                title: "Subtotal",
                dataIndex: "subtotal",
                render: (text, record, index) => (
                  <Input type="number" value={text} readOnly />
                ),
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

          {/* 📌 SECCIÓN 3 - TOTALES Y MEDIOS DE PAGO */}
          <label>Subtotal:</label>
          <Field
            name="subtotal"
            as={Input}
            type="number"
            value={subtotal}
            readOnly
          />

          <label>Paga:</label>
          <Field
            name="paga"
            as={Input}
            value={pago}
            type="number"
            onChange={(e) => setPago(e.target.value)}
            onBlur={() => setResto(/* "resta", */ subtotal - pago)}
          />

          <label>Modo de Pago:</label>
          <Field name="modopago" as={Input} />

          <label>Resto:</label>
          <Field name="resta" as={Input} type="number" value={resto} readOnly />
         <div className=" flex gap-4 mt-4">
          <Button type="primary" htmlType="submit">
            Registrar Venta
          </Button>
          <Button 
              type="button"
              onClick={() => navigate("/show-configs")}
              style={{ backgroundColor: '#ff4d4f', color: 'white' }}
            >
              Cancelar
            </Button>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddSales;
