import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "./ContactsSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddContact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const contact = { id: uuidv4(), name, cellphone };
    dispatch(addContact(contact));
    navigate("/show-contacts", { replace: true });
  };
  
  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Add Contact
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4"
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
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ background: "#006877", color: "white" }}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;