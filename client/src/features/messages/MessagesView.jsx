import React, { useEffect } from "react";
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
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Agregar Grupo" onClick={() => { navigate("/add-group") }}><FcAddRow /></button>
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Texto</th>
            <th>Enviado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {messages &&
            messages.map((message, index) => {
              const { id, text, sended} = message;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{text}</td>
                  <td>{sended}</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-group" state={{ id, text, sended }}>
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Editar Mensaje">
                        <FaEdit />
                      </button>
                    </Link>
                    { !sended ?
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Borrar Mensaje" onClick={() => handleDelete(id, text)}>
                        <FaTrashAlt />
                      </button> : ""
                    }
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

export default MessagesView;