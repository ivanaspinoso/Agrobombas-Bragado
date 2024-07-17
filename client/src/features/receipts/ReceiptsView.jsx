import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { receiptDelete } from "../../app/actions/receipts";
import { Tooltip } from 'react-tooltip';
import swal from 'sweetalert2'
import { useTranslation } from "react-i18next";
import { getUserReceipts } from "../../app/actions/receipts";

const ReceiptsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const login = useSelector((state) => state.usersReducer.login)

  useEffect(() => {
    console.log(login.id)
    dispatch(getUserReceipts(login.id))
  }, [])

  const receipts = useSelector((state) => state.receiptsReducer.receipts);
  const [pagBreeds, setPagBreeds] = useState(1); // comienza en página 1
  const itemsPPage = 15;
  const totalItems = pagBreeds * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(receipts.length / itemsPPage);
  const view = receipts.slice(inicialItems, totalItems);

  const handleDelete = (id, text) => {
    swal
      .fire({
        title: "Desea eliminar el mensaje recibido?",
        html: text,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(receiptDelete(id));
        }
      });
  };

  const handleView = (id, text) => {
    swal
      .fire({
        title: "Mensaje Recibido",
        html: text,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        icon: "success",
      })
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center flex flex-row justify-between text-2xl font-semibold mb-10">
        {t('received.receivedList')}
        <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-message")}>
          <FcAddRow className="mr-2 h-5 w-5" />
          {t('received.addMessage')}
        </button>
      </h2>
      <table className="w-full whitespace-nowrap">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left"> {t('received.n')}</th>
            <th className="px-4 py-2 text-left"> {t('received.text')}</th>
            <th className="px-4 py-2 text-left"> {t('received.from')}</th>
            <th className="px-4 py-2 text-left">{t('received.day')}</th>
            <th className="px-4 py-2 text-left">{t('received.action')}</th>
          </tr>
        </thead>
        <tbody>
          {view.map((receipt, index) => {
            const { id, text, numwa, createdAt } = receipt;
            let num = numwa.replaceAll("@c.us", "")
            return (
              <tr key={id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{index + 1 + (pagBreeds > 1 ? ((pagBreeds - 1) * 15) : 0)}</td>
                <td className="px-4 py-2">{text.substr(0, 50)} {text.length > 50 ? "..." : ""}</td>
                <td className="px-4 py-2">{num}</td>
                <td className="px-4 py-2">{new Date(createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-green-500 hover:text-green-700" onClick={() => handleView(id, text)}>
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(id, text)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Pagination" className="flex justify-end mt-4">
        <button className="mx-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(1)}>⬅</button>
        <button className="mx-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(pagBreeds > 1 ? pagBreeds - 1 : 1)}>👈</button>
        <span className="mx-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Página {pagBreeds} de {Math.round(cantPages)}</span>
        <button className="mx-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(pagBreeds < cantPages ? pagBreeds + 1 : cantPages)}>👉</button>
        <button className="mx-1 px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(cantPages)}>➡</button>
      </nav>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ReceiptsView;
