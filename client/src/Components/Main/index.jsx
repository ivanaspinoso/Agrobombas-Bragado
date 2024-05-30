import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserContacts } from '../../app/actions/contacts';
import { getConfig } from '../../app/actions/configs';
import { getUserCategories } from '../../app/actions/categories';
import { getUserMessages } from '../../app/actions/messages';
import { getAllUsers, getQRUser } from '../../app/actions/users';
import { getUserReceipts } from '../../app/actions/receipts';
import Spinner from '../spinner';
import contacto from '../../assets/images/contactos.jpg';
import mensaje from '../../assets/images/mensajes.jpg';
import reloj from '../../assets/images/reloj.jpg';
import receipts from '../../assets/images/recibidos.avif';
import config from '../../assets/images/configuracion.webp';
import grupos from '../../assets/images/grupos.jpg';
import enviados from "../../assets/images/whatsapp-enviado.webp";
import autoreplys from "../../assets/images/autoreply.jpg";
import bots from "../../assets/images/botswapp.webp";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configs = useSelector((state) => state.configsReducer.configs);
  const login = useSelector((state) => state.usersReducer.login);
  const [vincu, setVincu] = useState("");
  const [isloading, setIsLoading] = useState(true);

  async function fetchData() {
    if (login.id) {
      dispatch(getConfig(login.id));
      dispatch(getUserContacts(login.id));
      dispatch(getUserCategories(login.id));
      dispatch(getUserMessages(login.id));
      dispatch(getQRUser(login.username, login.password));
      if (login.isAdmin) {
        dispatch(getAllUsers());
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!configs.length) fetchData();
    const QRobten = login.vinculated;
    setVincu(QRobten === false ? "Aun no se ha vinculado su WhatsApp" : "Su cuenta vinculada a WhatsApp");
    setIsLoading(false);
  }, []);

  if (isloading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 md:px-12 my-12">
    <header className="text-center mb-8 flex justify-between items-center mx-10">
      <h1 className="text-3xl font-bold">Control Panel de {configs.business}</h1>
      <div className="flex items-center">
        <span>{vincu}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </header>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      {[
        { src: grupos, title: 'Grupos de Contacto', text: 'ABM de grupos. Ingrese aquí los grupos para asignar destinatarios.', link: '/show-groups' },
        { src: contacto, title: 'Contactos', text: 'ABM de contactos. Ingrese aquí los destinatarios de su sistema.', link: '/show-contacts' },
        { src: mensaje, title: 'Mensajes', text: 'ABM de mensajes. Aquí puede cargar sus mensajes inmediatos o programados.', link: '/show-messages' },
        { src: reloj, title: 'Cola de mensajes', text: 'Listado de mensajes que estén programados o aún no hayan sido enviados. Podrá editarlos antes de su envío.', link: '/queue-messages' },
        { src: enviados, title: 'Mensajes Enviados', text: 'Listado de mensajes que ya han sido enviados.', link: '/sended-messages' },
        { src: receipts, title: 'Recibidos', text: 'Aquí podrá ver los mensajes recibidos (aunque también los verá en celu asociado)', link: '/show-receipts' },
        { src: config, title: 'Configuración', text: 'Edite datos de su empresa. Y además se usará para vincular el WhatsApp®', link: '/show-configs' },
        { src: autoreplys, title: 'Autorespuestas', text: 'Defina autorespuestas según disparador.', link: login.autoreplys? '/show-users' : '/opcional' },
        { src: bots, title: 'Bots', text: 'Genere bots personalizados', link: login.autobots? '/show-users' : '/opcional' }
      ].map((item, index) => (
        <div
        key={index}
        className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white p-4 m-2 flex flex-col items-center border border-gray-200"
      >
        <img className="w-full h-48 object-cover mb-4 rounded-md" src={item.src} alt={item.title} />
        <div className="w-full px-4 text-center">
          <h5 className="font-bold text-lg mb-1 text-green-600">{item.title}</h5>
          <p className="text-gray-700 text-base mb-4">{item.text}</p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-colors duration-300"
            onClick={() => navigate(item.link)}
          >
            {item.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="ml-2 h-5 w-5"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      ))}
    </div>
  </div>
  );
};

export default Main
