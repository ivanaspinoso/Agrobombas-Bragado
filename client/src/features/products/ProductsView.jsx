import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById } from "../../app/actions/products";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsReducer.products);

  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchArticle, setSearchArticle] = useState("");

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `¿Desea eliminar el producto ${name}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(deleteProductById(id));
        const success = JSON.parse(localStorage.getItem("productDeleted"));
        if (success === true) {
          Swal.fire("Eliminado", "El producto ha sido eliminado correctamente.", "success");
        } else {
          Swal.fire("Error", success, "error");
        }
      }
    });
  };

  const filteredProducts = products?.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDescription = product.description
      ?.toLowerCase()
      .includes(searchCategory.toLowerCase());
    const matchesArticle = product.article
      ? product.article.toString().toLowerCase().includes(searchArticle.trim().toLowerCase())
      : false;
  
    return matchesName && matchesDescription && matchesArticle;
  });
  

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">Lista de Productos</h2>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate("/gestion/bulk-price-update")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            Actualización Masiva
          </button>
          <button
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/gestion/add-product")}
          >
            <FcAddRow className="mr-2 h-5 w-5" />
            Agregar Producto
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Buscar por descripcion"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Buscar por rubro"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-auto"
        />
        <input
          type="text"
          placeholder="Buscar por artículo"
          value={searchArticle}
          onChange={(e) => setSearchArticle(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-auto"
        />
      </div>

      <div className="overflow-x-scroll">
      <table className="w-full table-fixed border-collapse">
      <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="w-[8%] px-4 py-2 text-center border-r border-gray-300">#</th>
              <th
                className="w-[35%] px-4 py-2 text-center border-r border-gray-300 "
                onClick={() => handleSort("name")}
              >
                Nombre{" "}
                <span className="inline-flex">
                  <AiOutlineArrowUp
                    className={`text-[16px] ${
                      sortConfig.key === "name" && sortConfig.direction === "asc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <AiOutlineArrowDown
                    className={`text-[16px] ${
                      sortConfig.key === "name" && sortConfig.direction === "desc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                </span>
              </th>
              <th
                className="w-[20%] px-4 py-2 text-center border-r border-gray-300"
                onClick={() => handleSort("article")}
              >
                Artículo{" "}
                <span className="inline-flex">
                  <AiOutlineArrowUp
                    className={`text-16px ${
                      sortConfig.key === "article" && sortConfig.direction === "asc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <AiOutlineArrowDown
                    className={`text-16px ${
                      sortConfig.key === "article" && sortConfig.direction === "desc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                </span>
              </th>
              <th
                className="w-[30%] px-4 py-2 text-center border-r border-gray-300"
                onClick={() => handleSort("description")}
              >
                Descripción{" "}
                <span className="inline-flex">
                  <AiOutlineArrowUp
                    className={`text-16px ${
                      sortConfig.key === "description" && sortConfig.direction === "asc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                  <AiOutlineArrowDown
                    className={`text-16px ${
                      sortConfig.key === "description" && sortConfig.direction === "desc"
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  />
                </span>
              </th>
              <th className="w-[25%] px-4 py-2 text-center border-r border-gray-300">$ s/IVA</th>
              <th className="w-[25%] px-4 py-2 text-center border-r border-gray-300">$ c/IVA</th>
              <th className="w-[25%]  py-2 text-center border-r border-gray-300">$ tarjeta</th>
              <th className="w-[12%] px-4 py-2 text-center border-r border-gray-300">Stock</th>
              <th className="w-[18%] px-4 py-2 text-center border-r border-gray-300">Modificado</th>
              <th className="w-[20%] px-4 py-2 text-center border-r border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
  {paginatedProducts.map((product, index) => (
    <tr
      key={product.id}
      className={`hover:bg-gray-50 ${
        product.stock === 0 ? "bg-red-100" : ""
      }`}
    >
      <td className="w-[6%] px-4 py-2">
        {currentPage * itemsPerPage - itemsPerPage + index + 1}
      </td>
      <td className="w-[25%] px-4 py-2">{product.name}</td>
      <td className="w-[25%] px-4 py-2">{product.article}</td>
      <td className="w-[40%] px-4 py-2">{product.description}</td>
      <td className="w-[20%] py-2 text-right">
        {!product.price3 || product.price3 === null ? "0,00" : product.price3.toLocaleString(undefined,{minimumFractionDigits: 2})}
      </td>
      <td className=" w-[20%] py-2 text-right">
        {!product.price || product.price === null ? "0,00" : product.price.toLocaleString(undefined,{minimumFractionDigits: 2})}
      </td>
      <td className="w-[20%] px-12 py-2 text-right">
        {!product.price2 || product.price2 === null ? "0,00" : product.price2.toLocaleString(undefined,{minimumFractionDigits: 2})}
      </td>
      <td className="w-[20%] py-2 text-center">{product.stock}</td>
      <td className="w-[20%] px-4 py-2">
        {new Date(product.updatedAt).toLocaleDateString("es-AR")}
      </td>
      <td className="w-[25%] px-4 py-2 flex gap-2">
        <Link to={`/gestion/edit-product`} state={product}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
            <FaEdit />
          </button>
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(product.id, product.name)}
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1 ? "bg-[#0e6fa5] text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;