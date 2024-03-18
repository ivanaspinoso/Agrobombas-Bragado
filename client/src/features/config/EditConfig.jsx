import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { configUpdate } from "../../app/actions/configs";

const EditConfig = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [business, setBusiness] = useState(location.state.business);
  const [slogan, setSlogan] = useState(location.state.slogan);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(configUpdate({ id, business, slogan }));
    navigate("/", { replace: true });
  };
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
    </div>
  );
};

export default EditConfig;