import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { configUpdate } from "../../app/actions/configs";

export const REACT_APP_API = process.env.REACT_APP_API

const EditMessages = () => {
  const location = useLocation();
  const dispatch = useDispatch();
//   const login = useSelector((state) => state.usersReducer.login);
  const [id] = useState(location.state.id);
  const [name, setBusiness] = useState(location.state.name);
  const [address, setSlogan] = useState(location.state.address);
  const navigate = useNavigate();
//   const userqr = useSelector((state) => state.usersReducer.qrCode);

//   const verQR = () => {
//     dispatch(getQRUser(login.username, login.password));
//     if (login.backwa === "") {
//       console.log("No hay instancia creada");
//     } else {
//       console.log("Instancia creada");
//     }
//   };

  useEffect(() => {
    // verQR();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(configUpdate({ id, name }));
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
            value={name}
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
            value={address}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Actualizar
        </button>
      </form>

    </div>
  );
};

export default EditMessages;
