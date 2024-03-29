import React from 'react';
import { Formik, Form } from 'formik';
import { getUser } from '../../app/actions/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import "../../App.css"

const LogIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const schema = Yup.object().shape({
        username: Yup.string().required("Usuario es requerido"),
        //.username("Invalid email format"),
        password: Yup.string()
            .required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
    });

    return (
        <div className="container mt-5">
            <h2
                className="text-center text-uppercase m-5"
                style={{ letterSpacing: "5px", fontWeight: "ligher" }}
            >
                Ingreso al sistema
            </h2>
            <Formik
                validationSchema={schema}
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log('Logging in', localStorage.getItem("allowLogin"));
                    await dispatch(getUser(values.username, values.password))
                    if (localStorage.getItem("allowLogin") === 'true') {
                        navigate("/")
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
                                <label className='form-label' htmlFor='Usuario'>Usuario</label>
                                <input
                                    className='form-control'
                                    id='username'
                                    name='username'
                                    type='text'
                                    placeholder='Ingresa tu Usuario'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.username && touched.username && errors.username}
                                </p>
                                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                                <label className='form-label' htmlFor='password'>Password</label>
                                <input
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    type='password'
                                    placeholder='Ingresa tu contraseña'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {/* If validation is not passed show errors */}
                                <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p>
                                {/* Click on submit button to submit the form */}
                                <div className='d-flex justify-content-around'>
                                    <div><button type='sumit' disabled={isSubmitting}>LogIn</button></div>
                                    <div>Si no tienes cuenta<button onClick={() => { navigate("/register") }}>Register</button></div>
                                </div>
                            </Form>
                        );
                    }
                }
            </Formik>
        </div>
    )
}

export default LogIn;