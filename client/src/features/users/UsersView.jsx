import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
// import { deleteContact } from "./ContactsSlice";
import { Link, useNavigate } from "react-router-dom";
import { contactDelete } from "../../app/actions/contacts";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";

const UsersView = () => {
  const users = useSelector((state) => state.usersReducer.users);
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
        Listado de usuarios del sistema
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Id</th>
            <th>Nombre</th>
            <th>Numero WA - Sync</th>
            <th>Usuario</th>            
            <th>back WA</th>
            <th>Admin</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              const { id, name, cellphone, country, username, backwa, isAdmin, vinculated, qrcode } = user;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <th>{id}</th>
                  <td>{name}</td>
                  <td>{cellphone} - {vinculated === true ? "si" : "no"} </td>
                  <td>{username}</td>
                  <td>{backwa}</td>
                  <td>{isAdmin === true ? "si" : "no" }</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-user" state={{ id, name, cellphone, country, username, backwa, isAdmin, vinculated, qrcode }}>
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Editar Usuario">
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

export default UsersView;