// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import { createProduct } from "../../app/actions/products";
// import "../../App.css";

// const AddProduct = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const login = useSelector((state) => state.usersReducer.login);

//   const schema = Yup.object().shape({
//     name: Yup.string().required("El nombre del producto es requerido"),
//     description: Yup.string()
//       .required("La descripción es requerida")
//       .min(4, "Al menos 4 caracteres"),
//   });

//   return (
//     <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
//       <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
//         Agregar Producto
//       </h2>
//       <Formik
//         validationSchema={schema}
//         initialValues={{ name: "", description: "" }}
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//           const product = {
//             name: values.name,
//             description: values.description,
//             userid: login.id,
//           };
//           await dispatch(createProduct(product));
//           const success = JSON.parse(localStorage.getItem("productAdded"));
//           if (success && success === true) {
//             Swal.fire({
//               title: "¡Genial!",
//               text: "Producto agregado \n ¿Desea seguir agregando?",
//               icon: "success",
//               showDenyButton: true,
//               confirmButtonText: "Sí",
//               denyButtonText: "No",
//             }).then((result) => {
//               if (result.isConfirmed) {
//                 resetForm({ name: "", description: "" });
//               } else if (result.isDenied) {
//                 navigate("/show-products");
//               }
//             });
//           } else {
//             Swal.fire({
//               title: "Error",
//               text: localStorage.getItem("errorInfo"),
//               icon: "error",
//             });
//           }
//           setSubmitting(false);
//         }}
//       >
//         {({ values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
//           <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                 Nombre:
//               </label>
//               <input
//                 type="text"
//                 className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
//                 id="name"
//                 name="name"
//                 value={values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.name ? <p className="text-red-500 text-xs italic">{errors.name}</p> : ""}
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//                 Descripción:
//               </label>
//               <input
//                 type="text"
//                 className="form-input mt-1 block w-full border border-gray-300 rounded px-1"
//                 id="description"
//                 name="description"
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               {errors.description ? <p className="text-red-500 text-xs italic">{errors.description}</p> : ""}
//             </div>
//             <button
//               type="submit"
//               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0e6fa5] hover:bg-[#0e6fa5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Agregar Producto
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddProduct;
