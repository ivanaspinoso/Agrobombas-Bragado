import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import { Tooltip } from 'react-tooltip';
import swal from 'sweetalert2'

const MessagesView = () => {
  const messages = useSelector((state) => state.messagesReducer.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  // Paginar Mensajes y preparar el paginado
  const [pagBreeds, setPagBreeds] = useState(1); // comienza en página 1
  const itemsPPage = 15;
  const totalItems = pagBreeds * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(messages.length / itemsPPage);
  const view = messages.slice(inicialItems, totalItems); //props.raza.slice(inicialItems, totalItems);

  const handleDelete = (id, text) => {
    swal
      .fire({
        title: "Desea eliminar el mensaje " + text + "?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
        // denyButtonText: `Cancelar`,
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          dispatch(deleteCategory(id));
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
        Listado de mensajes
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Agregar mensaje" onClick={() => { navigate("/add-message") }}><FcAddRow /></button>
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Texto</th>
            <th>Para</th>
            <th>Enviar</th>
            <th>Hora</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {view &&
            view.map((message, index) => {
              /* setNumItem(index + 1) */
              const { id, text, sended, contact, senddate, sendtime } = message;
              return (
                <tr key={id}>
                  <th>{index + 1 + (pagBreeds > 1 ? ((pagBreeds - 1) * 15) : 0)}</th>
                  <td>{text}</td>
                  <td>{contact.name}</td>
                  <td>{senddate}</td>
                  <td>{sendtime}</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-group" state={{ id, text, sended }}>
                      <button disabled={sended} data-tooltip-id="my-tooltip" data-tooltip-content="Editar Mensaje">
                        <FaEdit />
                      </button>
                    </Link>

                    <button disabled={sended} data-tooltip-id="my-tooltip" data-tooltip-content="Borrar Mensaje" onClick={() => handleDelete(id, text)}>
                      <FaTrashAlt />
                    </button>

                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      { cantPages <= 1 ? "" :<> <div className="d-flex center-flex aligns-items-center justify-content-center">
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Primer página" onClick={() => setPagBreeds(1)}>⬅</button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Anterior"
          onClick={() => {
            pagBreeds > 1 ? setPagBreeds(pagBreeds - 1) : setPagBreeds(1);
          }}
        >
          {" "}
          👈{" "}
        </button>
        <label>
          página {pagBreeds} de {Math.round(cantPages)}
        </label>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Siguiente"
          onClick={() => {
            pagBreeds < cantPages
              ? setPagBreeds(pagBreeds + 1)
              : setPagBreeds(cantPages);
          }}
        >
          {" "}
          👉{" "}
        </button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="ültima página" onClick={() => setPagBreeds(cantPages)}>➡</button>

      </div></>}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MessagesView;