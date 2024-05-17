import contacto from '../../assets/images/contactos.jpg';
import mensaje from '../../assets/images/mensajes.jpg'
import reloj from '../../assets/images/reloj.jpg'
import receipts from '../../assets/images/recibidos.avif'
import config from '../../assets/images/configuracion.webp'
import grupos from '../../assets/images/grupos.jpg'
import enviados from "../../assets/images/whatsapp-enviado.webp"
import autoreplys from "../../assets/images/autoreply.jpg"
import bots from "../../assets/images/botswapp.webp"
import { useNavigate } from 'react-router-dom';
import { getUserContacts } from '../../app/actions/contacts';
import { getConfig } from '../../app/actions/configs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../spinner';
import { getUserCategories } from '../../app/actions/categories';
import { getUserMessages } from '../../app/actions/messages';
import { getAllUsers, getQRUser } from '../../app/actions/users';
import { getUserReceipts } from '../../app/actions/receipts';

const Main = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const configs = useSelector((state) => state.configsReducer.configs);
    const [vincu, setVincu] = useState("")

    const [isloading, setIsLoading] = useState(true)

    var login = {}

    // Obtener todos los  datos del sistema
    if (!localStorage.getItem("userInfo")) {
        login = { id: 0 }
        // console.log("Not exist localStorage")
    } else if (localStorage.getItem("userInfo") === undefined) {
        login = { id: 0 }
        // console.log("Undefined localStorage")
    } else {
        login = JSON.parse(localStorage.getItem("userInfo"))
        // console.log("Obtenido userInfo", localStorage.getItem("userInfo"))
    }

    // ("login", login)
    async function fetchData() {
        if (login.id) {

            dispatch(getConfig(login.id))
            dispatch(getUserContacts(login.id));
            dispatch(getUserCategories(login.id));
            dispatch(getUserMessages(login.id))
            dispatch(getQRUser(login.username, login.password))
            if (login.isAdmin) {
                dispatch(getAllUsers())
            }

            // await dispatch(getUser(login.username, login.password))
            // «("QRobten",QRobten)


        } else {
            navigate("/login")
        }

    }


    useEffect(() => {
        console.clear()
        console.log("Iniciando sistema...")
        // ("id de usuario" + login.id)
        if (!localStorage.getItem("appConfig")) fetchData()

        const QRobten = login.vinculated
        // console.log(QRobten)
        QRobten === false ? setVincu("Aun no se ha vinculado su WhatsApp") : setVincu("Su cuenta vinculada a WhatsApp")
        setIsLoading(false)
    }, []
    );

    return (<>
        {!isloading ?
            <div className="container my-12 mx-auto px-4 md:px-12">
                <header>
                    <h1 className="d-flex center-flex aligns-items-center justify-content-center">
                        Control Panel de {configs.business}
                    </h1>
                    <div>
                        <h3 className="d-flex center-flex aligns-items-center justify-content-center">{vincu}</h3>
                    </div>
                </header>
                <div className="row"> {/* row row-cols-1 row-cols-md-3 */}
                    <div className="card" style={{ "width": "18rem" }}>
                        <img src={grupos} className="card-img-top" alt="ABM de grupos" />
                        <div className="card-body">
                            <h5 className="card-title">Grupos de Contacto</h5>
                            <p className="card-text">ABM de grupos. Ingrese aquí los grupos para asignar destinatarios.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-groups") }}>Grupos</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }}>
                        <img src={contacto} className="card-img-top" alt="ABM de contactos" />
                        <div className="card-body">
                            <h5 className="card-title">Contactos</h5>
                            <p className="card-text">ABM de contactos. Ingrese aquí los destinatarios de su sistema.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-contacts") }}>Contactos</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }}>
                        <img src={mensaje} className="card-img-top" alt="ABM de Mensajes" />
                        <div className="card-body">
                            <h5 className="card-title">Mensajes</h5>
                            <p className="card-text">ABM de mensajes. Aquí puede cargar sus mensajes inmediatos o programados.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-messages") }}>Mensajes</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }}>
                        <img src={reloj} className="card-img-top" alt="Mensajes en espera" />
                        <div className="card-body">
                            <h5 className="card-title">Cola de mensajes</h5>
                            <p className="card-text">Listado de mensajes que estén programados o aún no hayan sido enviados. Podrá editarlos antes de su envío</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/queue-messages") }}>En espera</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }} >
                        <img src={enviados} className="card-img-top" alt="Mensajes enviados" />
                        <div className="card-body">
                            <h5 className="card-title">Mensajes Enviados</h5>
                            <p className="card-text">Listado de mensajes que ya han sido enviados.</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/sended-messages") }}>Enviados</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }}>
                        <img src={receipts} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Recibidos</h5>
                            <p className="card-text">Aquí podrá ver los mensajes recibidos (aunque también los verá en celu asociado)</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-receipts") }}>Recibidos</button>
                        </div>
                    </div>
                    <div className="card" style={{ "width": "18rem" }} >
                        <img src={config} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Configuracion</h5>
                            <p className="card-text">Edite datos de su empresa. Y además se usará para vincular el WhatsApp®</p>
                            <button className="btn btn-primary" onClick={() => { navigate("/show-configs") }}>Configuraciones</button>
                        </div>
                    </div>


                    <div className="card" style={{ "width": "18rem" }} >
                        <img src={autoreplys} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Autorespuestas</h5>
                            <p className="card-text">Defina autorespuestas según disparador.</p>
                            {login.autoreplys === true ? <>
                                <button className="btn btn-primary" onClick={() => { navigate("/show-users") }}>Autorespuestas</button></> :
                                <><button className="btn btn-primary" onClick={() => { navigate("/opcional") }}>Opcional proximamente</button></>
                            }
                        </div>
                    </div>

                    <div className="card" style={{ "width": "18rem" }} >
                        <img src={bots} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Bots</h5>
                            <p className="card-text">Genere bots personalizados</p>
                            {login.autobots === true ?
                                <>
                                    <button className="btn btn-primary" onClick={() => { navigate("/show-users") }}>Bots</button></> :
                                <><button className="btn btn-primary" onClick={() => { navigate("/opcional") }}>Opcional Próximamente</button></>
                            }
                        </div>
                    </div>
                    {login.isAdmin === true ?
                        <>
                            <div className="card" style={{ "width": "18rem" }} >
                                <img src={contacto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Usuarios</h5>
                                    <p className="card-text">Control de usuarios del sistema.</p>
                                    <button className="btn btn-primary" onClick={() => { navigate("/show-users") }}>Usuarios</button>
                                </div>
                            </div>
                            <div className="card" style={{ "width": "18rem" }} >
                                <img src={contacto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Contactos</h5>
                                    <p className="card-text">Contacto de los usuarios.</p>
                                    <button className="btn btn-primary" onClick={() => { navigate("/show-allcontacts") }}>Contactos</button>
                                </div>
                            </div>
                            <div className="card" style={{ "width": "18rem" }}>
                                <img src={contacto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Grupos</h5>
                                    <p className="card-text">Grupos de Contacto de los usuarios.</p>
                                    <button className="btn btn-primary" onClick={() => { navigate("/show-allgroups") }}>Grupos</button>
                                </div>
                            </div>
                        </> : ""}
                </div>
            </div > : <Spinner />}</>)
}

export default Main