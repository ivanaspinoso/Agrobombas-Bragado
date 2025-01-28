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
        <button
          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => navigate("/add-product")}
        >
          <FcAddRow className="mr-2 h-5 w-5" />
          Agregar Producto
        </button>
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
        <table className="w-full table-auto">
          <thead className="bg-[#0e6fa5] text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th
                className="px-4 py-2 text-left cursor-pointer"
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
                className="px-4 py-2 text-left cursor-pointer"
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
                className="px-4 py-2 text-left cursor-pointer"
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
              <th className="px-4 py-2 text-left">$</th>
              <th className="px-4 py-2 text-left">$ tarjeta</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Modificado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
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
      <td className="px-4 py-2">
        {currentPage * itemsPerPage - itemsPerPage + index + 1}
      </td>
      <td className="px-4 py-2">{product.name}</td>
      <td className="px-4 py-2">{product.article}</td>
      <td className="px-4 py-2">{product.description}</td>
      <td className="py-2 text-right">
        {parseFloat(product.price).toFixed(2).replace(".", ",")}
      </td>
      <td className="px-12 py-2 text-right">
        {parseFloat(product.price2).toFixed(2).replace(".", ",")}
      </td>
      <td className="py-2 text-center">{product.stock}</td>
      <td className="px-4 py-2">
        {new Date(product.updatedAt).toLocaleDateString("es-AR")}
      </td>
      <td className="px-4 py-2 flex gap-2">
        <Link to={`/edit-product`} state={product}>
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