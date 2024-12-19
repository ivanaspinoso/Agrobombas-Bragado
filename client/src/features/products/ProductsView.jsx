import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 👉 por ahora no desactivada: 
import { deleteProductById } from "../../app/actions/products";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.productsReducer.products);

  /* 👇 por ahora no desactivada: ya que cargan en la linea anterior 👆
useEffect(() => {
    dispatch(fetchProducts()); // Cargar productos al montar el componente
  }, [dispatch]); 
  
  */
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchArticle, setSearchArticle] = useState("");

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

  const filteredProducts = products?.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesCategory = product.families
      ?.join(", ")
      .toLowerCase()
      .includes(searchCategory.toLowerCase());
    const matchesArticle = product.article
      .toString()
      .includes(searchArticle);

    return matchesName && matchesCategory && matchesArticle;
  });

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
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Articulo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">$</th>
{/*               <th className="px-4 py-2 text-left">% tarjeta</th> */}
              <th className="px-4 py-2 text-left">$ tarjeta</th>
{/*               <th className="px-4 py-2 text-left">IVA 21%</th>
               <th className="px-4 py-2 text-left">Proveedor</th>  */}
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Modificado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts?.map((product, index) => {
              const {
                id,
                name,
                description,
                price,
                price1,
                price2,
                iva21,
                prov_code,
                stock,
                families,
                article,
              } = product;
              const date = new Date(product.updatedAt).toDateString();
              const date1 = new Date(product.updatedAt).toLocaleDateString('es-AR')
              return (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{article}</td>
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2">{price.toFixed(2).replace(".",",")}</td>
{/*                   <td className="px-4 py-2">{price1}</td>
 */}                  <td className="px-4 py-2">{price2.toFixed(2).replace(".",",")}</td>
{/*                   <td className="px-4 py-2">{iva21}</td> 
                  <td className="px-4 py-2">{prov_code}</td> */}
                  <td className="px-4 py-2">{stock}</td>
                  <td className="px-4 py-2">{date1}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/edit-product`}
                      state={{
                        id,
                        name,
                        description,
                        price,
                        price1,
                        price2,
                        iva21,
                        prov_code,
                        stock,
                        families,
                        article
                      }}
                    >
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
