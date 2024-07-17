import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { configUpdate } from "../../app/actions/configs";
import { getQRUser, addInstance, getUser, loginUpdate } from "../../app/actions/users";
import { QRCode } from 'react-qrcode-logo';

export const REACT_APP_API = process.env.REACT_APP_API

const EditConfig = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.usersReducer.login);
  const [id] = useState(location.state.id);
  const [business, setBusiness] = useState(location.state.business);
  const [slogan, setSlogan] = useState(location.state.slogan);
  const navigate = useNavigate();
  const userqr = useSelector((state) => state.usersReducer.qrCode);

  const verQR = () => {
    dispatch(getQRUser(login.username, login.password));
    if (login.backwa === "") {
      console.log("No hay instancia creada");
    } else {
      console.log("Instancia creada");
    }
  };

  useEffect(() => {
    // verQR();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(configUpdate({ id, business, slogan }));
    navigate("/", { replace: true });
  };

  return (
    <div className="container mx-auto px-4 py-5 w-full flex flex-col flex-grow">
      <h2 className="text-center text-2xl font-semibold mb-6">Configuración del Sistema</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-auto"
      >
        <div className="mb-4">
          <label htmlFor="business" className="block text-gray-700 font-semibold mb-2">
            Business:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            id="business"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slogan" className="block text-gray-700 font-semibold mb-2">
            Slogan:
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            id="slogan"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update Config
        </button>
      </form>
      <div className="flex flex-col items-center mt-8">
        {login.backwa ?
          login.vinculated === false ? (
            <>
              <label className="block text-center text-gray-700 font-semibold mb-4">Vincule su WhatsApp</label>
              <img src={`https://backend.sib-2000.com.ar/wapp/qr/${login.backwa}`} alt="Qr image" />
              {/*  <QRCode value={userqr} size={256} /> */}
              <button
                onClick={verQR}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-10"
              >
                Refresh QR
              </button>
              {/* <div className="text-center text-gray-600 mt-4 mb-4">
              Si en tu celu dice no se inició sesión, refresca el QR. <br />
              Si inició sesión en celu, cierra sesión aquí y vuelve a entrar.
            </div> */}
            </>
          ) : (
            <p className="text-green-600 font-semibold">Cuenta vinculada</p>
          ) : "Aun no posee nstancia para vincular su whatsapp"}
      </div>
    </div>
  );
};

export default EditConfig;
