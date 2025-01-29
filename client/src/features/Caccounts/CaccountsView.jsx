import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { REACT_APP_API } from "../../app/consts/consts";
import { fetchAllCaccounts, obtenerSaldo } from "./CaccountsSlice";

const CaccountsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const caccounts = useSelector((state) => state.caccountsReducer?.caccounts);
  const saldoscac = useSelector((state) => state.caccountsReducer?.saldo);
  const customers = useSelector((state) => state.customersReducer.customers);

  const [customerId, setCustomerId] = useState(null);
  const [, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}customers`);
        setCustomers(response.data);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la lista de clientes", "error");
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchAllCaccounts(customerId));
      dispatch(obtenerSaldo(customerId));
    }
  }, [customerId, dispatch]);

  const handleCustomerChange = (event) => {
    const selectedId = event.target.value;

    if (selectedId === "") {
      setCustomerId(null);
      dispatch(fetchAllCaccounts([]));
    } else {
      setCustomerId(selectedId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Movimientos por Cliente</h2>

        {/* Selección de cliente */}
        <div className="text-left text-xl font-bold uppercase">
          <label htmlFor="customer-select">Seleccionar Cliente:</label>
          <select
            id="customer-select"
            value={customerId || ""}
            onChange={handleCustomerChange}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">Seleccione un cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenedor de Saldos Mejorado */}
      {customerId && (
        <div className="flex flex-col items-center mb-6">
        <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md flex justify-center items-center gap-4">
          <div className="text-lg font-semibold text-gray-600 text-center flex gap-2">
            <strong>Debe:</strong>
            <span className="text-red-600">${parseFloat(saldoscac?.debe).toFixed(2)}</span>
            <strong>Paga:</strong>
            <span className="text-green-600">${parseFloat(saldoscac?.paga).toFixed(2)}</span>
          </div>
          <div className="text-lg font-semibold text-gray-600 text-center">
            <strong>Saldo:</strong>
            <span className={`${parseFloat(saldoscac?.saldo) >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${parseFloat(saldoscac?.saldo).toFixed(2)}
            </span>
          </div>
        </div>
    
      
      
        {/* Botón para agregar movimiento, alineado a la derecha */}
        <div className="mt-4 self-end">
          <button
            className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate(`/caccounts/add/${customerId}`)}
          >
            Agregar Movimiento
          </button>
        </div>
      </div>
      )}

      {/* Tabla de movimientos */}
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-[#0e6fa5] text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Debe</th>
            <th className="px-4 py-2 text-left">Paga</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customerId && caccounts?.length > 0 ? (
            caccounts.map((caccount1) => (
              <tr key={caccount1.id} className="border-b">
                <td className="px-4 py-2">{caccount1.id}</td>
                <td className="px-4 py-2">
                  {new Date(caccount1.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{caccount1.description}</td>
                <td className="px-4 py-2 text-right">
                  {parseFloat(caccount1.income).toFixed(2).replace(".", ",")}
                </td>
                <td className="px-4 py-2 text-right">
                  {parseFloat(caccount1.outflow).toFixed(2).replace(".", ",")}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Editar"
                      onClick={() => navigate(`/caccounts/edit/${caccount1.id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                {customerId
                  ? "No hay movimientos disponibles para este cliente."
                  : "Seleccione un cliente para ver los movimientos."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaccountsView;
