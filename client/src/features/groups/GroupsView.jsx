import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategories } from "../../app/actions/categories";
import { deletegroup } from "./GroupsSlice";
import { useTranslation } from "react-i18next";
import swal from 'sweetalert2';

const GroupsView = () => {
  const { t } = useTranslation();
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  
  const itemsPerPage = 10;
  
  // Filtrar grupos por nombre
  const filteredGroups = groups.filter((group) =>
    group.name?.toLowerCase().includes(searchName.toLowerCase())
  );
  
  // Lógica de paginación
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );  

  useEffect(() => {
    dispatch(getAllCategories()); 
  }, [dispatch]);

  const handleDelete = async (id, name) => {
    const result = await swal.fire({
      title: `¿Desea eliminar el proveedor ${name}?`,
      showDenyButton: true,
      confirmButtonText: `Sí`,
      icon: "warning",
    });
  
    if (result.isConfirmed) { 
      await dispatch(deleteCategory(id));
      
        const success = JSON.parse(localStorage.getItem("categoryDeleted"));
         if (success === true) {
           swal.fire("Eliminado", "El proveedor ha sido eliminado correctamente.", "success");
         } else {
           swal.fire("Error", success, "error");
         }
      
      localStorage.removeItem("categoryDeleted");
    }
  };
  

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          {t('groupView.listGroup')}
          <button className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" onClick={() => navigate("/add-group")}>
            <FcAddRow className="mr-2 h-5 w-5" />
            {t('groupView.addGroup')}
          </button>
        </h2>
        <div className="overflow-x-scroll">
          <table className="w-full table-auto">
            <thead className="bg-[#0e6fa5] text-white">
              <tr>
                <th className="px-4 py-2 text-center border-r border-gray-300">#</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">{t('groupView.name')} </th>
                <th className="px-4 py-2 text-center border-r border-gray-300">Codigo</th>
                <th className="px-4 py-2 text-center border-r border-gray-300">{t('groupView.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedGroups?.map((group, index) => {
                const { id, code , name } = group;
                return (
                  <tr key={id}>
                    <td className="px-4 py-2 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                    <td className="px-4 py-2  ">{name}</td>
                    <td className="px-4 py-2">{code}</td>
                    <td className="px-4 py-2 flex gap-2 flex justify-end">
                      <Link to={`/edit-group`} state={{ id,name, code }}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
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
          {/* Paginación */}
          <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-[#0e6fa5] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsView;
