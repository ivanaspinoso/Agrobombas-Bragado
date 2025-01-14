import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { REACT_APP_API } from "../../app/consts/consts";
import { fetchAllCaccounts } from "./CaccountsSlice";

const CaccountsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const caccounts = useSelector((state) => state.caccountReducer?.caccounts);
  const customers = useSelector((state) => state.customersReducer.customers);

  console.log("Cuentas del cliente desde Redux:", caccounts); 

  const [customerId, setCustomerId] = useState(null); // Cliente seleccionado
  const [, setCustomers] = useState([]); // Lista de clientes

  // Cargar lista de clientes al montar el componente
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}customers`);
        console.log("Datos obtenidos en fetchAllCaccounts:", response.data);  

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
      // Si hay un cliente seleccionado, carga sus cuentas
      dispatch(fetchAllCaccounts(customerId));
    }
  }, [customerId, dispatch]);
  
  const handleCustomerChange = (event) => {
    setCustomerId(event.target.value);
  };
  

  // const handleDelete = (id) => {
  //   dispatch(deleteCaccountById(id)); // Eliminar movimiento de cuenta
  // };


  return (
    <div className="caccounts-view">
      <h1>Movimientos por Cliente</h1>

      {/* Selección de cliente */}
      <div className="select-customer">
        <label htmlFor="customer-select">Seleccionar Cliente:</label>
        <select
          id="customer-select"
          value={customerId || ""}
          // onChange={(e) => setCustomerId(e.target.value)}
         onChange={handleCustomerChange}

        >
          <option value=""> Seleccione un cliente </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} 
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de movimientos */}
      <table className="w-full table-auto">
        <thead className="bg-[#0e6fa5] text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Monto</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {caccounts?.length > 0 ? (
            caccounts.map((caccount) => (
              <tr key={caccount.id}>
                <td className="px-4 py-2">{caccount.id}</td>
                <td className="px-4 py-2">{new Date(caccount.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{caccount.description}</td>
                <td className="px-4 py-2">{caccount.income}</td>
                <td className="px-4 py-2">{caccount.outflow}</td>
                <td className="px-4 py-2">{caccount.note}</td>


                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    // onClick={() => navigate(`/edit/${caccount.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    // onClick={() => handleDelete(caccount.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                No hay movimientos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaccountsView;
