import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory } from "../../app/actions/categories";
import { Tooltip } from 'react-tooltip';
import swal from 'sweetalert2';

const SendedView = () => {
  const messages = useSelector((state) => state.messagesReducer.messages);
  const sendedMessages = messages.filter((message) => message.sended === true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = sendedMessages.slice(indexOfFirstMessage, indexOfLastMessage);

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
    <div className="container mx-auto px-4 flex flex-col flex-grow">
      <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-5">
        Listado de mensajes enviados
        <button 
          onClick={() => navigate("/add-message")} 
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <FcAddRow />
        </button>
      </h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Texto</th>
            <th className="px-4 py-2 text-left">Para</th>
            <th className="px-4 py-2 text-left">Enviado</th>
            <th className="px-4 py-2 text-left">Resultado</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentMessages.map((message, index) => {
            const { id, text, contact, sendedDate, sendedTime, result } = message;
            return (
              <tr key={id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{text}</td>
                <td className="px-4 py-2">{contact.name}</td>
                <td className="px-4 py-2">{sendedDate} - {sendedTime}</td>
                <td className="px-4 py-2">{result}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <Link to={`/edit-group`} state={{ id, text }}>
                    <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
                      <FaEdit />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(id, text)} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          onClick={() => setCurrentPage(1)} 
          className="px-2 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
          Primera página
        </button>
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          className="px-2 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="flex items-center">
          Página {currentPage} de {Math.ceil(sendedMessages.length / itemsPerPage)}
        </span>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          className="px-2 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
          disabled={currentPage === Math.ceil(sendedMessages.length / itemsPerPage)}>
          Siguiente
        </button>
        <button 
          onClick={() => setCurrentPage(Math.ceil(sendedMessages.length / itemsPerPage))} 
          className="px-2 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400">
          Última página
        </button>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default SendedView;
