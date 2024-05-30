import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { getUser } from '../../app/actions/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import "../../App.css"
import logo from "../../assets/images/logo64.png";
import { Link } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const LogIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const schema = Yup.object().shape({
        username: Yup.string().required("Usuario es requerido"),
        password: Yup.string()
        .required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
    });

    // show/hide password
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);   
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-green-500 to-white flex items-center justify-center">
             <div className="absolute top-4 left-4">
                <Link to="/" className="text-white text-xl font-semibold hover:text-gray-500 transition duration-300 flex flex-row gap-4 justify-center items-center">
                    <img src={logo} alt="Logo Wapp Message System" className="w-8 h-8" />
                    WApp Message System
                </Link>
            </div>
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-center text-2xl font-bold mb-5">
                    WappSystem
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
                                <Form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Usuario</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Ingresa tu Usuario"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.username && touched.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                                    </div>
                                    <div className="relative">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Contraseña</label>
                                        <input
                                            className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            name="password"
                                            type={type}
                                            placeholder="Ingresa tu contraseña"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <span className="absolute inset-y-0 pt-6 right-0 pr-3 flex items-center cursor-pointer" onClick={handleToggle}>
                                            <Icon icon={icon} size={20} />
                                        </span>
                                        {errors.password && touched.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                    </div>
                                    <div className="flex items-center justify-between row">
                                        <button type="submit" disabled={isSubmitting} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            LogIn
                                        </button>
                                        <div className='flex flex-row items-center justify-center'>
                                        <a href="/register" className="inline-block align-baseline font-semibold text-sm hover:text-green-700 pr-1">
                                        No tienes cuenta?
                                        </a>
                                        <a href="/register" className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-700">
                                            Regístrate
                                        </a>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}

export default LogIn;
