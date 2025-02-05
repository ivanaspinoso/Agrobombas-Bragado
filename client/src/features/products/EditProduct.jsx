import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
// import { updateProduct } from "./ProductsSlice";
import { getAllCategories } from "../../app/actions/categories";
import { getAllFamilies } from "../../app/actions/families";
import { productUpdate } from "../../app/actions/products";

const EditProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("location.state:", location.state);
  const [loadingFamilies, setLoadingFamilies] = useState(true);

  const {
    id,
    name,
    description,
    article,
    stock,
    cost,
    percent,
    price,
    iva21,
    price1,
    price2,
    price3,
    prov_code,
    families,
  } = location.state || {};

  const [price0, setPrice0] = useState(price);
  const [pricetarjeta, setPriceTarjeta] = useState(price2);
  const [pricesi, setPriceSI] = useState(price3);

  const login = useSelector((state) => state.usersReducer.login);
  const providers = useSelector((state) => state.groupsReducer.groups);
  const familyOptions = useSelector((state) => state.familiesReducer.families);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllFamilies());
  }, [dispatch]);

  const initialValues = {
    name: name || "",
    description: description || "",
    article: article || "",
    stock: stock || "",
    cost: cost || 0,
    percent: percent || 0,
    price: price || 0,
    iva21: iva21 || 21,
    price1: price1 || 0,
    price2: price2 || 0,
    price3: price3 || 0,
    prov_code: prov_code || "",
    families:
      families?.map((family) =>
        typeof family === "object" ? family.id : family
      ) || [],
  };

  const schema = Yup.object().shape({
    name: Yup.string().optional(),
    article: Yup.string().optional(),
    stock: Yup.number().optional().integer("Debe ser un número entero"),
    cost: Yup.number().positive("Debe ser un número positivo").optional(),
    percent: Yup.number().positive("Debe ser un número positivo").optional(),
    price: Yup.number().positive("Debe ser un número positivo").optional(),
    iva21: Yup.number().positive("Debe ser un número positivo"),
    price1: Yup.number().positive("Debe ser un número positivo").optional(),
    price2: Yup.number().positive("Debe ser un número positivo").optional(),
    prov_code: Yup.number().optional(),
    families: Yup.array().optional(),
  });

  useEffect(() => {
    if (!setLoadingFamilies && familyOptions.length > 0) {
      const validFamilies = initialValues.families.filter((familyId) =>
        familyOptions.some((f) => f.id === parseInt(familyId, 10))
      );
      setLoadingFamilies("families", validFamilies);
    }
  }, [setLoadingFamilies, familyOptions, initialValues.families]);

  const onChangePercent = () => {
    var costo =
      document.getElementsByName("cost")[0].value === null
        ? 0
        : parseFloat(document.getElementsByName("cost")[0].value);
    var percent =
      document.getElementsByName("percent")[0].value === null
        ? 0
        : parseFloat(document.getElementsByName("percent")[0].value);
    var iva21 =
      document.getElementsByName("iva21")[0].value === null
        ? 0
        : parseFloat(document.getElementsByName("iva21")[0].value);
    var siniva = costo * (percent / 100) + costo;
    var precio = siniva * (iva21 / 100) + siniva;
    setPrice0(Math.round(precio * 100) / 100)
    setPriceSI(Math.round(siniva * 100) / 100)
    // setPrice0(precio);
  };

  const onChangePercentT = () => {
    /*   var costo = document.getElementsByName('cost')[0].value === null ? 0 : parseFloat(document.getElementsByName('cost')[0].value);
  var percent = document.getElementsByName('percent')[0].value === null ? 0 : parseFloat(document.getElementsByName('percent')[0].value); */
    var percenTarje =
      document.getElementsByName("price1")[0].value === null
        ? 0
        : parseFloat(document.getElementsByName("price1")[0].value); //price1 se usa para porcentaje tarjeta
    /* var iva21 = document.getElementsByName('iva21')[0].value === null ? 0 : parseFloat(document.getElementsByName('iva21')[0].value);
  var siniva = costo * (percent / 100) + costo 
  var precio = siniva * (iva21 / 100) + siniva */
    var precioTarje = price0 * (percenTarje / 100) + parseFloat(price0);
    console.log(price0, percenTarje / 100);
    setPriceTarjeta(Math.round(precioTarje * 100) / 100);
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Producto
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const productData = {
            id,
            name: values.name,
            description: values.description,
            article: values.article,
            stock: parseInt(values.stock, 10),
            cost: parseFloat(values.cost),
            percent: parseFloat(values.percent),
            price: parseFloat(price0),
            price1: parseFloat(values.price1),
            price2: parseFloat(pricetarjeta),
            price3: pricesi,
            iva21: parseFloat(values.iva21),
            prov_code: values.prov_code,
            families: values.families.map((family) => parseInt(family, 10)),
            userid: login?.id,
          };
          await dispatch(productUpdate(productData));
          const success = JSON.parse(localStorage.getItem("productUpdated"));
          console.log(success, productData);

          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Producto modificada exitosamente!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                // resetForm({ name: "", description: "" });
                navigate("/show-messages", { replace: true });
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("productUpdated"),
              icon: "error",
            });
          }
          /*           Swal.fire({
            title: "Genial!",
            text: "Producto modificado exitosamente!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/show-messages", { replace: true });
            }
          }); */

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre del Producto *
              </label>
              <Field
                name="name"
                type="text"
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="article"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Artículo *
                </label>
                <Field
                  name="article"
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Descripción
                </label>
                <Field
                  name="description"
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="stock"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Stock *
                </label>
                <Field
                  name="stock"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
                {errors.stock && touched.stock && (
                  <p className="text-red-500 text-xs italic">{errors.stock}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cost"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Costo *
                </label>
                <Field
                  name="cost"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>

              <div>
                <label
                  htmlFor="iva21"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  IVA 21%
                </label>
                <Field
                  name="iva21"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                />
              </div>

              <div>
                <label
                  htmlFor="percent"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Porcentaje de Ganancia
                </label>
                <Field
                  name="percent"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  onBlur={(e) => onChangePercent(e)}
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Precio *
                </label>
                <Field
                  name="price"
                  type="number"
                  value={price0}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  onChange={(e) => setPrice0(e.target.value)}
                />
                {errors.price && touched.price && (
                  <p className="text-red-500 text-xs italic">{errors.price}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="price1"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  % Tarjeta
                </label>
                <Field
                  name="price1"
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  onBlur={(e) => onChangePercentT(e)}
                />
              </div>

              <div>
                <label
                  htmlFor="price2"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Precio Tarjeta 2
                </label>
                <Field
                  name="price2"
                  type="number"
                  value={pricetarjeta}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  onChange={(e) => setPriceTarjeta(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="price3"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Precio s/Iva
                </label>
                <Field
                  name="price3"
                  type="number"
                  value={pricesi}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
                  onChange={(e) => setPriceSI(e.target.value)}
                />
                {errors.price2 && (
                  <p className="text-red-500 text-xs italic">{errors.price2}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="prov_code"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Proveedor *
              </label>
              <select
                name="prov_code"
                value={values.prov_code}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.code}>
                    {provider.name}
                  </option>
                ))}
              </select>
              {errors.prov_code && touched.prov_code && (
                <p className="text-red-500 text-xs italic">
                  {errors.prov_code}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="families"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Rubro/Familia *
              </label>
              {/* Selector de familias */}
              <div className="relative">
                <select
                  name="families"
                  value=""
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (selectedId && !values.families.includes(selectedId)) {
                      setFieldValue("families", [
                        ...values.families,
                        selectedId,
                      ]);
                    }
                  }}
                  onBlur={handleBlur}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1 bg-white"
                >
                  <option value="" disabled>
                    Seleccionar rubro/familia
                  </option>
                  {familyOptions
                    .filter(
                      (family) =>
                        !values.families.includes(family.id.toString())
                    )
                    .map((family) => (
                      <option key={family.id} value={family.id}>
                        {family.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Mostrar familias seleccionadas */}
              <div className="mt-2">
                <label
                  htmlFor="selectedFamilies"
                  className="block text-gray-600 text-sm font-semibold"
                >
                  Familias Seleccionadas:
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.families.map((familyId) => {
                    const family = familyOptions?.find(
                      (f) => f.id === parseInt(familyId, 10)
                    );
                    console.log(family, "family");
                    return (
                      <span
                        key={familyId}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded flex items-center gap-1"
                      >
                        {family?.name || "Cargando..."}
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setFieldValue(
                              "families",
                              values.families.filter((id) => id !== familyId)
                            );
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>

              {errors.families && (
                <p className="text-red-500 text-xs italic mt-2">
                  {errors.families}
                </p>
              )}
            </div>

            {/* Mostrar familias seleccionadas como una lista
  <div className="mt-2">
    <label htmlFor="selectedFamilies" className="block text-gray-600 text-sm font-semibold">
      Familias Seleccionadas:
    </label>
    <textarea
      id="selectedFamilies"
      className="form-input mt-1 block w-full border border-gray-300 rounded px-1 "
      value={values.families
        .map((familyId) => familyOptions.find((f) => f.id === parseInt(familyId, 10))?.name)
        .join(", ")}
      readOnly
    />
  </div>
</div> */}

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Editar Producto
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProduct;
