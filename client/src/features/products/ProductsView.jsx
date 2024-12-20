import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProductById } from "./ProductsSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsReducer.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `¿Desea eliminar el producto ${name}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductById(id));
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Lista de Productos</h2>
        <button
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/add-product")}
        >
          <FcAddRow className="mr-2 h-5 w-5" />
          Agregar Producto
        </button>
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripcion</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.map((product, index) => {
              const { id, name, description } = product;
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link to={`/edit-product`} state={{ id, name, description }}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(id, name)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsView;
