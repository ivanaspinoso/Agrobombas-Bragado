import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';

const ConfigsView = () => {
  const configs = useSelector((state) => state.configsReducer.configs);


console.log("Figu", configs)

let objConfig= {id: configs.id, business: configs.business, slogan: configs.slogan}

  return (
    <div className="container">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Configuración del sistema
      </h2>
      <table
        className="table mb-5"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <thead>
          <tr style={{ background: "#006877", color: "white" }}>
            <th>ID</th>
            <th>Business</th>
            <th>Slogan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

                <tr key={configs.id}>
                  <th>{1}</th>
                  <td>{configs.business}</td>
                  <td>{configs.slogan}</td>
                  <td className="d-flex gap-2">
                    {  }
                    <Link to="/edit-config" state={objConfig}>
                      <button data-tooltip-id="my-tooltip" data-tooltip-content="Edit Connfig">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                </tr>

        </tbody>
      </table>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ConfigsView;