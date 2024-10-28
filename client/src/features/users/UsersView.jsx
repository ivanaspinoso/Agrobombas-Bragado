import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import { FcAddRow } from "react-icons/fc";
// import { deleteContact } from "./ContactsSlice";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";
import { userDelete, getAllUsers } from "../../app/actions/users";

const UsersView = () => {
  const users = useSelector((state) => state.usersReducer.users);
  console.log(users)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllUsers()); 
  }, [dispatch]);

  const handleDelete = (id, name) => {
    Swal
      .fire({
        title: "Desea eliminar al usuario " + name + "?",
        html: "Recuerde que al eliminar el usuario deberá registrarse nuevamente y volver a crear todos sus contactos, instancia WA, y demás información",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
        // denyButtonText: `Cancelar`,
      })
      .then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          await dispatch(userDelete(id));
        } else if (result.isDenied) {

        }
      });

  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col flex-grow">
      <h2
        className="text-center flex flex-row justify-between text-2xl font-semibold mb-10 "

      >
        Listado de usuarios del sistema
      </h2>
      <div className="overflow-x-scroll">
        <table
          className="w-full table-auto "
        // style={{ maxWidth: "80%", margin: "auto" }}
        >
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">N</th>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              {/* <th className="px-4 py-2 text-left">Numero WA - Sync</th> */}
              <th className="px-4 py-2 text-left">Usuario</th>
              {/* <th className="px-4 py-2 text-left">Admin</th> */}
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white  ">
            {users &&
              users.map((user, index) => {
                const { id, name, country, username, backwa,vinculated, qrcode } = user;
                return (
                  <tr key={id} className="hover:bg-gray-50 text-left">
                    <th className=" px-4 py-2">{index + 1}</th>
                    <th className=" px-4 py-2">{id}</th>
                    <td className=" px-4 py-2">{name}</td>
                    {/* <td className=" px-4 py-2">{cellphone} - {vinculated === true ? "si" : "no"} </td> */}
                    <td className=" px-4 py-2">{username}</td>
                    {/* <td className=" px-4 py-2">{isAdmin === true ? "si" : "no"}</td> */}
                    <td className=" px-4 py-2 flex space-x-4 justify-center">
                      <Link to="/edit-user" state={{ id, name, country, username, backwa,  vinculated, qrcode }}>
                        <button className="text-blue-500 hover:text-blue-700" data-tooltip-id="my-tooltip" data-tooltip-content="Editar Usuario">
                          <FaEdit />
                        </button>
                      </Link>

                      <button className="text-red-500 hover:text-red-700" data-tooltip-id="my-tooltip" data-tooltip-content="Borrar Usuario" onClick={() => handleDelete(id, name)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default UsersView;