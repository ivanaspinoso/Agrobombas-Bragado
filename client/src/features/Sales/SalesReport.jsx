import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const SalesReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("vendidos");
const [sortDirection, setSortDirection] = useState("desc"); // o "asc"



  const fetchReport = async () => {
    try {
      const url = `https://backend.sib-2000.com.ar/agb/sales/products-summary?startDate=${startDate}&endDate=${endDate}`;
      const response = await axios.get(url);
      setReport(response.data);
    } catch (error) {
      console.error("Error al obtener el informe:", error);
    }
  };
  const filteredProducts = report?.products
  .filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
  });

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-5xl mx-auto mt-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Informe de Ventas</h2>

      <div className="flex gap-4 mb-4">
        <div>
          <label>Desde:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label>Hasta:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={fetchReport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ver Informe
        </button>
      </div>

      {report && (
        <>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="text-lg font-semibold mb-2">Resumen</h3>
            <p>Ventas Totales: {report.summary.totalSales}</p>
            <p>Productos Distintos: {report.summary.totalProducts}</p>
            <p>Subtotal: ${Number(report.summary.sumSubtotal).toLocaleString()}</p>
            <p>Costo Total: ${Number(report.summary.sumCost).toLocaleString()}</p>
            <p>Ganancia: ${Number(report.summary.sumProfit).toLocaleString()}</p>
          </div>

          <div>
            <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-2">Productos Vendidos</h3>
            <input
  type="text"
  placeholder="Buscar producto..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border px-2 py-1 rounded mb-4 w-auto"
/>
</div>
            <table className="w-full border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border">Producto</th>
                  <th
  className="p-2 border cursor-pointer"
  onClick={() => {
    if (sortBy === "vendidos") {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy("vendidos");
      setSortDirection("desc");
    }
  }}
>
  Vendidos {sortBy === "vendidos" && (sortDirection === "asc" ? "↑" : "↓")}
</th>

                  <th className="p-2 border">Venta Total</th>
                  <th className="p-2 border">Costo</th>
                  <th className="p-2 border">Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border text-center">{item.vendidos}</td>
                    <td className="p-2 border text-right">${item.venta.toLocaleString()}</td>
                    <td className="p-2 border text-right">${item.costo.toLocaleString()}</td>
                    <td className="p-2 border text-right">${item.ganancia.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default SalesReport;
