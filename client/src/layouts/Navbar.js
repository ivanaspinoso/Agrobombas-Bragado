import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    WhatsApp Message System
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCentral"
                    aria-controls="navbarCentral"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCentral">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/show-contacts">
                                Contactos
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/show-books">
                                Mensajes
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/show-books">
                                En espera
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/show-books">
                                Autorespuesta
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link" to="/edit-book">
                                Configuración
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;