import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCategory } from "../../app/actions/categories";

import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';

const EditGroup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [category, setCategory] = useState(location.state.category);
  const [description, setDescription] = useState(location.state.description);

  const navigate = useNavigate();

  /*
     const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateCategory({ id, category, description }));
      navigate("/show-groups", { replace: true });
    };
   */

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
        Edit Group
      </h2>
      <Formik
        validationSchema={schema}
        initialValues={{ category, description }}
        onSubmit={async (values, { setSubmitting, resetForm },) => {
          const category = {
            category: values.category,
            description: values.description,
            id: id
          }
          dispatch(updateCategory(category));
          const success = JSON.parse(localStorage.categoryUpdated)
          console.log("objeto", success)
          if (success && success === true) {
            Swal.fire({
              title: "Genial!",
              text: "Grupo de contactos modificado!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                resetForm({ categrory: "", description: "" })
                navigate("/show-groups", { replace: true });
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
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error">
                  {errors.description && touched.description && errors.description}
                </p>
                <button
                  type="submit"
                  className="btn "
                  style={{ background: "#006877", color: "white" }}
                >
                  Update Group
                </button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  );
};

export default EditGroup;