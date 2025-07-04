import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Agrobombas from "../assets/images/logonuevo.jpeg";
import AvisoPago from "./AvisoPago";

const Navbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const login = useSelector((state) => state.usersReducer.login);

  const isActiveRoute = (route) => location.pathname === route;

  const handleMenuClick = (route) => {
    navigate(route);
    document.getElementById("navbarMobileMenu")?.classList.add("hidden");
  };

  const menuOptions = [
    { label: t("navbar.home"), route: "/gestion" },
    { label: t("navbar.groups"), route: "gestion/show-groups" },
    { label: t("navbar.families"), route: "gestion/show-families" },
    { label: t("navbar.messages"), route: "gestion/show-messages" },
    { label: t("navbar.stack"), route: "gestion/queue-messages" },
    { label: t("navbar.settings"), route: "gestion/show-configs" },
    { label: t("navbar.buys"), route: "gestion/show-buys" },
    { label: t("navbar.sent"), route: "gestion/show-cashflows" },
    { label: t("navbar.received"), route: "gestion/show-caccounts" },
  ];

  return (
    <nav className="bg-[#0e6fa5] p-4 shadow-lg no-print">
      
      {/* ✅ Mostrar AvisoPago solo si está logueado */}
      {login?.id && <AvisoPago />}
      
      <div className="container mx-auto flex items-center justify-between">

        <div className="flex flex-row items-center space-x-4">
          <Link to="/" className="text-white text-xl font-semibold hover:text-gray-200 flex items-center gap-4">
            <img src={Agrobombas} alt="Logo" className="w-18 h-10 rounded-md" />
            Agro Bombas Bragado
          </Link>
        </div>

        <div className="lg:hidden">
          {login?.id && (
            <button
              className="text-white focus:outline-none"
              onClick={() => document.getElementById("navbarMobileMenu")?.classList.toggle("hidden")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          )}
        </div>

        <div className="hidden lg:flex items-center space-x-4 ml-auto">
          {login?.id && (
            <>
              {menuOptions.map((option) => (
                <Link
                  key={option.route}
                  to={option.route}
                  className={`text-white hover:text-gray-300 transition duration-300 relative ${
                    isActiveRoute(option.route)
                      ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                      : ""
                  }`}
                >
                  {option.label}
                </Link>
              ))}

              {login.isAdmin && login.username !== "mostrador" && (
                <>
                  <Link to="gestion/show-users" className="text-white hover:text-gray-300 relative">
                    {t("Usuarios")}
                  </Link>
                  <Link to="gestion/show-companys" className="text-white hover:text-gray-300 relative">
                    {t("navbar.contacts")}
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  dispatch(logOut());
                  navigate("/login");
                }}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center"
              >
                {t("navbar.logout")}
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {login?.id && (
        <div id="navbarMobileMenu" className="lg:hidden hidden">
          <div className="px-6 pt-4 pb-6 space-y-4">
            {menuOptions.map((option) => (
              <button
                key={option.route}
                onClick={() => handleMenuClick(option.route)}
                className={`block text-white hover:text-gray-300 text-lg font-semibold w-full text-left relative pb-2 ${
                  isActiveRoute(option.route)
                    ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : ""
                }`}
              >
                {option.label}
              </button>
            ))}

            {login.isAdmin && login.username !== "mostrador" && (
              <>
                <button onClick={() => handleMenuClick("gestion/show-users")} className="text-white block w-full text-left">
                  {t("Usuarios")}
                </button>
                <button onClick={() => handleMenuClick("gestion/show-companys")} className="text-white block w-full text-left">
                  {t("navbar.contacts")}
                </button>
              </>
            )}

            <button
              onClick={() => {
                dispatch(logOut());
                navigate("/login");
              }}
              className="w-full text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full flex items-center justify-center"
            >
              {t("navbar.logout")}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
