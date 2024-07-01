import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { configUpdate } from "../../app/actions/configs";
import { getQRUser, addInstance, getUser, loginUpdate } from "../../app/actions/users";
import { QRCode } from 'react-qrcode-logo';


const EditConfig = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location.state);
  const login = useSelector((state) => state.usersReducer.login)
  const [id] = useState(location.state.id);
  const [business, setBusiness] = useState(location.state.business);
  const [slogan, setSlogan] = useState(location.state.slogan);
  const navigate = useNavigate();
  const userqr = useSelector((state) => state.usersReducer.qrCode)

  const verQR = () => {
    dispatch(getQRUser(login.username, login.password))
    if (login.backwa === "") {
      // dispatch(addInstance())
      console.log("No hay instancia creada")
    }
    else
      console.log("instancia creada")
  }

  useEffect(() => {
  
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(configUpdate({ id, business, slogan }));
    navigate("/", { replace: true });
  };

  verQR()

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Configuracion del Sistema
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 "
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Business:
          </label>
          <input
            type="text"
            className="form-control"
            id="business"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Slogan:
          </label>
          <input
            type="text"
            className="form-control"
            id="slogan"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn "
          style={{ background: "#006877", color: "white" }}
        >
          Update Config
        </button>
      </form>
      <div className="d-flex center-flex aligns-items-center justify-content-center">
        {


          login.backwa && login.backwa.length != 0 ?

            <>
              <label>Vincule su whatsapp</label>
{/*               <QRCode className="form-control" value={userqr} size={325} />
              <button onClick={() => verQR()}>Refresh QR</button>
              <div>
                Si en tu celu dice no se inicio sesión Refresca el qr <br />
                Si inició sesión en celu, cierra sesion aqui y vuelve a entrar
              </div>
 */}            </>
            : "Cuenta vinculada"
        }
      </div>
    </div>
  );
};

export default EditConfig;