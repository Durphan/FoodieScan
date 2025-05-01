import { Link, useNavigate, useLocation } from "react-router-dom"
import { FiHome, FiLogOut } from "react-icons/fi";
import { MdQrCode } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./DashboardSidebar.css"
import useAuthStore from "@auth/store/auth.store";

export default function DashboardSidebar() {
  const [active, setActive] = useState<string>("inicio");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const logout = useAuthStore((state: any) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/qr")) {
      setActive("qr");
    } else {
      setActive("inicio");
    }
  }, [location.pathname]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }

  if (isMobile) {
    return (
      <nav className="bottomBar">
        <Link to="/dashboard">
          <button
            className={`navItem ${active === "inicio" ? "active" : ""
              }`}
          >
            <FiHome className="icon" />
          </button>
        </Link>
        <Link to="/dashboard/qr">
          <button
            className={`navItem ${active === "qr" ? "Active" : ""
              }`}
          >
            <MdQrCode className="icon" />
          </button>
        </Link>
        <button className="navItem" onClick={handleLogout}>
          <FiLogOut className="icon" />
        </button>
      </nav>
    );
  }

  return (
    <aside className="sidebar">
      <div className="logoContainer">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <nav className="nav">
        <Link to="/dashboard">
          <button
            className={`navItem ${active === "inicio" ? "active" : ""}`}
            onClick={() => setActive("inicio")}
          >
            <FiHome className="icon" />
            Inicio
          </button>
        </Link>
        <Link to="/dashboard/menu">
          <button
            className={`navItem ${active === "inicio" ? "active" : ""}`}
            onClick={() => setActive("inicio")}
          >
            <BiSolidFoodMenu className="icon" />
            Menu
          </button>
        </Link>
        <Link to="/dashboard/qr">
          <button
            className={`navItem ${active === "qr" ? "active" : ""}`}
            onClick={() => setActive("qr")}
          >
            <MdQrCode className="icon" />
            QR
          </button>
        </Link>
      </nav>
      <button className="logout" onClick={handleLogout}>
        <FiLogOut className="icon" /> Cerrar sesión
      </button>
    </aside>
  )
}
