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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isAdm = isAdmin
    dispatch(userUpdateAdm({ id, backwa, isAdm }));
    navigate("/show-users", { replace: true });
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Editar Usuario
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 "
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Cellphone:
          </label>
          <input
            type="text"
            className="form-control"
            id="cellphone"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            // required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Back WA:
          </label>
          <input
            type="text"
            className="form-control"
            id="backwa"
            value={backwa}
            onChange={(e) => setBackwa(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            is Admin:
          </label>
          <input class="form-check-input" type="checkbox" value="" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        </div>
        <button
          type="submit"
          className="btn "
          style={{ background: "#006877", color: "white" }}
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;