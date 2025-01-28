import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSaleById, fetchAllSales } from "./salesSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaPrint, FaEye } from "react-icons/fa";
import { getAllProducts } from "../../app/actions/products";
import { fetchAllCashflows } from "../Caja/CashflowSlice";
import ViewLinesSale from "./ViewLinesSale";

const SalesView = () => {
  const dispatch = useDispatch();
  const sales = useSelector((state) => state.salesReducer?.sales);
  const navigate = useNavigate();
  const [searchClient, setSearchClient] = useState("");
  const [viewLines, setViewLines] = useState(false)  
  const [saleid, setSaleId] = useState(0)

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
        await dispatch(getAllProducts())
        await dispatch(fetchAllCashflows())
      }
    });
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
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-left">Subtotal</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSales?.map((sale, index) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{new Date(sale.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">{sale.customer?.name || "Sin Cliente"}</td>
                <td className="px-4 py-2">{sale.customer?.address || "Sin dirección"}</td>
                <td className="px-4 py-2 text-right">{parseFloat(sale.subtotal).toFixed(2).replace(".",",") || 0}</td>
                <td className="px-4 py-2 text-right">{parseFloat(sale.total).toFixed(2).replace(".",",")  || 0}</td>

                <td className="px-4 py-2 flex gap-2">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {setViewLines(!viewLines); setSaleId(sale.id) }}
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
                </td>
                <tr><td>{ viewLines ? <ViewLinesSale venta={sale.id} /> : <></>}</td></tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesView;
