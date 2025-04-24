import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </div>

      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li onClick={closeMenu}>
          <a href="#inicio">Inicio</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#Functionalities">Funcionalidades</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#Beneffits">Beneficios</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#menu-demo">Menú Demo</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#contacto">Reseñas</a>
        </li>
        <li onClick={closeMenu}>
          <Link to={"/signin"}>
            <span id="loginButton">Iniciar Sesión</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
