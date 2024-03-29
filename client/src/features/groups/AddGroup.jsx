import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cateAdd } from "../../app/actions/categories";
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const AddGroup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useSelector((state) => state.usersReducer.login)

  const schema = Yup.object().shape({
    category: Yup.string().required("El grupo es requerido"),
    description: Yup.string().required("Descripcion es requerida").min(4, "Al menos 4"),
  });


  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Add Group
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ category: "", description: "" }}
        onSubmit={async (values, { setSubmitting, resetForm },) => {
          const category = {
            category: values.category,
            description: values.description,
            userid: login.id
          }
          await dispatch(cateAdd(category))
          const success = JSON.parse(localStorage.categoryAdded)
          console.log("objeto", success)
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Grupo de contactos agregado! \n Desea seguir agregando?",
              icon: "success",
              showDenyButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: 'No',
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ categrory: "", description: "" })
              } else if (result.isDenied) {
                navigate("/show-groups")
              }
            });
          } else {
            Swal.fire({
              title: "Error",
              text: localStorage.getItem("userInfo"),
              icon: "error"
            });
          }
          setSubmitting(false);
        }}
      >
        {
          props => {
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
              <Form onSubmit={handleSubmit} 
              className="border rounded p-4"
              style={{ maxWidth: "600px", margin: "auto" }}
              >
                <label htmlFor="title" className="form-label">
                  Group:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error">
                  {errors.category && touched.category && errors.category}
                </p>
                <label htmlFor="author" className="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error">
                  {errors.description && touched.description && errors.description}
                </p>
                <button
                  type="submit"
                  className="btn"
                  style={{ background: "#006877", color: "white" }}
                >
                  Add Group
                </button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  );
};

export default AddGroup;