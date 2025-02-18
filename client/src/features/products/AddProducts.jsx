import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
// 👉 por ahora no desactivada: import { createProduct } from "./ProductsSlice";
import { getAllCategories } from "../../app/actions/categories";
import { getAllFamilies } from "../../app/actions/families";
// 👉 por ahora no desactivada: import { fetchProducts } from "./ProductsSlice";
import "../../App.css";
import { productAdd } from "../../app/actions/products";
import Spinner from "../../Components/spinner";

const AddProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);
  const location = useLocation();
  const {
    isOfert,
    showprice,
    webprice: initialWebPrice,
  } = location.state || {};
  const providers = useSelector((state) => state.groupsReducer.groups);
  const families = useSelector((state) => state.familiesReducer.families);

  const [price, setPrice] = useState(0)
  const [pricetarjeta, setPriceTarjeta] = useState(0)
  const [price3, setPrice3] = useState(0)

  // const [costoprod, setCostoProd] = useState(0)
  // const [porcentaje, setPorcentaje] = useState(0)
  // const [porcenTarje, setPorcenTarje] = useState(0)
  // const [eliva21, setElIVA21] = useState(21)
  // const [changePrice, setChangePrice] = useState(false)
  // const [changePriceT, setChangePriceT] = useState(false)
  const [image, setImage] = useState(null);
  // const [showProduct, setShowProduct] = useState(false);

  const familyOptions = useSelector((state) => state.familiesReducer.families);

  const [viewWeb, setViewWeb] = useState(false)
  const [showPriceOnWeb, setShowPriceOnWeb] = useState(showprice);
  const [webPrice, setWebPrice] = useState(initialWebPrice || price);
  const [customPrice, setCustomPrice] = useState("");
   const [loading, setLoading] = useState(false)

  /* 👇 ya fueron obtenidos en main y por eso los tomo en las 2 lineas anteriores 👆
    useEffect(() => {
      dispatch(getAllCategories());
      dispatch(getAllFamilies());
    }, [dispatch]); 
  */

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre del producto es requerido"),
    description: Yup.string().optional(),
    article: Yup.string().required("Por favor ingrese un articulo para este producto"),
    stock: Yup.number().required("El stock es requerido").integer("Debe ser un número entero"),
    cost: Yup.number().required("El costo es requerido").positive("Debe ser un número positivo"),
    percent: Yup.number().required("Debe ser un número positivo"),
    price: Yup.number().required("El precio es requerido"),
    iva21: Yup.number().positive("Debe ser un número positivo"),
/*     iva10: Yup.number().positive("Debe ser un número positivo"),
     price1: Yup.number().positive("Debe ser un número positivo"),
     price2: Yup.number().positive("Debe ser un número positivo"),
*/    prov_code: Yup.number().required("El proveedor es requerido"),
    families: Yup.number().required("El rubro es requerido"),
  });

  const onChangePercent = () => {
    var costo = document.getElementsByName('cost')[0].value === null ? 0 : parseFloat(document.getElementsByName('cost')[0].value);
    var percent = document.getElementsByName('percent')[0].value === null ? 0 : parseFloat(document.getElementsByName('percent')[0].value);
    var iva21 = document.getElementsByName('iva21')[0].value === null ? 0 : parseFloat(document.getElementsByName('iva21')[0].value);
    var siniva = costo * (percent / 100) + costo
    var precio = siniva * (iva21 / 100) + siniva
    setPrice(Math.round(precio * 100) / 100)
    setPrice3(Math.round(siniva * 100) / 100)
    var percenTarje = document.getElementsByName('price1')[0].value === null ? 0 : parseFloat(document.getElementsByName('price1')[0].value);
    var precioTarje = price * (percenTarje / 100) + parseFloat(price)
    setPriceTarjeta(Math.round(precioTarje * 100) / 100)
  }

  const onChangePercentT = () => {
    /*   var costo = document.getElementsByName('cost')[0].value === null ? 0 : parseFloat(document.getElementsByName('cost')[0].value);
      var percent = document.getElementsByName('percent')[0].value === null ? 0 : parseFloat(document.getElementsByName('percent')[0].value); */
    var percenTarje = document.getElementsByName('price1')[0].value === null ? 0 : parseFloat(document.getElementsByName('price1')[0].value); //price1 se usa para porcentaje tarjeta
    /* var iva21 = document.getElementsByName('iva21')[0].value === null ? 0 : parseFloat(document.getElementsByName('iva21')[0].value);
    var siniva = costo * (percent / 100) + costo 
    var precio = siniva * (iva21 / 100) + siniva */
    var precioTarje = price * (percenTarje / 100) + parseFloat(price)
    console.log(price, percenTarje / 100)
    setPriceTarjeta(Math.round(precioTarje * 100) / 100)
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
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

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-6 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar Producto
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: "", description: "", stock: 0, cost: 0, percent: 0, price: 0, iva21: 21, iva10: "", price1: 0, price2: 0, prov_code: "", families: [], article: "",
          isOfert: false,
          imageurl: "",
          imagepid: "",
          show: false,
          showprice: false,
          webprice: 0,
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const productData = {
            name: values.name,
            description: values.description,
            stock: values.stock,
            cost: values.cost,
            percent: values.percent,
            price: price,
            price3: price3,
            iva21: values.iva21,
            iva10: values.iva10,
            price1: values.price1,
            price2: pricetarjeta,
            prov_code: values.prov_code,
            families: values.families,
            userid: login?.id,
            article: values.article,
            isOfert: values.isOfert,
            imageurl: values.imageurl,
            imagepid: values.imagepid,
            show: viewWeb,
            showprice: values.showprice,
            webprice: values.webprice,
            image: image,
          };
          console.table(productData)
          { setLoading(true) }
          await dispatch(productAdd(productData));
          { setLoading(false) }
          const success = JSON.parse(localStorage.getItem("productAdded"));
          console.log("Objeto", success);
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Producto agregado. ¿Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm();
              } else {
                navigate("/show-messages");
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("productAdded"), // "Hubo un problema al agregar el producto.",
              icon: "error",
            });
          }
          setSubmitting(false);
        }}



      >
        {({ values, errors, handleChange, handleBlur, setFieldValue }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre del Producto *</label>
              <Field name="name" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
              {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="article" className="block text-gray-700 text-sm font-bold mb-2">Articulo *</label>
                <Field name="article" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.article && <p className="text-red-500 text-xs italic">{errors.article}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Descripción (Opcional)</label>
                <Field name="description" type="text" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock *</label>
                <Field name="stock" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
              </div>

              <div>
                <label htmlFor="cost" className="block text-gray-700 text-sm font-bold mb-2">Costo *</label>
                <Field name="cost" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.cost && <p className="text-red-500 text-xs italic">{errors.cost}</p>}
              </div>

              <div>
                <label htmlFor="percent" className="block text-gray-700 text-sm font-bold mb-2">Porcentaje de Ganancia</label>
                <Field name="percent" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" onBlur={(e) => onChangePercent(e)} />
                {errors.percent && <p className="text-red-500 text-xs italic">{errors.percent}</p>}
              </div>
              <div>
                <label htmlFor="iva21" className="block text-gray-700 text-sm font-bold mb-2">IVA 21%</label>
                <Field name="iva21" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.iva21 && <p className="text-red-500 text-xs italic">{errors.iva21}</p>}
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Precio *</label>
                <Field name="price" type="number" value={price} className="form-input mt-1 block w-full border border-gray-300 rounded px-1" onChange={(e) => setPrice(e.target.value)} />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="price1" className="block text-gray-700 text-sm font-bold mb-2">% Tarjeta</label>
                <Field name="price1" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" onBlur={(e) => onChangePercentT(e)} />
                {errors.price1 && <p className="text-red-500 text-xs italic">{errors.price1}</p>}
              </div>

              {/* <div>
                <label htmlFor="iva10" className="block text-gray-700 text-sm font-bold mb-2">IVA 10.5%</label>
                <Field name="iva10" type="number" className="form-input mt-1 block w-full border border-gray-300 rounded px-1" />
                {errors.iva10 && <p className="text-red-500 text-xs italic">{errors.iva10}</p>}
              </div> */}



              <div>
                <label htmlFor="price2" className="block text-gray-700 text-sm font-bold mb-2">Precio Tarjeta 2</label>
                <Field name="price2" type="number" value={pricetarjeta} className="form-input mt-1 block w-full border border-gray-300 rounded px-1" onChange={(e) => setPriceTarjeta(e.target.value)} />
                {errors.price2 && <p className="text-red-500 text-xs italic">{errors.price2}</p>}
              </div>
              <div>
                <label htmlFor="price3" className="block text-gray-700 text-sm font-bold mb-2">Precio s/Iva</label>
                <Field name="price3" type="number" value={price3} className="form-input mt-1 block w-full border border-gray-300 rounded px-1" onChange={(e) => setPrice3(e.target.value)} />
                {/* {errors.price3 && <p className="text-red-500 text-xs italic">{errors.price3}</p>} */}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="prov_code" className="block text-gray-700 text-sm font-bold mb-2">Proveedor *</label>
              <select
                name="prov_code"
                value={values.prov_code}
                onChange={handleChange}
                onBlur={handleBlur}

                className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
              >
                <option value="">Seleccionar proveedor</option>
                {providers.map(provider => (
                  <option key={provider.id} value={provider.code}>{provider.name}</option>
                ))}
              </select>
              {errors.prov_code && <p className="text-red-500 text-xs italic">{errors.prov_code}</p>}
            </div>

            <div className="mb-6">
              <label htmlFor="families" className="block text-gray-700 text-sm font-bold mb-2">
                Rubro/Familia *
              </label>
              {/* Selector múltiple */}
              <div className="relative">
                <select
                  name="families"
                  value="" // Siempre vacío para forzar selección nueva
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    if (selectedId && !values.families.includes(selectedId)) {
                      setFieldValue("families", [...values.families, selectedId]); // Añadir selección
                    }
                  }}
                  onBlur={handleBlur}
                  className="form-input mt-1 block w-full border border-gray-300 rounded px-1 bg-white"
                >
                  <option value="" disabled>
                    Seleccionar rubro/familia
                  </option>
                  {families
                    .filter((family) => !values.families.includes(family.id.toString())) // Filtrar seleccionados
                    .map((family) => (
                      <option key={family.id} value={family.id}>
                        {family.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Familias seleccionadas */}
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
              {errors.families && <p className="text-red-500 text-xs italic">{errors.families}</p>}
            </div>
            <div class="mb-6 flex items-center gap-3">
              <input
                id="show"
                className="w-5 h-5 accent-blue-500"
                type="checkbox"
                name="show"
                checked={viewWeb}
                onChange={() => setViewWeb(!viewWeb)}
              />
              <label class="text-gray-700 font-medium">Mostrar producto en la web</label>



            </div>
            {viewWeb && (
              <div className="space-y-6">

                {/* Imagen del producto */}
                <div className="flex flex-col items-center">
                  <div className="mt-2 flex flex-col items-center border border-gray-300 p-4 rounded-lg w-64">
                    {image ? (
                      <>
                        <img src={image} alt="" className="mb-3 w-40 h-auto rounded-md shadow-sm" />
                        <button
                          onClick={() => setImage(null)}
                          className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                        >
                          Eliminar Imagen
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-400 text-sm">No hay imagen seleccionada</p>
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
                    className="w-5 h-5 accent-green-500"
                    type="checkbox"
                    name="isOfert"
                    checked={isOfert}
                    onChange={() => setFieldValue("isOfert", !isOfert)}
                  />

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
                      <option value={price}>Precio: ${price}</option>
                      <option value={pricetarjeta}>Precio Tarjeta: ${pricetarjeta}</option>
                      <option value={price3}>Precio sin IVA: ${price3}</option>
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
            {/*             <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Imagen del Producto
              </label>

              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg w-64 mx-auto">
                {image ? (
                  <>
                    <img src={image} alt="Previsualización" className="mb-3 w-40 h-auto rounded-md shadow-sm" />
                    <button
                      onClick={() => setImage(null)}
                      className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                    >
                      Eliminar Imagen
                    </button>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">No hay imagen seleccionada</p>
                )}
              </div>

              <label className="mt-3 block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Seleccionar Imagen
                <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              </label>
            </div>

             {showProduct && (
              <>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Imagen del Producto</label>
                  <input type="file" accept="image/*" onChange={handleImage} className="mt-2" />
                  {image && <img src={image} alt="Previsualización" className="mt-2 w-32 h-auto" />}
                </div>
              </>
            )}

 */}
               <div className="flex gap-4 mt-4">

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Producto
            </button>
            <button 
              type="button"
              onClick={() => navigate("/show-messages")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ff4d4f]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </button>
            { loading ? <Spinner/> :"" }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};



export default AddProducts;
