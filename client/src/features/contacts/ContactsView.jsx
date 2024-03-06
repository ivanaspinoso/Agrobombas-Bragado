import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { deleteContact } from "./ContactsSlice";
import { Link } from "react-router-dom";

const ContactsView = () => {
  const contacts = useSelector((state) => state.contactsReducer.contacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        List of Contactos
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Cellphone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact, index) => {
              const { id, name, cellphone } = contact;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{cellphone}</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-contact" state={{ id, name, cellphone }}>
                      <button>
                        <FaEdit />
                      </button>
                    </Link>

                    <button onClick={() => handleDelete(id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsView;