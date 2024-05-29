import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

const ConfigsView = () => {
  const configs = useSelector((state) => state.configsReducer.configs);

  let objConfig = { id: configs.id, business: configs.business, slogan: configs.slogan };

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-center flex flex-row justify-between text-xl font-semibold mb-10">
        Configuración del sistema
      </h2>
      <table className="table-auto w-full mb-10">
        <thead className="bg-green-500 text-white">
          <tr>
            <th>ID</th>
            <th>Business</th>
            <th>Slogan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={configs.id}>
            <td>{1}</td>
            <td>{configs.business}</td>
            <td>{configs.slogan}</td>
            <td className="flex gap-2">
              <Link to="/edit-config" state={objConfig}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <FaEdit />
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Asegúrate de tener una referencia única para cada tooltip si vas a usar varias */}
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ConfigsView;
