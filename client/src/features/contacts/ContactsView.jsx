import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { contactDelete, contactsSort } from "../../app/actions/contacts";
import { ASC, DES } from "../../app/consts/consts";
import { useTranslation } from "react-i18next";
import { Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";

const ContactsView = () => {
  const { t } = useTranslation();
  const contacts = useSelector((state) => state?.contactsReducer?.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pagContacts, setPagContacts] = useState(1); // comienza en página 1
  const itemsPPage = 15;
  const totalItems = pagContacts * itemsPPage;
  const inicialItems = totalItems - itemsPPage;
  const cantPages = Math.ceil(contacts.length / itemsPPage);
  const view = contacts.slice(inicialItems, totalItems);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Desea eliminar el contacto " + name + "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(contactDelete(id));
      }
    });
  };

  function handleDispatchOrder(event) {
    if (event.target.value === ASC || event.target.value === DES) {
      dispatch(contactsSort(event.target.value, contacts))
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col flex-grow ">
      <h2 className="text-center flex flex-row justify-between text-2xl font-semibold mb-10">
        {t('contactsView.contactList')}
        <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => { navigate("/add-contact") }}>
          <FcAddRow className="mr-2 h-5 w-5" />
          {t('contactsView.addContact')}
        </button>
      </h2>
      <div className="flex justify-end mb-4">
        <label htmlFor="sortSelect" className="mr-2">
          {t('contactsView.order')}:
        </label>
        <select
          id="sortSelect"
          onChange={handleDispatchOrder}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value="">{t('contactsView.selectOrder')}</option>
          <option value={ASC}>A-Z</option>
          <option value={DES}>Z-A</option>
        </select>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">{t('contactsView.name')}</th>
              <th className="px-4 py-2 text-left">{t('contactsView.wanumber')}</th>
              <th className="px-4 py-2 text-left">{t('contactsView.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {view && view.map((contact, index) => {
              const { id, name, cellphone, categories } = contact;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{name}</td>
                  <td className="border px-4 py-2">{cellphone}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <Link to={`/edit-contact`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" state={{ id, name, cellphone, categories }}>
                      <FaEdit />
                    </Link>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(id, name)}>
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
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts(1)}>⬅</button>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => { pagContacts > 1 ? setPagContacts(pagContacts - 1) : setPagContacts(1); }}>👈</button>
        <span className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">{pagContacts} de {Math.round(cantPages)}</span>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => { pagContacts < cantPages ? setPagContacts(pagContacts + 1) : setPagContacts(cantPages); }}>👉</button>
        <button className="mx-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setPagContacts(cantPages)}>➡</button>
      </nav>
    </div>
  );
};

export default ContactsView;
