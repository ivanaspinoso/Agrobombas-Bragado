import React from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { useTranslation } from "react-i18next";
import Spain from '../../assets/images/spain.jpg'
import Usa from '../../assets/images/usa.jpg'

const CompanysView = () => {
  const { t, i18n } = useTranslation();
  const companys = useSelector((state) => state.companysReducer.companys);

  let objCompany = { id: companys.id, address: companys.address, cuit: companys.cuit };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (lng) => i18n.language === lng;

  return (
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold">
          {/* {t('configuration.systemConfiguration')} */}
          Datos de empresa
        </h2>
       {/*  <div className="flex space-x-4 items-center">
          <button
            onClick={() => changeLanguage('en')}
            className={`flex items-center px-3 py-2 rounded ${isActive('en') ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <img src={Usa} alt="English" className="w-4 h-4 mr-2" />
            EN
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`flex items-center px-3 py-2 rounded ${isActive('es') ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <img src={Spain} alt="Español" className="w-4 h-4 mr-2" />
            ES
          </button>
        </div> */}
      </div>
      <table className="table-auto w-full mb-10">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">{t('config.bussiness')}</th>
            <th className="px-4 py-2 text-left">{t('config.slogan')}</th>
            <th className="px-4 py-2 text-left">{t('config.action')}</th>
          </tr>
        </thead>
        <tbody>
          <tr key={companys.id} className="border-b">
            <td className="px-4 py-2">{1}</td>
            <td className="px-4 py-2">{companys.name}</td>
            <td className="px-4 py-2">{companys.address}</td>
            <td className="px-4 py-2 flex gap-2">
              <Link to="/edit-company" state={objCompany}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
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

export default CompanysView;
