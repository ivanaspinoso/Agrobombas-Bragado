import React from 'react';
import { Formik, Form } from 'formik';
import { getUser } from '../../app/actions/users';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* import * as Yup from 'yup';
 */

const LogIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /*       const validationSchema={Yup.object().shape({
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required').min(8, "La contraseña es muy corta - minimo 8 caracteres").matches(/(?=.*[0-9])/, "La contraseña debe contener un numero") 
        })}   */

    return (
        <div className='container sm'>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setSubmitting }) => {
                    console.log('Logging in', values);
                    await dispatch(getUser(values.username, values.password))
                    const idUser = JSON.parse(localStorage.userInfo)
                    console.log("objeto",idUser)
                    if (idUser.id > 0 ) {
                        alert(idUser.id)
                        navigate("/")
                        setSubmitting(false);
                    }
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
                            <Form onSubmit={handleSubmit}>
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
                                <button type='sumit' disabled={isSubmitting}>LogIn</button>
                            </Form>
                        );
                    }
                }
            </Formik>
        </div>
    )
}

export default LogIn;