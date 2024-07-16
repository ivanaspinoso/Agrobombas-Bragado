import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import { Tooltip } from 'react-tooltip';
import { useTranslation } from "react-i18next";
import swal from 'sweetalert2';

const SendedView = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesReducer.messages);
  const sendedMessages = messages.filter((message) => message.sended === true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pagContacts, setPagContacts] = useState(1); // comienza en página 1
  const itemsPPage = 15;
  const totalItems = pagContacts * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(sendedMessages.length / itemsPPage);
  const view = sendedMessages.slice(inicialItems, totalItems);

  const handleDelete = (id, text) => {
    swal.fire({
      title: "¿Desea eliminar el mensaje " + text + "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col flex-grow">
      <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-5">
        {t('send.sentList')}
        <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-message")}>
          <FcAddRow className="mr-2 h-5 w-5" />
          {t('send.addMessage')}
        </button>
      </h2>
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">{t('send.text')}</th>
              <th className="px-4 py-2 text-left">{t('send.to')}</th>
              <th className="px-4 py-2 text-left">{t('send.send')}</th>
              <th className="px-4 py-2 text-left">{t('send.result')}</th>
              <th className="px-4 py-2 text-left">{t('send.action')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {view && view.map((message, index) => {
              const { id, text, contact, sendeddate, sendedtime, result } = message;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1 + (pagContacts - 1) * itemsPPage}</td>
                  <td className="border px-4 py-2">{text}</td>
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{sendeddate} - {sendedtime}</td>
                  <td className="border px-4 py-2">{result}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <Link to="/edit-group" state={{ id, text }}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <FaEdit />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(id, text)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav className="mt-6 flex justify-end">
        <button
          className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setPagContacts(1)}
          disabled={pagContacts === 1}>
          ⬅
        </button>
        <button
          className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => { pagContacts > 1 ? setPagContacts(pagContacts - 1) : setPagContacts(1); }}
          disabled={pagContacts === 1}>
          👈
        </button>
        <span className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          {pagContacts} de {cantPages}
        </span>
        <button
          className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => { pagContacts < cantPages ? setPagContacts(pagContacts + 1) : setPagContacts(cantPages); }}
          disabled={pagContacts === cantPages}>
          👉
        </button>
        <button
          className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setPagContacts(cantPages)}
          disabled={pagContacts === cantPages}>
          ➡
        </button>
      </nav>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default SendedView;
