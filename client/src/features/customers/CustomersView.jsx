import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, customersDelete } from "./CustomerSlice";
import { Tooltip } from "react-tooltip";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert2";
import Swal from "sweetalert2";

const CustomersView = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customersReducer.customers);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    swal
      .fire({
        title: `¿Desea eliminar al cliente ${name}?`,
        showDenyButton: true,
        confirmButtonText: `Sí`,
        denyButtonText: `No`,
        icon: "warning",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(customersDelete(id));
          const success = JSON.parse(localStorage.getItem("customerDeleted"));
          if (success === true) {
            Swal.fire("Eliminado", "El cliente ha sido eliminado correctamente.", "success");
          } else {
            Swal.fire("Error", success, "error");
          }
        }
      });
  };

  const filteredCustomers = customers?.filter((customer) =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers?.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        {/* Título + Botón */}
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          Datos de clientes
          <button
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/gestion/add-message")}
          >
            <FcAddRow className="mr-2 h-5 w-5" />
            Agregar clientes
          </button>
        </h2>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md mb-5 w-full sm:w-auto"
        />

        {/* Tabla */}
        <div className="overflow-x-scroll">
          <table className="w-full table-auto mb-10">
            <thead className="bg-[#0e6fa5] text-white">
              <tr>
                <th className="px-4 py-2 text-center border-r border-gray-300">#</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Nombre</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Dirección</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Ciudad</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Email</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Cumpleaños</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedCustomers?.map((customer, index) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.address}</td>
                  <td className="px-4 py-2">{customer.city}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.birthday || "N/A"}</td>
                  <td className="px-4 py-2 flex gap-2 justify-end">
                    <Link
                      to="/edit-customers"
                      state={{ ...customer }}
                    >
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(customer.id, customer.name)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1 ? "bg-[#0e6fa5] text-white" : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
};

export default CustomersView;
