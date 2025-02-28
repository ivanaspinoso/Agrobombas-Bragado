import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import autoTable from 'jspdf-autotable';
import {imagen} from "../../assets/images/agrobombas.logo.jpg"



const PrintSale = () => {
  useEffect(() => {
    document.body.classList.add("print-mode");
    return () => document.body.classList.remove("print-mode");
  }, []);

  const { state: sale } = useLocation();

  const generatePDF = () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    const marginTop = 15;

    doc.setLineWidth(.5);
    doc.rect(14, marginTop + 3, 182, 35);
    doc.line(100, marginTop + 3, 100, marginTop + 38);

    doc.setFontSize(10);
    // doc.text("Agro Bombas Bragado", 10, 10);
    doc.addImage("https://res.cloudinary.com/dns0f6nb2/image/upload/v1740690525/l4mdde0epg8si9qth6e8.png", 'JPEG', 16, marginTop + 5, 64, 20);
    doc.text("Rivadavia 2902, (6640) Bragado, Bs. As.", 16, marginTop + 35);
    doc.text("Tel: 2342-403462", 16,  marginTop + 30);

    doc.text(`Número de Venta: ${sale.id}`, 114,  marginTop + 10);
    doc.text(`Fecha: ${new Date(sale.fecha).toLocaleDateString()}`, 114, marginTop + 16);

    // doc.setFontSize(16);
    // doc.text("Detalles de Venta", 14, 35);

    doc.setLineWidth(.5);
    doc.rect(14, marginTop + 40, 182, 13);

    doc.setFontSize(10);
    doc.text(`Cliente: ${sale.customer?.name || ""}`, 16, marginTop + 45);
    doc.text(`Dirección: ${sale.customer?.address || ""}`, 114, marginTop + 45);
    doc.text(`Telefono: ${sale.customer?.cellphone || ""}`, 16, marginTop + 50);
    doc.text(`Mail: ${sale.customer?.email || ""}`, 114, marginTop + 50);


    // Encabezados corregidos
    const tableColumn = ["Cant.", "Producto", "PU", "Importe"];
    const tableRows = sale.orderlines.map((item) => [
      item.quantity || "",
      item.name || "",
      `$${(item.price || 0).toFixed(2)}`,
      `$${(item.subtotal || 0).toFixed(2)}`,
    ]);

    autoTable(doc,{
      startY: marginTop + 55,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      tableWidth: "auto",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [30, 144, 255], halign: "center" },
      columnStyles: {
        0: {halign: "center"},
        1: { halign: "left" },
        2: { halign: "right" },
        3: { halign: "right" },
      },
    });

    doc.setFontSize(12);
    doc.setFont("bold");
    doc.text(`Total: $${sale.total.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 10);

    // Descargar el documento

    // doc.save("venta-" + sale.id + ".pdf");

    // Abrir el PDF en una nueva pestaña
      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
  };

  if (!sale) {
    return <p>No hay datos de venta para imprimir.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="factura border p-6 rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold text-center no-print">Detalles de Venta</h2>

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
        <div className="border border-gray-300 p-4 ">
          <p><strong>Cliente:</strong> {sale.customer?.name || "MOSTRADOR"}</p>
          <p><strong>Dirección:</strong> {sale.customer?.address || "N/A"}</p>
        </div>
        <h3 className="text-lg font-semibold mt-4 no-print">Productos Vendidos</h3>
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
        <button onClick={() => generatePDF()} className="bg-blue-600 text-white px-6 py-2">
          Imprimir Venta
        </button>
      </div>
    </div>
  );
};

export default PrintSale;
