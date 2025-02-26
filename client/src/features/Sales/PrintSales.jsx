import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrintSale = () => {
  useEffect(() => {
    document.body.classList.add("print-mode");
    return () => document.body.classList.remove("print-mode");
  }, []);

  const { state: sale } = useLocation();

  if (!sale) {
    return <p>No hay datos de venta para imprimir.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="factura border p-6 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center">Detalles de Venta</h2>

        <div className="flex justify-between">
          {/* 📌 Datos de la empresa (Izquierda) */}
          <div className="text-left border border-gray-300 p-4 mt-4 w-full">
            <p className="font-bold text-lg">Agro Bombas Bragado</p>
            <p>Rivadavia 2902, (6640) Bragado, Bs. As.</p>
            <p>Tel: 2342-403462</p>
          </div>

          {/* 📌 Datos de la venta (Derecha) */}
          <div className="text-right border border-gray-300 p-4 mt-4 w-full">
            <p><strong>Número de Venta:</strong> {sale.id}</p>
            <p><strong>Fecha:</strong> {new Date(sale.fecha).toLocaleDateString()}</p>
          </div>
        </div>

        {/* 🔹 Datos del cliente (Ocupa todo el ancho) */}
        <div className="border border-gray-300 p-4 mt-4">
          <p><strong>Cliente:</strong> {sale.customer?.name || "MOSTRADOR"}</p>
          <p><strong>Dirección:</strong> {sale.customer?.address || "N/A"}</p>
        </div>
        <h3 className="text-lg font-semibold mt-4">Productos Vendidos</h3>
        <table className="w-full border mt-2">
          <thead className="bg-gray-100">
            <tr>
            <th className="border px-4 py-2 text-right">Cant.</th>

              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2 text-right">PU</th>
              <th className="border px-4 py-2 text-right">Importe</th>
            </tr>
          </thead>
          <tbody>
            {sale.orderlines.map((item, index) => (
              <tr key={index}>
                                <td className="border px-4 py-2 text-right">{item.quantity}</td>

                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                <td className="border px-4 py-2 text-right">${item.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right border-t pt-2">
          <p><strong>Subtotal:</strong> ${sale.subtotal.toFixed(2)}</p>
          <p className="text-lg"><strong>Total:</strong> ${sale.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Botón de imprimir */}
      <div className="mt-6 text-center no-print">
        <button onClick={() => window.print()} className="bg-blue-600 text-white px-6 py-2">
          Imprimir Factura
        </button>
      </div>
    </div>
  );
};

export default PrintSale;
