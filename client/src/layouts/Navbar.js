import React from "react";
import logo from "../assets/images/logo64.png";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.usersReducer.login);

  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex flex-row items-center space-x-4">
          <Link
            to="/"
            className="text-white text-xl font-semibold hover:text-gray-200 transition duration-300 flex flex-row gap-4 justify-center items-center"
          >
            <img
              src={logo}
              alt="Logo Wapp Message System"
              className="w-8 h-8"
            />
            WApp Message System
          </Link>
        </div>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Open menu"
            onClick={() =>
              document
                .getElementById("navbarMobileMenu")
                .classList.toggle("hidden")
            }
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          {login.id && (
            <>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/"
              >
                {t("navbar.home")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-groups"
              >
                {t("navbar.groups")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-contacts"
              >
                Contactos
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-messages"
              >
                {t("navbar.messages")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/queue-messages"
              >
                {t("navbar.stack")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/sended-messages"
              >
                {t("navbar.sent")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-receipts"
              >
                {t("navbar.received")}
              </Link>
              <Link
                className="text-white hover:text-gray-300 transition duration-300"
                to="/show-configs"
              >
                {t("navbar.settings")}
              </Link>
            </>
          )}
          {login.id && (
            <button
              className="ml-4 flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300 shadow-md"
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
            >
              <span> {t("navbar.logout")}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div id="navbarMobileMenu" className="lg:hidden hidden">
        <div className="px-6 pt-2 pb-4 space-y-4">
          {login.id && (
            <>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/"
              >
                Inicio
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/show-groups"
              >
                Grupos
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/show-contacts"
              >
                Contactos
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/show-messages"
              >
                Mensajes
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/queue-messages"
              >
                Cola
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/sended-messages"
              >
                Enviados
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/show-receipts"
              >
                Recibidos
              </Link>
              <Link
                className="block text-white hover:text-gray-300 transition duration-300"
                to="/show-configs"
              >
                Configuración
              </Link>
            </>
          )}
          {login.id && (
            <button
              className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300 shadow-md"
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
            >
              Salir
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-2 h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
