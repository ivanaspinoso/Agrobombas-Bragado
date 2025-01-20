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
  const caccounts = useSelector((state) => state.caccountsReducer?.caccounts);
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
    }
  }, [customerId, dispatch]);
  
  
  const handleCustomerChange = (event) => {
    const selectedId = event.target.value;
  
    if (selectedId === "") {
      setCustomerId(null);
      dispatch(fetchAllCaccounts([]));
    } else {
      console.log("Cliente seleccionado:", selectedId);
      setCustomerId(selectedId);
    }
  };
  
  
  // useEffect(() => {
  //   if (customerId) {
  //     dispatch(fetchAllCaccounts(customerId));
  //   }
  // }, [customerId, dispatch]);
  
  // const handleDelete = (id) => {
  //   dispatch(deleteCaccountById(id)); // Eliminar movimiento de cuenta
  // };


  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-10">

<h2 className="text-xl font-semibold">Movimientos por Cliente</h2>
      {/* Selección de cliente */}
      <div className="text-left text-xl font-bold uppercase ">
        <label htmlFor="text-left text-xl font-bold uppercase ">Seleccionar Cliente:</label>
        <select
          id="customer-select"
          value={customerId || ""}
          // onChange={(e) => setCustomerId(e.target.value)}
         onChange={handleCustomerChange}

        >
          <option value="" className=" text-xl  uppercase "> Seleccione un cliente </option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} 
            </option>
          ))}
        </select>
      </div>
      </div>
      {/* Tabla de movimientos */}
      <table className="w-full table-auto border border-gray-200">
  <thead className="bg-[#0e6fa5] text-white">
    <tr>
      <th className="px-4 py-2 text-left">ID</th>
      <th className="px-4 py-2 text-left">Fecha</th>
      <th className="px-4 py-2 text-left">Descripción</th>
      <th className="px-4 py-2 text-left">Monto</th>
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
          <td className="px-4 py-2">{caccount1.income}</td>
          <td className="px-4 py-2 text-center">
            <div className="flex justify-center space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Editar"
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
        <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
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
