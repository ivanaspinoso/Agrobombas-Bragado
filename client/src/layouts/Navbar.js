import React from "react";
import logo from "../assets/images/logo64.png";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../app/actions/users";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useSelector((state) => state.usersReducer.login);

    return (
        <nav className="bg-[#198754] p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo Wapp Message System" className="w-8 h-8" />
                    <Link to="/" className="text-white text-xl font-semibold">
                        WApp Message System
                    </Link>
                </div>
                <div className="lg:hidden">
                    <button
                        className="text-white focus:outline-none"
                        aria-label="Open menu"
                        onClick={() => document.getElementById('navbarMobileMenu').classList.toggle('hidden')}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex items-center space-x-4 ml-auto">
                    {login.id && (
                        <>
                            <Link className="text-white hover:text-gray-300" to="/">Inicio</Link>
                            <Link className="text-white hover:text-gray-300" to="/show-groups">Grupos</Link>
                            <Link className="text-white hover:text-gray-300" to="/show-contacts">Contactos</Link>
                            <Link className="text-white hover:text-gray-300" to="/show-messages">Mensajes</Link>
                            <Link className="text-white hover:text-gray-300" to="/queue-messages">Cola</Link>
                            <Link className="text-white hover:text-gray-300" to="/sended-messages">Enviados</Link>
                            <Link className="text-white hover:text-gray-300" to="/show-receipts">Recibidos</Link>
                            <Link className="text-white hover:text-gray-300" to="/show-configs">Configuración</Link>
                        </>
                    )}
                    <button
                        className="ml-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-300"
                        onClick={() => {
                            dispatch(logOut());
                            navigate("/login");
                        }}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
