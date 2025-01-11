import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* import { fetchAllCashflows, deleteCashflowById } from "./CashflowSlice"; */
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CaccountsView = () => {
  const dispatch = useDispatch();
  const caccounts = useSelector((state) => state.cashflowReducer?.caccounts);

  const navigate = useNavigate();

  const [searchDescription, setSearchDescription] = useState("");

/* 
  useEffect(async () => {
    await dispatch(fetchAllCashflows());
  }, [dispatch]); 
   */

/*   const handleDelete = (id, description) => {
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
  
 */
  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Movimientos de Corriente</h2>

{/*         <button
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/cashflow/add")}
        >
          Agregar Movimiento
        </button>
      </div> */}
          <div>Por favor seleccione cliente:</div>
{/*    <div className="overflow-x-scroll">
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
                <td className="px-4 py-2">{cf.income || "-"}</td>
                <td className="px-4 py-2">{cf.outflow || "-"}</td>
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
 */}      </div>
    </div>
  );
};

export default CaccountsView;
