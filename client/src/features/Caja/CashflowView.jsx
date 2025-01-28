import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCashflows, deleteCashflowById, obtenerSaldo } from "./CashflowSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CashflowView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cashflows = useSelector((state) => state.cashflowReducer?.cashflows);
  const saldoscash = useSelector((state) => state.cashflowReducer?.saldo);

  const [searchDescription, setSearchDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllCashflows());
      await dispatch(obtenerSaldo());
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = (id, description) => {
    Swal.fire({
      title: `¿Desea eliminar el movimiento: ${description}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteCashflowById(id));
      }
    });
  };

  const filteredCashflows = cashflows?.filter((cf) =>
    cf.description.toLowerCase().includes(searchDescription.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-semibold">Movimientos de Caja</h2>

        <div>

          {/* Contenedor de Saldos Mejorado */}
          <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md flex justify-center items-center gap-8 mt-2">
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Ingresos:</strong>{" "}
              <span className="text-green-600">${saldoscash?.ingresos?.toFixed(2)}</span>
            </div>
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Egresos:</strong>{" "}
              <span className="text-red-600">${saldoscash?.egresos?.toFixed(2)}</span>
            </div>
            <div className="text-lg font-semibold text-gray-600 text-center">
              <strong>Saldo:</strong>{" "}
              <span
                className={`${
                  saldoscash?.saldo >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${saldoscash?.saldo.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Mantiene el botón en su lugar original */}
        <button
          className="ml-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/cashflow/add")}
        >
          Agregar Movimiento
        </button>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Ingreso</th>
              <th className="px-4 py-2 text-left">Egreso</th>
              <th className="px-4 py-2 text-left">Nota</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCashflows?.map((cf) => (
              <tr key={cf.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{cf.id}</td>
                <td className="px-4 py-2">{new Date(cf.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{cf.description}</td>
                <td className="px-4 py-2 text-right">
                  {parseFloat(cf.income).toFixed(2).replace(".", ",")}
                </td>
                <td className="px-4 py-2 text-right">
                  {parseFloat(cf.outflow).toFixed(2).replace(".", ",")}
                </td>
                <td className="px-4 py-2">{cf.note || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/cashflow/update`, { state: cf })}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(cf.id, cf.description)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashflowView;
