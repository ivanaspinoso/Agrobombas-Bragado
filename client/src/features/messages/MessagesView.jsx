import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { messageDelete } from "../../app/actions/messages";
import { Tooltip } from 'react-tooltip';
import { useTranslation } from "react-i18next";
import swal from 'sweetalert2';

const MessagesView = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesReducer.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pagBreeds, setPagBreeds] = useState(1);
  const itemsPPage = 15;
  const totalItems = pagBreeds * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(messages.length / itemsPPage);
  const view = messages.slice(inicialItems, totalItems);

  const handleDelete = (id, text) => {
    swal
      .fire({
        title: "Desea eliminar el mensaje?",
        html: text,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(messageDelete(id));
        }
      });
  };

  return (
    <div className="container mx-auto px-4 flex flex-col flex-grow">
      <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-5">
        {t('messagesView.messageList')}
        <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-message")}>
          <FcAddRow className="mr-2 h-5 w-5" />
          {t('messagesView.addMessage')}
        </button>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">{t('messagesView.text')}</th>
              <th className="px-4 py-2 text-left">{t('messagesView.to')}</th>
              <th className="px-4 py-2 text-left">{t('messagesView.send')}</th>
              <th className="px-4 py-2 text-left">{t('messagesView.time')}</th>
              <th className="px-4 py-2 text-left">{t('messagesView.action')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {view.map((message, index) => {
              const { id, text, sended, contact, senddate, sendtime } = message;
              return (
                <tr key={id}>
                  <td className="px-4 py-2">{index + 1 + (pagBreeds > 1 ? ((pagBreeds - 1) * 15) : 0)}</td>
                  <td className="px-4 py-2">{text}</td>
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{senddate}</td>
                  <td className="px-4 py-2">{sendtime}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link to="/edit-group" state={{ id, text, sended }}>
                      <button className="disabled:opacity-50" disabled={sended}><FaEdit /></button>
                    </Link>
                    <button className="disabled:opacity-50" disabled={sended} onClick={() => handleDelete(id, text)}><FaTrashAlt /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav aria-label="Pagination" className="mt-6 flex justify-end">
        <button className="px-4 py-2 mr-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(1)}>⬅</button>
        <button className="px-4 py-2 mr-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(pagBreeds - 1)}>👈</button>
        <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500">{pagBreeds} de {Math.round(cantPages)}</span>
        <button className="px-4 py-2 ml-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(pagBreeds + 1)}>👉</button>
        <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagBreeds(cantPages)}>➡</button>
      </nav>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default MessagesView;
