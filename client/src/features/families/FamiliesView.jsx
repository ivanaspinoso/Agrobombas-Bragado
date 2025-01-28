import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcAddRow } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import swal from "sweetalert2";
import { familyDelete } from "../../app/actions/families";

const FamiliesView = () => {
  const { t } = useTranslation();
  const families = useSelector((state) => state.familiesReducer.families);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const itemsPerPage = 10;

  const handleDelete = (id, name) => {
    swal
      .fire({
        title: `¿Desea eliminar la familia ${name}?`,
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: "No",
        icon: "warning",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(familyDelete(id));
          const success = JSON.parse(localStorage.getItem("familyDeleted"));
          if (success === true) {
            swal.fire(
              "Eliminado",
              "La familia ha sido eliminada correctamente.",
              "success"
            );
          } else {
            swal.fire("Error", success, "error");
          }
        }
      });
  };

  // Filtrar familias por nombre
  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Lógica de paginación
  const totalPages = Math.ceil(filteredFamilies.length / itemsPerPage);
  const paginatedFamilies = filteredFamilies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col flex-grow">
      <div className="container mx-auto px-4">
        <h2 className="text-center flex flex-row justify-between text-xl font-semibold my-10">
          {t("familieView.listFamily")}
          <button
            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0e6fa5] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => navigate("/add-families")}
          >
            <FcAddRow className="mr-2 h-5 w-5" />
            {t("familieView.addFamilies")}
          </button>
        </h2>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border px-3 py-2 rounded-md mb-5 w-full sm:w-auto"
        />
        <div className="overflow-x-scroll">
          <table className="w-full table-auto">
            <thead className="bg-[#0e6fa5] text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">{t("name")}</th>
                <th className="px-4 py-2 text-left">{t("description")}</th>
                <th className="px-4 py-2 text-left">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedFamilies.map((family, index) => (
                <tr key={family.id}>
                  <td className="px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2">{family.name}</td>
                  <td className="px-4 py-2">{family.description}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      to={`/edit-families`}
                      state={{
                        id: family.id,
                        name: family.name,
                        description: family.description,
                      }}
                    >
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(family.id, family.name)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
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

export default FamiliesView;
