import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSaleById, fetchAllSales } from "./salesSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaPrint, FaEye, FaBoxOpen, FaTag, FaDollarSign } from "react-icons/fa";
import { getAllProducts } from "../../app/actions/products";
import { fetchAllCashflows } from "../Caja/CashflowSlice";

const SalesView = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.salesReducer?.sales);
  const navigate = useNavigate();
  const [searchClient, setSearchClient] = useState("");
  const [saleid, setSaleId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSales());
  }, [dispatch]);

  const handleDelete = (id, customer) => {
    Swal.fire({
      title: `¿Desea eliminar la venta de: ${customer.name}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteSaleById(id));
        await dispatch(getAllProducts());
        await dispatch(fetchAllCashflows());
      }
    });
  };

  const toggleViewLines = (id) => {
    setSaleId(saleid === id ? null : id);
  };

  const filteredSales = sales?.filter((sale) =>
    sale.client?.toLowerCase().includes(searchClient.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
      <h2 className="text-xl font-semibold">Ventas</h2>
        <button
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/sales/add")}
        >
          Agregar Venta
        </button>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Subtotal</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-6 py-2 text-right">Acciones</th> {/* Se alinea a la derecha */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSales?.map((sale, index) => (
              <React.Fragment key={sale.id}>
                {/* Fila de la Venta */}
                <tr className={`hover:bg-gray-50 ${saleid === sale.id ? "bg-blue-100" : ""}`}>
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{new Date(sale.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{sale.customer?.name || "Sin Cliente"}</td>
                  <td className="px-4 py-2">{sale.customer?.address || "Sin dirección"}</td>
                  <td className="px-4 py-2 text-right">{parseFloat(sale.subtotal || 0).toFixed(2).replace(".", ",")}</td>
                  <td className="px-4 py-2 text-right">{parseFloat(sale.total || 0).toFixed(2).replace(".", ",")}</td>
                  <td className="px-6 py-2 text-right"> {/* Alineado a la derecha */}
                    <div className="flex justify-end gap-2"> {/* Botones empujados a la derecha */}
                      <button
                        className={`font-bold py-2 px-4 rounded ${
                          saleid === sale.id
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-500 hover:bg-blue-700 text-white"
                      }`}                       
                        onClick={() => toggleViewLines(sale.id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/print-sale`, { state: sale })}
                      >
                        <FaPrint />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/edit-sale`, { state: sale })}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(sale.id, sale.customer)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>

                {saleid === sale.id && (
                  <tr>
                    <td colSpan="7" className="bg-gray-50 p-2 border border-gray-300">
                      <div className="space-y-1">
                        {sale.orderlines.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow">
                            <div className="flex items-center gap-2">
                              <FaBoxOpen className="text-blue-500 " />
                              <span className="text-sm">{item.quantity}x</span>
                              <span className="mr-6 text-sm font-medium">{item.name}x</span>
                              <span className="text-sm">{item.article}</span> 
                              <span>- {item.product}</span>
                            </div>
                            <div className="text-right font-regular flex gap-2">
                              <span className="text-green-600 text-sm">
                                Total: <FaDollarSign className="inline-block " /> {parseFloat(item.price).toFixed(2)}
                              </span>
                              <span className="text-sm font-medium">Subtotal: {parseFloat(item.subtotal).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesView;
