import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
// import { deleteContact } from "./ContactsSlice";
import { Link, useNavigate } from "react-router-dom";
import { contactDelete } from "../../app/actions/contacts";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";

const ContactsView = () => {
  const contacts = useSelector((state) => state.contactsReducer.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleDelete = (id, name) => {
    Swal
    .fire({
      title: "Desea eliminar el contacto " + name + "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: "success",
      // denyButtonText: `Cancelar`,
    })
    .then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        dispatch(contactDelete(id));
      } else if (result.isDenied) {
        
      }
    });

  };

  return (
    <div className="container">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Listado de contactos
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Agregar Contacto" onClick={() => { navigate("/add-contact")}}><FcAddRow /></button>
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Nombre</th>
            <th>Numero WA</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {contacts &&
            contacts.map((contact, index) => {
              const { id, name, cellphone, country } = contact;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{name}</td>
                  <td>{cellphone}</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-contact" state={{ id, name, cellphone, country }}>
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Editar Contacto">
                        <FaEdit />
                      </button>
                    </Link>

                    <button data-tooltip-id="my-tooltip" data-tooltip-content="Borrar Contacto" onClick={() => handleDelete(id, name)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ContactsView;