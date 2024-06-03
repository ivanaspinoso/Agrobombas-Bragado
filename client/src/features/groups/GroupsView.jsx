import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import swal from 'sweetalert2';

const GroupsView = () => {
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id, category) => {
    swal
      .fire({
        title: "¿Desea eliminar el grupo " + category + "?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCategory(id));
        }
      });
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          Listado de Grupos
          <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-group")}>
            <FcAddRow className="mr-2 h-5 w-5" />
            Agregar grupo
          </button>
        </h2>
        <table className="w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Grupo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {groups?.map((group, index) => {
              const { id, category, description, undelete } = group;
              return (
                <tr key={id}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{category}</td>
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link to={`/edit-group`} state={{ id, category, description }}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                        <FaEdit />
                      </button>
                    </Link>
                    {!undelete ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(id, category)}
                      >
                        <FaTrashAlt />
                      </button>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupsView;
