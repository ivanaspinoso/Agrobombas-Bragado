import contacto from '../../assets/images/contactos.jpg';
import mensaje from '../../assets/images/mensajes.jpg'
import reloj from '../../assets/images/reloj.jpg'
import autoreply from '../../assets/images/autoreply.jpg'
import config from '../../assets/images/configuracion.webp'
import { useNavigate } from 'react-router-dom';
import { getAllContacts } from '../../app/actions/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../spinner';

const Main = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const config = useSelector((state) => state.contactsReducer.contacts);
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        // Obtener todos los  datos del sistema
        async function fetchData() {
            if (config.length <= 0) {
                await dispatch(getAllContacts());
            }
            setIsLoading(false)
        }
        fetchData()
    }, []
    );


    return (<>
        {!isloading ?
            <div className="container my-12 mx-auto px-4 md:px-12">
                <header>
                    <h1 className="text-3xl font-bold">
                        Control Panel
                    </h1>
                </header>
                <div className="row row-cols-1 row-cols-md-3">
                    <div className="card" /* style={{"width": "18rem;"}} */>
                        <img src={contacto} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Contactos</h5>
                            <p className="card-text">ABM de contactos. Ingrese aquí los destinatarios de su sistema.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-contacts") }}>Ir</button>
                        </div>
                    </div>
                    <div className="card" /* style={{"width": "18rem;"}} */>
                        <img src={mensaje} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Mensajes</h5>
                            <p className="card-text">ABM de mensajes. Aquí puede cargar sus mensajes inmediatos o programados.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-books") }}>Ir</button>
                        </div>
                    </div>
                    <div className="card" /* style={{"width": "18rem;"}} */>
                        <img src={reloj} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Cola de mensajes</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-books") }}>Ir</button>
                        </div>
                    </div>
                    <div className="card" /* style={{"width": "18rem;"}} */>
                        <img src={autoreply} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Autorespuestas</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-books") }}>Ir</button>
                        </div>
                    </div>
                    <div className="card" /* style={{"width": "18rem;"}} */>
                        <img src={config} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Configuracion</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-books") }}>Ir</button>
                        </div>
                    </div>
                </div>
            </div > : <Spinner />}</>)
}

export default Main