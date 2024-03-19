import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
// import { deleteContact } from "./ContactsSlice";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import { Tooltip } from 'react-tooltip';
import swal from 'sweetalert2'

const GroupsView = () => {
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleDelete = (id, category) => {

    swal
    .fire({
      title: "Desea eliminar el grupo " + category + "?",
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
        Listado de grupos
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Agregar Grupo" onClick={() => { navigate("/add-group") }}><FcAddRow /></button>
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>N</th>
            <th>Grupo</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {groups &&
            groups.map((group, index) => {
              const { id, category, description, undelete } = group;
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{category}</td>
                  <td>{description}</td>
                  <td className="d-flex gap-2">
                    <Link to="/edit-group" state={{ id, category, description }}>
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Editar Grupo">
                        <FaEdit />
                      </button>
                    </Link>
                    { !undelete ?
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Borrar Grupo" onClick={() => handleDelete(id, category)}>
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

export default GroupsView;