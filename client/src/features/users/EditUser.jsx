import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userUpdateAdm } from "../../app/actions/users";

const EditUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [name, setName] = useState(location.state.name);
  const [cellphone, setCellphone] = useState(location.state.cellphone);
  const [username, setUsername] = useState(location.state.cellphone);
  const [backwa, setBackwa] = useState(location.state.backwa);
  const [isAdmin, setIsAdmin] = useState(location.state.isAdmin)
  const [vincula, setVincula] = useState(location.state.vinculated)
  const [qrcode, setQrcode] = useState(location.state.qrcode)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAdm = isAdmin
    let vinculated = vincula
    dispatch(userUpdateAdm({ id, backwa, isAdm, vinculated, qrcode }));
    navigate("/show-users", { replace: true });
  };

  return (
    <div className="container mt-5 mb-5">
      <h2
        className="text-center text-xl uppercase m-5 font-semibold"
      >
        Editar Usuario
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-bold text-gray-700">
            Name:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700">
            Cellphone:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cellphone"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
          // required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700">
            Username:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700">
            Back WA:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="backwa"
            value={backwa}
            onChange={(e) => setBackwa(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className=" mr-2 text-sm font-bold text-gray-700">
            is Admin:
          </label>
          <input class="form-check-input h-4 w-4" type="checkbox" value="" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className=" mr-2 text-sm font-bold text-gray-700">
            Vinculated:
          </label>
          <input class="form-check-input h-4 w-4" type="checkbox" value="" checked={vincula} onChange={() => setVincula(!vincula)} />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700">
            QRCode:
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="qrcode"
            value={qrcode}
            onChange={(e) => setQrcode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;