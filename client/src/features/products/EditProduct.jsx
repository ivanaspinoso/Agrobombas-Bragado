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
import Spinner from "../../Components/spinner";

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
    isOfert,
    imageurl,
    imagepid,
    show,
    showprice,
    webprice: initialWebPrice,
  } = location.state || {};

  const [price0, setPrice0] = useState(price);
  const [pricetarjeta, setPriceTarjeta] = useState(price2);
  const [pricesi, setPriceSI] = useState(price3);
  const [viewWeb, setViewWeb] = useState(show)
  const [showPriceOnWeb, setShowPriceOnWeb] = useState(showprice);
  const [webPrice, setWebPrice] = useState(initialWebPrice || price0);
  const [customPrice, setCustomPrice] = useState("");

  const login = useSelector((state) => state.usersReducer.login);
  const providers = useSelector((state) => state.groupsReducer.groups);
  const familyOptions = useSelector((state) => state.familiesReducer.families);

  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState(imageurl)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllFamilies());
  }, [dispatch]);

  const initialValues = {
    id: id,
    name: name || "",
    description: description || "",
    article: article || "",
    stock: stock || 0,
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
    isOfert,
    imageurl,
    imagepid,
    show: viewWeb,
    showprice: showPriceOnWeb,
    webprice: parseFloat(webPrice) || 0,
  };

  const schema = Yup.object().shape({
    name: Yup.string().optional(),
    article: Yup.string().optional(),
    stock: Yup.number().required().integer("Debe ser un número entero"),
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
    setPrice0(Math.round(precio * 100) / 100);
    setPriceSI(Math.round(siniva * 100) / 100);
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

  // handle and convert it in base 64 para mostrar la foto seleccionada
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handlePriceChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "custom") {
      setWebPrice(customPrice);
    } else {
      setWebPrice(selectedValue);
      setCustomPrice("");
    }
  };

  /* if (loading) {
    return (
      <><Spinner /></>
    )
  } */

  return (<>
    { loading ? <Spinner/> :"" }
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center text-xl uppercase m-5 font-semibold">
        Editar Producto
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          const productData = {
            id: values.id,
            name: values.name,
            description: values.description,
            article: values.article,
            stock: parseInt(values.stock, 10),
            cost: parseFloat(values.cost),
            percent: parseFloat(values.percent),
            price: parseFloat(price0),
            price1: parseFloat(values.price1),
            price2: parseFloat(pricetarjeta),
            price3: parseFloat(pricesi),
            iva21: parseFloat(values.iva21),
            prov_code: values.prov_code,
            families: values.families.map((family) => parseInt(family, 10)),
            userid: login?.id,
            isOfert: values.isOfert,
            imageurl: values.imageurl,
            imagepid: values.imagepid,
            show: viewWeb,
            showprice: showPriceOnWeb,
            webprice: parseFloat(webPrice) || 0,
            image: image,
          };
          try {
            { setLoading(true) }
            await dispatch(productUpdate(productData));
            { setLoading(false) }
            const success = JSON.parse(localStorage.getItem("productUpdated"));
            console.log(success, "producto a enviar", productData);

            if (success === true) {
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
            setSubmitting(false);
          } catch (error) {
            console.log(error)
          }
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
                {/*                 {errors.price3 && (
                  <p className="text-red-500 text-xs italic">{errors.price3}</p>
                )} */}
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
                          {/* &times; */}
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
            <div className="mb-6 flex items-center gap-3">
              <input
                type="checkbox"
                id="show"
                name="show"
                className="w-5 h-5 accent-blue-500"
                value={show}
                checked={viewWeb}
                onChange={() => setViewWeb(!viewWeb)}
              />
              <label htmlFor="show" className="text-gray-700 font-medium">
                Mostrar producto en la web
              </label>
            </div>
            {/* Sección de opciones si se muestra en la web */}
            {viewWeb && (
              <div className="space-y-6">

                {/* Imagen del producto */}
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex flex-col items-center border border-gray-300 p-4 rounded-lg w-64">
                    {image ? (
                      <>
                        <img src={image} alt="image" className="mb-3 w-40 h-auto rounded-md shadow-sm" />
                      </>
                    ) : prevImage && prevImage !== "" ? (
                      <>
                        <img src={prevImage} alt="previmage" className="mb-3 w-40 h-auto rounded-md shadow-sm" />
                      </>
                    ) : (
                      <>
                        {image && image !== "" ? <button
                          onClick={() => setImage(null)}
                          className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                        >
                          Eliminar Imagen
                        </button> : ""}

                        <p className="text-gray-400 text-sm">No hay imagen seleccionada</p></>
                    )}

                  </div>
                  <label className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Seleccionar Imagen
                    <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  </label>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    id="isOfert"
                    class="w-5 h-5 accent-green-500"
                    type="checkbox"
                    name="isOfert"
                    // onChange={handleInputChange}
                    value={isOfert}
                  ></input>
                  <label className="text-gray-700">
                    Desea destacarlo como oferta?
                  </label>

                </div>


                {/* Mostrar precio en la web */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showprice"
                    className="w-5 h-5 accent-green-500"
                    checked={showPriceOnWeb}
                    onChange={() => setShowPriceOnWeb(!showPriceOnWeb)}
                  />
                  <label htmlFor="showprice" className="text-gray-700">
                    Mostrar precio en la web
                  </label>
                </div>

                {showPriceOnWeb && (
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-gray-700 font-medium">
                      Seleccionar precio a mostrar:
                    </label>

                    <select
                      value={webPrice === "custom" ? "custom" : webPrice}
                      onChange={handlePriceChange}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value={price0}>Precio: ${price0}</option>
                      <option value={pricetarjeta}>Precio Tarjeta: ${pricetarjeta}</option>
                      <option value={pricesi}>Precio sin IVA: ${pricesi}</option>
                    </select>

                    {webPrice === "custom" && (
                      <input
                        type="number"
                        placeholder="Ingresar precio"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
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

            <div className=" flex gap-4 mt-4">
              <button
                type="submit"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Editar Producto
              </button>
              <button
                type="submit"
                onClick={() => navigate("/show-messages")}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff4d4f]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancelar
              </button>
              { loading ? <Spinner/> :"" }
            </div>
          </Form>
        )}
      </Formik>
    </div>
</>  );
};

export default EditProduct;