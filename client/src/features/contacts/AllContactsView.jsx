import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
// import { deleteContact } from "./ContactsSlice";
import { Link, useNavigate } from "react-router-dom";
import { contactDelete, contactsSort } from "../../app/actions/contacts";
import { ASC, DES } from "../../app/consts/consts";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";

const ContactsView = () => {
  const allcontacts = useSelector((state) => state.contactsReducer.allcontacts);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // Paginar Contacts y preparar el paginado
  const [pagContacts, setPagContacts] = useState(1); // comienza en página 1
  const itemsPPage = 15;
  const totalItems = pagContacts * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(contacts.length / itemsPPage);
  const view = contacts.slice(inicialItems, totalItems); //props.raza.slice(inicialItems, totalItems);


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

  /*  Contacts sort by Name */
  function handleDispatchOrder(event) {
    console.log(event, contacts);
    if (event.target.value === ASC || event.target.value === DES) {
      dispatch(contactsSort(event.target.value, contacts))
    }
    /*     if (event.target.value === PASC || event.target.value === PDES) {
          props.sortweight(event.target.value, contacts);
        } */
  }


  return (
    <div className="container">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Listado de contactos
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Agregar Contacto" onClick={() => { navigate("/add-contact") }}><FcAddRow /></button>
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Nombre &nbsp; 
              <select onChange={handleDispatchOrder}>
                <option>Orden</option>
                <option value={ASC}>A-Z</option>
                <option value={DES}>Z-A</option>
              </select></th>
            <th>Numero WA</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {view &&
            view.map((contact, index) => {
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
      { cantPages <= 1 ? "" :<> <div className="d-flex center-flex aligns-items-center justify-content-center">
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Primer página" onClick={() => setPagContacts(1)}>⬅</button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Anterior"
          onClick={() => {
            pagContacts > 1 ? setPagContacts(pagContacts - 1) : setPagContacts(1);
          }}
        >
          {" "}
          👈{" "}
        </button>
        <label>
          página {pagContacts} de {Math.round(cantPages)}
        </label>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Siguiente"
          onClick={() => {
            pagContacts < cantPages
              ? setPagContacts(pagContacts + 1)
              : setPagContacts(cantPages);
          }}
        >
          {" "}
          👉{" "}
        </button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="ültima página" onClick={() => setPagContacts(cantPages)}>➡</button>

      </div></>}

      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ContactsView;