import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCashflows,
  deleteCashflowById,
  obtenerSaldo,
  getSaldo,
} from "./CashflowSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CashflowView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cashflows = useSelector((state) => state.cashflowReducer?.cashflows);
  const saldoscash = useSelector((state) => state.cashflowReducer?.saldo);

  const [searchDescription, setSearchDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllCashflows());
      await dispatch(obtenerSaldo());
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id, description, vta, mov) => {
    console.log(vta, mov);
    {
      (vta === null || vta === undefined) && (mov === null || mov === undefined)
        ? Swal.fire({
            title: `¿Desea eliminar el movimiento: ${description}?`,
            showDenyButton: true,
            confirmButtonText: "Sí",
            denyButtonText: "No",
            icon: "warning",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await dispatch(deleteCashflowById(id));

              const success = JSON.parse(
                localStorage.getItem("cashflowDeleted")
              );
              if (success === true) {
                Swal.fire(
                  "Eliminado",
                  "El movimiento ha sido eliminado correctamente.",
                  "success"
                );
                await dispatch(obtenerSaldo())
              } else {
                Swal.fire("Error", success, "error");
              }
            }
          })
        : Swal.fire(
            "Movimiento asociado",
            "No se puede eliminar movimiento: " +
              description +
              ". Asociado a venta o movimiento de cuenta",
            "error"
          );
    }
  };

  const filteredCashflows = cashflows?.filter((cf) =>
    cf.description.toLowerCase().includes(searchDescription.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCashflows?.length / itemsPerPage);
  const paginatedCashflows = filteredCashflows?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">Movimientos de Caja</h2>
        <button
            className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
            onClick={() => navigate("/gestion/reportCaja")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Informes
          </button>
        <div>
          {/* Contenedor de Saldos Mejorado */}
          <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md flex justify-center items-center gap-8 mt-2">
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Ingresos:</strong>{" "}
              <span className="text-green-600">
                $ {!saldoscash?.ingresos || saldoscash?.ingresos === null 
                    ? "0.00" 
                    : saldoscash?.ingresos.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
              </span>
            </div>
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Egresos:</strong>{" "}
              <span className="text-red-600">
                $ {!saldoscash?.egresos || saldoscash?.egresos === null 
                    ? "0.00" 
                    : saldoscash?.egresos.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
              </span>
            </div>
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Saldo:</strong>{" "}
              <span
                className={`${
                  saldoscash?.balance === "positivo"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                $ {!saldoscash?.saldo || saldoscash?.saldo === null 
                    ? "0.00" 
                    : saldoscash?.saldo.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
              </span>
            </div>
          </div>
        </div>
       
        {/* Mantiene el botón en su lugar original */}
        <button
          className="ml-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/gestion/add-cashflow")}
        >
          Agregar Movimiento
        </button>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Fecha
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Descripción
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Ingreso
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Egreso
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Nota
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCashflows?.map((cf, index) => (
              <tr key={cf.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2">
                  {new Date(cf.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{cf.description}</td>
                <td className="px-4 py-2 text-right">
                  {cf.income === null ? "0,00" : cf.income.toLocaleString(undefined,{minimumFractionDigits: 2})}
                </td>
                <td className="px-4 py-2 text-right">
                  {cf.outflow === null ? "0,00" : cf.outflow.toLocaleString(undefined,{minimumFractionDigits: 2})}
                </td>
                <td className="px-4 py-2">{cf.note}</td>
                <td className="px-4 py-2 flex gap-2 flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/gestion/edit-cashflow`, { state: cf })}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() =>
                      handleDelete(
                        cf.id,
                        cf.description,
                        cf.vta_asoc,
                        cf.mov_asoc
                      )
                    }
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default CashflowView;
