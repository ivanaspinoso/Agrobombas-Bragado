import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllbuys,
  deletebuyById
} from "./BuysSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BuysView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buys = useSelector((state) => state.buysReducer?.buys);
  // const saldoscash = useSelector((state) => state.cashflowReducer?.saldo);

  const [searchDescription, setSearchDescription] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      
      await dispatch(fetchAllbuys());
    };

    fetchData();
  }, [dispatch]);

  const handleSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === buys?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(buys?.map(cf => cf.id) || []);
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;

    const itemsToDelete = buys?.filter(cf => 
      selectedItems.includes(cf.id) && 
      (cf.vta_asoc === null || cf.vta_asoc === undefined) && 
      (cf.mov_asoc === null || cf.mov_asoc === undefined)
    );

    if (itemsToDelete.length === 0) {
      Swal.fire(
        "Error",
        "Los items seleccionados están asociados a ventas o movimientos",
        "error"
      );
      return;
    }

    Swal.fire({
      title: `¿Desea eliminar ${itemsToDelete.length} compras seleccionadas?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Mostrar loading mientras se procesan las eliminaciones
          Swal.fire({
            title: 'Eliminando compras...',
            didOpen: () => {
              Swal.showLoading();
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
          });

          let errores = [];
          // Procesar las eliminaciones una por una
          for (const item of itemsToDelete) {
            try {
              await dispatch(deletebuyById(item.id));
              const success = JSON.parse(localStorage.getItem("buyDeleted"));
              if (success !== true) {
                errores.push(`Compra ${item.id}: ${success}`);
              }
            } catch (error) {
              errores.push(`Compra ${item.id}: Error al eliminar`);
            }
          }

          setSelectedItems([]); // Limpiar selección

          // Mostrar resultado
          if (errores.length > 0) {
            Swal.fire({
              title: "Completado con errores",
              html: `Se completó la operación pero hubo los siguientes errores:<br/>${errores.join('<br/>')}`,
              icon: "warning"
            });
          } else {
            Swal.fire(
              "Eliminados",
              "Los movimientos han sido eliminados correctamente.",
              "success"
            );
          }

          // Actualizar la lista
          dispatch(fetchAllbuys());

        } catch (error) {
          Swal.fire(
            "Error",
            "Hubo un problema al procesar las eliminaciones.",
            "error"
          );
        }
      }
    });
  };

  const handleDelete = (id, description, vta, mov, invoice) => {
    console.log(vta, mov);
    {
      (vta === null || vta === undefined) && (mov === null || mov === undefined)
        ? Swal.fire({
            title: `¿Desea eliminar la compra: ${invoice}?`,
            showDenyButton: true,
            confirmButtonText: "Sí",
            denyButtonText: "No",
            icon: "warning",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await dispatch(deletebuyById(id));

              const success = JSON.parse(
                localStorage.getItem("buyDeleted")
              );
              if (success === true) {
                Swal.fire(
                  "Eliminado",
                  "El movimiento ha sido eliminado correctamente.",
                  "success"
                );
                // await dispatch(obtenerSaldo())
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

  const filteredCashflows = buys?.filter((cf) =>
    cf.provider?.toLowerCase().includes(searchDescription.toLowerCase())
  );
 
  // Calculo la paginación
  const totalPages = Math.ceil(filteredCashflows?.length / itemsPerPage);
  const paginatedBuys = filteredCashflows?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">Compras anotadas</h2>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <button
              className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleBulkDelete}
            >
              Eliminar Seleccionados ({selectedItems.length})
            </button>
          )}
          <button
            className="ml-2 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/add-buy")}
          >
            Anotar compra
          </button>
        </div>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                <input
                  type="checkbox"
                  checked={selectedItems.length === buys?.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4"
                />
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                #
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Fecha
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Proveedor
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Fact/Remi N°
              </th>
              <th className="px-4 py-2 text-center border-r border-gray-300">
                Total
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
            {paginatedBuys?.map((cf, index) => (
              <tr key={cf.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(cf.id)}
                    onChange={() => handleSelect(cf.id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2">
                  {cf.fecha.split('T')[0].split('-').reverse().join('/')}
                </td>
                <td className="px-4 py-2">{cf.provider}</td>
                <td className="px-4 py-2 text-right">{cf.invoice}</td>
                <td className="px-4 py-2 text-right">
                   {cf.total === null ? "0,00" : cf.total.toLocaleString(undefined,{minimumFractionDigits: 2})}
                </td>
                <td className="px-4 py-2">{cf.noteadmin}</td>
                <td className="px-4 py-2 flex gap-2 flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate(`/edit-buy`, { state: cf })}
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
                        cf.mov_asoc,
                        cf.invoice
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

export default BuysView;
