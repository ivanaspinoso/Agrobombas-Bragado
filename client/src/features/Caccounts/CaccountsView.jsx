import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { REACT_APP_API } from "../../app/consts/consts";
import { deleteCaccountById, fetchAllCaccounts, obtenerSaldo } from "./CaccountsSlice";

const CaccountsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const caccounts = useSelector((state) => state.caccountsReducer?.caccounts);
  const saldoscac = useSelector((state) => state.caccountsReducer?.saldo);
  const customers = useSelector((state) => state.customersReducer.customers);

  const [customerId, setCustomerId] = useState(null);
  const [showSaldo, setShowSaldo] = useState(false);
  const [allCustomersBalance, setAllCustomersBalance] = useState([]);

  useEffect(() => {
    const fetchAllCustomersBalance = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}caccounts/allcaccounts`);
        setAllCustomersBalance(response.data);
      } catch (error) {
        Swal.fire("Error", "No se pudo obtener el resumen de cuentas", "error");
        console.error(error);
      }
    };

    if (!customerId) {
      fetchAllCustomersBalance();
    }
  }, [customerId]);

  useEffect(() => {
    if (customerId) {
      dispatch(fetchAllCaccounts(customerId));
      dispatch(obtenerSaldo(customerId));
      setShowSaldo(true);
    } else {
      setShowSaldo(false);
    }
  }, [customerId, dispatch]);

  const handleCustomerChange = (event) => {
    const selectedId = event.target.value;
    setCustomerId(selectedId || null);
    setShowSaldo(!!selectedId);
  };

  const handleDelete = (id, description, vta, client) => {
    console.log(vta);
    (vta === null || vta === undefined) ? Swal.fire({
          title: `¿Desea eliminar el movimiento: ${description}?`,
          showDenyButton: true,
          confirmButtonText: "Sí",
          denyButtonText: "No",
          icon: "warning",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(deleteCaccountById(id));

            const success = JSON.parse(localStorage.getItem("caccountDeleted"));
            if (success === true) {
              Swal.fire(
                "Eliminado",
                "El movimiento ha sido eliminado correctamente.",
                "success"
              );
              await dispatch(obtenerSaldo(client));
            } else {
              Swal.fire("Error", success, "error");
            }
          }
        })
      : Swal.fire(
        "Movimiento asociado",
        "No se puede eliminar movimiento: " +
          description +
          ". Asociado a venta o movimiento de cuenta",
        "error"
      );
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Movimientos por Cliente</h2>

        {showSaldo && (
          <div className="bg-gray-100 px-6 py-3 rounded-lg shadow-md flex justify-center items-center gap-8">
            <div className="text-lg font-semibold text-gray-600 text-right">
              <strong>Debe:</strong>{" "}
              <span className="text-red-600">
              ${!saldoscac?.debe || saldoscac?.debe === null ? "0,00" : saldoscac?.debe.toLocaleString(undefined,{minimumFractionDigits: 2})}
              </span>            
              </div>
            <div className="text-lg font-semibold text-gray-600 text-right">
              <strong>Paga:</strong>{" "}
              <span className="text-green-600">
              ${!saldoscac?.debe || saldoscac?.paga === null ? "0,00" : saldoscac?.paga.toLocaleString(undefined,{minimumFractionDigits: 2})}
              </span>            
              </div>
            <div className="text-lg font-semibold text-gray-600 text-right">
              <strong>Saldo:</strong>{" "}
              <span className={`${saldoscac?.saldado != "deudor" ? "text-green-600" : "text-red-600"}`}>
                ${!saldoscac?.debe || saldoscac?.saldo === null ? "0,00" : saldoscac?.saldo.toLocaleString(undefined,{minimumFractionDigits: 2})}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          <label htmlFor="customer-select" className="text-lg font-bold uppercase">
            Seleccionar Cliente:
          </label>
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

      {customerId && (
        <div className="mb-4 flex justify-end">
          <button
            className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate(`/gestion/add-caccount`,{state: customerId})} ///${customerId}
          >
            Agregar Movimiento
          </button>
        </div>
      )}

      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-[#0e6fa5] text-white">
          <tr>
            {customerId ? (
              <>
                <th className="px-4 py-2 text-center border-r border-gray-300">ID</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Fecha</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Descripción</th>
                <th className="px-4 py-2 text-right border-r border-gray-300">Debe</th>
                <th className="px-4 py-2 text-right border-r border-gray-300">Paga</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Acciones</th>
              </>
            ) : (
              <>
                <th className="px-4 py-2 text-center border-r border-gray-300">Cliente</th>
                <th className="px-4 py-2 text-right border-r border-gray-300">Debe</th>
                <th className="px-4 py-2 text-right border-r border-gray-300">Paga</th>
                <th className="px-4 py-2 text-right border-r border-gray-300">Saldo</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {customerId ? (
            caccounts?.length > 0 ? (
              caccounts.map((caccount) => (
                <tr key={caccount.id} className="border-b">
                  <td className="px-4 py-2 text-center">{caccount.id}</td>
                  <td className="px-4 py-2">{new Date(caccount.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{caccount.description}</td>
                  <td className="px-4 py-2 text-right">
                  {!caccount.income || caccount.income === null ? "0,00" : caccount.income.toLocaleString(undefined,{minimumFractionDigits: 2})}
                </td>    
                <td className="px-4 py-2 text-right">
                  {!caccount.outflow || caccount.outflow === null ? "0,00" : caccount.outflow.toLocaleString(undefined,{minimumFractionDigits: 2})}
                </td>                    
                 <td className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Editar"
                        onClick={() => navigate(`/gestion/edit-caccount`, { state: caccount })} ///${caccount1.id}
                        >
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" title="Eliminar"
                      onClick={() => handleDelete(caccount.id, caccount.description, caccount.vta_asoc, caccount.client_asoc)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No hay movimientos.
                </td>
              </tr>
            )
          ) : (
            allCustomersBalance.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td className="text-right text-red-600">${!customer.debe || customer.debe === null ? "0,00" : customer.debe.toLocaleString(undefined,{minimumFractionDigits: 2})}</td>
                <td className="text-right text-green-600">${!customer.paga || customer.paga === null ? "0,00" : customer.paga.toLocaleString(undefined,{minimumFractionDigits: 2})}</td>
                <td className="text-right">${!customer.saldo || customer.saldo === null ? "0,00" : customer.saldo.toLocaleString(undefined,{minimumFractionDigits: 2})}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaccountsView;
