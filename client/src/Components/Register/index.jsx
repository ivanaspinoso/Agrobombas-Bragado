import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { userAdd } from '../../app/actions/users';
import Swal from 'sweetalert2';
import { configAdd } from '../../app/actions/configs';
import { cateAdd } from '../../app/actions/categories';
import "../../App.css"

import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { useState } from 'react';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = Yup.object().shape({
        phoneNumber: Yup.string().required("Tu celular es requerido").matches(phoneRegExp, 'Phone number is not valid').max(13, "Máximo 13 caracteres numericos"),
        name: Yup.string().required("Tu nombre es requerido"),
        username: Yup.string().required("Usuario es requerido"),
        password: Yup.string().required("Contraseña es requerida").min(4, "Password must be at least 4 characters"),
        repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').min(4, "Re Password must be at least 4 characters").required("Re ingrese Contraseña"),
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
        <div className="container mt-5">
            <h2
                className="text-center text-uppercase m-5"
                style={{ letterSpacing: "5px", fontWeight: "ligher" }}
            >
                Formulario de registro
            </h2>
            <Formik
                validationSchema={schema}
                initialValues={{ username: "", password: "", phoneNumber: "", name: "" }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log('Logging in', values);
                    const userNew = {
                        name: values.name,
                        password: values.password,
                        username: values.username,
                        cellphone: values.phoneNumber,
                        isAdmin: false,
                        active: false,
                        autoreplys: false,
                        autobots: false
                    }
                    await dispatch(userAdd(userNew))
                    console.log("Usuario", localStorage.getItem("userAdded"))
                    if (localStorage.getItem("userAdded") && localStorage.getItem("userAdded") >= 0) {
                        console.log()
                        const objConf = {
                            business: values.name,
                            userid: localStorage.getItem("userAdded")
                        }
                        const objGroup = {
                            category: "Default",
                            description: "Categoría por defecto",
                            undelete: true,
                            userid: localStorage.getItem("userAdded")
                        }
                        await dispatch(configAdd(objConf))
                        await dispatch(cateAdd(objGroup))
                        Swal.fire({
                            title: "Genial!",
                            text: "Usuario registrado con éxito!",
                            icon: "success"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                resetForm({ values: "" })
                                navigate("/", { replace: true });
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: localStorage.getItem("userAdded"),
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
                                <label className='form-label' htmlFor='Usuario'>Nombre</label>
                                <input
                                    className='form-control'
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Ingresa tu Nombre'
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name ? <p className="error">
                                    {errors.name && touched.name && errors.name}
                                </p> : ""}
                                <label className='form-label' htmlFor='Usuario'>Celular</label>
                                <input
                                    className='form-control'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    type='text'
                                    placeholder='Tu WA formato: 5491144445555'
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.phoneNumber ? <p className="error">
                                    {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                                </p> : ""}
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
                                {errors.username ? <p className="error">
                                    {errors.username && touched.username && errors.username}
                                </p> : ""}
                                <span className="flex justify-around items-center" onClick={handleToggle}>
                                    <Icon className="absolute mr-10" icon={icon} size={18} />
                                </span>
                                <label className='form-label' htmlFor='password'> - Contraseña</label>
                                <input
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    type={type}
                                    placeholder='Ingresa tu contraseña'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password ? <p className="error">
                                    {errors.password && touched.password && errors.password}
                                </p> : ""}
                                <label className='form-label' htmlFor='reassword'>Confirme Contraseña</label>
                                <input
                                    className='form-control'
                                    id='repassword'
                                    name='repassword'
                                    type={type}
                                    placeholder='Confirma tu contraseña'
                                    value={values.repassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.repassword ? <p className="error">
                                    {errors.repassword && touched.repassword && errors.repassword}
                                </p> : ""}
                                <div className='d-flex justify-content-around'>
                                    <button type='sumit' disabled={isSubmitting}>Registrarme</button>
                                    <div>Si ya tienes cuenta<button onClick={() => { navigate("/login") }}>Login</button></div>
                                </div>
                            </Form>
                        );
                    }
                }
            </Formik>
        </div>
    )
}

export default Register;