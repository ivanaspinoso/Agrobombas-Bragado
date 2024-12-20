import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "./CustomerSlice";
import { deleteCustomerById } from "./CustomerSlice";
import { Tooltip } from 'react-tooltip';
import { FcAddRow } from "react-icons/fc";
import { Link,useNavigate } from "react-router-dom";
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import swal from 'sweetalert2';



const CustomersView = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customersReducer?.customers);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  

  const handleDelete = (id,name) => {
    swal
    .fire({
      title: "¿Desea eliminar al cliente " + name + "?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: "success",
    })
    .then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCustomerById(id));
      }
    });
  };

  return (
    <div className ="container mx-auto px-4 py-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center ">
        <h2 className="text-xl font-semibold">
          {/* {t('configuration.systemConfiguration')} */}
          Datos de clientes
        </h2>

        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          <button
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/add-message")}
          >
            <FcAddRow className="mr-2 h-5 w-5" />
            Agregar clientes
          </button>
        </h2>
        </div>
        <table className="table-auto w-full mb-10">
        <thead className="bg-[#0e6fa5] text-white">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Postal Code</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {customers?.map(customer => (
            
          <tr key={customer.id} className="border-b" >
            <td className="px-4 py-2">{customer.id}</td>
            <td className="px-4 py-2">{customer.name}</td>
            <td className="px-4 py-2">{customer.postal_code}</td>
            {/* <td>
              <button onClick={() => handleDelete(customer.id)}>Delete</button>
            </td> */}
            <td className="px-4 py-2 flex gap-2">
            <Link to="/edit-customers"  >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <FaEdit />
                </button>
              </Link>
              <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete()}
                      >
                        <FaTrashAlt />
                      </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Tooltip id="my-tooltip" />

    </div>     
  );
};

export default CustomersView;
