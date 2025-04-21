import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Agrobombas from "../assets/images/logonuevo.jpeg";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useSelector((state) => state.usersReducer.login);

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  // ✅ Función para cerrar menú y navegar en Mobile
  const handleMenuClick = (route) => {
    navigate(route); // 🚀 Navega primero
    document.getElementById("navbarMobileMenu")?.classList.add("hidden");
  };

  // ✅ Lista de opciones del menú (mismo en Desktop y Mobile)
  const menuOptions = [
    { label: t("navbar.home"), route: "/gestion" }, // home
    { label: t("navbar.groups"), route: "/show-groups" }, // proveedores
    { label: t("navbar.families"), route: "/show-families" }, // rubros
    { label: t("navbar.messages"), route: "/show-messages" }, // productos
    { label: t("navbar.stack"), route: "/queue-messages" }, // clientes
    { label: t("navbar.settings"), route: "/show-configs" }, // ventas
    { label: t("navbar.buys"), route: "/show-buys" }, // compras
    { label: t("navbar.sent"), route: "/show-cashflows" }, // caja
    { label: t("navbar.received"), route: "/show-caccounts" }, // cuentas

  ];

  return (
    <nav className="bg-[#0e6fa5] p-4 shadow-lg no-print">
      <div className="container mx-auto flex items-center justify-between">
        {/* 🔹 LOGO */}
        <div className="flex flex-row items-center space-x-4">
          <Link to="/" className="text-white text-xl font-semibold hover:text-gray-200 flex items-center gap-4">
            <img src={Agrobombas} alt="Logo" className="w-18 h-10 rounded-md" />
            Agro Bombas Bragado
          </Link>
        </div>
        {/* 🔹 Botón Menú Mobile icono 3 rayitas */}
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => document.getElementById("navbarMobileMenu")?.classList.toggle("hidden")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* 🔹 Menú Desktop */}
        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          {login.id &&
            menuOptions.map((option) => (
              <Link
                key={option.route}
                className={`text-white hover:text-gray-300 transition duration-300 relative ${
                  isActiveRoute(option.route) 
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`}
                to={option.route}
              >
                {option.label}
              </Link>
            ))}
          {login.isAdmin && login.username !== "mostrador" && (
            <>
              <Link 
                className={`text-white hover:text-gray-300 transition duration-300 relative ${
                  isActiveRoute("/show-users") 
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`} 
                to="/show-users"
              >
                {t("Usuarios")}
              </Link>
              <Link 
                className={`text-white hover:text-gray-300 transition duration-300 relative ${
                  isActiveRoute("/show-companys") 
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`} 
                to="/show-companys"
              >
                {t("navbar.contacts")}
              </Link>
            </>
          )}
          {/* 🔹 Botón Logout desktop */}
          { login.hasOwnProperty("id") ? <button
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center"
            onClick={() => {
              dispatch(logOut());
              navigate("/login");
            }}
          >
            {t("navbar.logout")}
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
          </button> : "" }
        </div>

      </div>
 {/* 👇 menu duplicado para mobile ? // refactorizar y hacer uno solo que cambie el style segun pantalla */}
      {/* 🔹 Menú Mobile */}
      <div id="navbarMobileMenu" className="lg:hidden hidden">
        <div className="px-6 pt-4 pb-6 space-y-4">
          {login.id &&
            menuOptions.map((option) => (
              <button
                key={option.route}
                className={`block text-white hover:text-gray-300 text-lg font-semibold w-full text-left relative pb-2 ${
                  isActiveRoute(option.route)
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`}
                onClick={() => handleMenuClick(option.route)}
              >
                {option.label}
              </button>
            ))}
          {login.isAdmin && login.username !== "mostrador" && (
            <>
              <button 
                className={`block text-white hover:text-gray-300 text-lg font-semibold w-full text-left relative pb-2 ${
                  isActiveRoute("/show-users")
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`} 
                onClick={() => handleMenuClick("/show-users")}
              >
                {t("Usuarios")}
              </button>
              <button 
                className={`block text-white hover:text-gray-300 text-lg font-semibold w-full text-left relative pb-2 ${
                  isActiveRoute("/show-companys")
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ''
                }`} 
                onClick={() => handleMenuClick("/show-companys")}
              >
                {t("navbar.contacts")}
              </button>
            </>
          )}
          {/* 🔹 Botón Logout */}
          { login.hasOwnProperty("id") ? <button
            className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center justify-center"
            onClick={() => {
              dispatch(logOut());
              navigate("/login");
            }}
          >
            {t("navbar.logout")}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
            </svg>
          </button> : "" }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
