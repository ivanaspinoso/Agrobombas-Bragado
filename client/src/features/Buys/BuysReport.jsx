import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
 

const BuysReport = () => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.groupsReducer.groups); // Si `groupsReducer` maneja suppliers
  
  const [supplierId, setSupplierId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState(null);

  

  const fetchReport = async () => {
    if (!supplierId || !startDate || !endDate) {
      alert("Debe completar todos los campos");
      return;
    }
    try {
      const url = `https://backend.sib-2000.com.ar/agb/buys/total?supplierid=${supplierId}&from=${startDate}&to=${endDate}`;
      const response = await axios.get(url);
      console.log(response,"allresponse")
      setReport(response.data);
    } catch (error) {
      console.error("Error al obtener el informe de compras:", error);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-4xl mx-auto mt-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Informe de Compras</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col">
          <label>Proveedor:</label>
          <select
            className="border px-2 py-1 rounded"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
          >
            <option value="">Seleccione...</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Desde:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Hasta:</label>
          <input
            type="date"
            className="border px-2 py-1 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={fetchReport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ver Informe
          </button>
        </div>
      </div>

      {report && (
        <>
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="text-lg font-semibold mb-2">Resumen</h3>
            <p>Total Comprado: ${Number(report.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            <p>Cantidad de Compras: {report.cantidad}</p>
          </div>

          {report.compras && report.compras.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Detalle de Compras</h3>
              <table className="w-full border">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 border">Fecha</th>
                    <th className="p-2 border">Factura/Remito</th>
                    <th className="p-2 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {report.compras.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-2 border text-center">
                        {item.fecha ? format(new Date(item.fecha), "dd/MM/yyyy") : "-"}
                      </td>
                      <td className="p-2 border text-center">{item.invoice || "-"}</td>
                      <td className="p-2 border text-right">${Number(item.total).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No hay detalle disponible para este proveedor en el rango de fechas seleccionado.</p>
          )}
        </>
      )}
    </div>
  );
};

export default BuysReport;
