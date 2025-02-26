import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSaleById, fetchAllSales } from "./salesSlice";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaPrint, FaEye, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { getAllProducts } from "../../app/actions/products";
import { fetchAllCashflows } from "../Caja/CashflowSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";


const generatePDF = (sale) => {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("Agro Bombas Bragado", 14, 10);
  doc.text("Rivadavia 2902, (6640) Bragado, Bs. As.", 14, 16);
  doc.text("Tel: 2342-403462", 14, 22);

  doc.text(`Número de Venta: ${sale.id}`, 140, 10);
  doc.text(`Fecha: ${new Date(sale.fecha).toLocaleDateString()}`, 140, 16);

  doc.setFontSize(16);
  doc.text("Detalles de Venta", 14, 35);

  doc.setFontSize(12);
  doc.text(`Cliente: ${sale.customer?.name || "MOSTRADOR"}`, 14, 45);
  doc.text(`Dirección: ${sale.customer?.address || "N/A"}`, 14, 52);

  // Encabezados corregidos
  const tableColumn = ["Producto", "Cant.", "PU", "Importe"];
  const tableRows = sale.orderlines.map((item) => [
    item.name,
    item.quantity,
    `$${item.price.toFixed(2)}`,
    `$${item.subtotal.toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: 60,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [30, 144, 255] },
    columnStyles: {
      1: { halign: "right" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
  });

  doc.setFontSize(12);
  doc.setFont("bold");
  doc.text(`Total: $${sale.total.toFixed(2)}`, 140, doc.lastAutoTable.finalY + 10);

  // Abrir el PDF en una nueva pestaña
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

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
          onClick={() => navigate("/add-sale")}
        >
          Agregar Venta
        </button>
      </div>

      <div className="overflow-x-scroll">
        <table className="w-full table-auto border border-gray-200">
          {/* Encabezados de la tabla */}
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-2 py-3 text-center border-r border-gray-300 w-10">#</th>
              <th className="px-4 py-3 text-center border-r border-gray-300">Fecha</th>
              <th className="px-4 py-3 text-center border-r border-gray-300 w-1/4">Cliente</th>
              <th className="px-4 py-3 text-center border-r border-gray-300 w-1/4">Dirección</th>
              <th className="px-4 py-3 text-center border-r border-gray-300">Subtotal</th>
              <th className="px-4 py-3 text-center border-r border-gray-300">Total</th>
              <th className="px-2 py-3 text-center w-28">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales?.map((sale, index) => (
              <React.Fragment key={sale.id}>
                {/* Fila de la Venta */}
                <tr className="border-b border-gray-300">
                  <td className="px-2 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{new Date(sale.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2 text-left">{sale.customer?.name || ""}</td>
                  <td className="px-4 py-2 text-left">{sale.customer?.address || ""}</td>
                  <td className="px-4 py-2 text-right">{sale.subtotal.toLocaleString(undefined,{minimumFractionDigits: 2})}</td>
                  <td className="px-4 py-2 text-right">{sale.total.toLocaleString(undefined,{minimumFractionDigits: 2})}</td>
                  <td className="px-2 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className={`font-bold py-2 px-3 rounded ${
                          saleid === sale.id ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700 text-white"
                        }`}
                        onClick={() => toggleViewLines(sale.id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() => navigate("/print-sale", { state: sale })}
                        >
                        <FaPrint />
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() => navigate(`/edit-sale`, { state: sale })}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
                        onClick={() => handleDelete(sale.id, sale.customer)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Detalle de la venta */}
                {saleid === sale.id && (
                  <tr>
                    <td colSpan="7" className="bg-gray-50 p-4 border-t border-gray-300">
                      <div className="space-y-1">
                        {sale.orderlines.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white px-4 py-3 rounded-md shadow">
                            <div className="flex items-center gap-2">
                              <FaBoxOpen className="text-blue-500" />
                              <span className="text-sm">{item.quantity}x</span>
                              <span className="text-sm">{item.article}</span>
                              <span className="mr-6 text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="text-right font-regular flex gap-2">
                              <span className="text-green-600 text-sm">
                                <FaDollarSign className="inline-block" /> {item.price.toLocaleString(undefined,{minimumFractionDigits: 2})}
                              </span>
                              <span className="text-sm font-medium">
                                <FaDollarSign className="inline-block" /> {item.subtotal.toLocaleString(undefined,{minimumFractionDigits: 2})}
                              </span>
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
