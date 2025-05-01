import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { getAllBusinesses } from "@dashboard/services/dashboard.service";
import "./DashboardMenuView.css"

export default function DashboardMenuView() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      MySwal.fire({
        title: "Acceso denegado",
        text: "Por favor inicia sesión o regístrate",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/signin");
      });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);


  useEffect(() => {
    const getBusinessesData = async () => {
      const bussinesses = await getAllBusinesses()
      setBusinesses(bussinesses?.data);
    }
    getBusinessesData()
    setLoading(false);
  }, [isAuthenticated])

  const handleGoToCreateMenu = (businessId: string) => {
    navigate(`/dashboard/menu/create/${businessId}`);
  };

  const handleRegisterRestaurant = () => {
    navigate("/dashboard/menu/business");
  };

  if (!isAuthenticated) return null;
  if (loading) return <p className="loading">Cargando negocios...</p>;

  return (
    <div className="container">
      <div className="logoContainer">
        <img
          src="/logo.png"
          alt="Logo del Restaurante"
          className="logo"
        />
      </div>
      <h1 className="title">Tus negocios</h1>

      <div className="cardsContainer">
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <div
              key={business.idBusiness}
              className="card"
              onClick={() => handleGoToCreateMenu(business.idBusiness)}
            >
              <h2>{business.name}</h2>

              <span className="link">Ver menú</span>
            </div>
          ))
        ) : (
          <p>No tienes restaurantes registrados aún.</p>
        )}
      </div>

      <div className="newSection">
        <hr />
        <h2>¿Nuevo restaurante?</h2>
        <button className="newButton" onClick={handleRegisterRestaurant}>
          Registrar nuevo restaurante
        </button>
      </div>
    </div>
  )
}

// code javascript
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import axios from "axios";
// import styles from "./MenuView.module.css";

// const MySwal = withReactContent(Swal);

// const MenuView = () => {
//   const navigate = useNavigate();
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       MySwal.fire({
//         title: "Acceso denegado",
//         text: "Por favor inicia sesión o regístrate",
//         icon: "warning",
//         confirmButtonText: "Iniciar sesión",
//       }).then(() => {
//         navigate("/signin");
//       });
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchBusinesses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "https://menuproject-backend-test.onrender.com/api/business/user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setBusinesses(response.data || []);
//       } catch (error) {
//         console.error("Error al cargar negocios:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isAuthenticated) {
//       fetchBusinesses();
//     }
//   }, [isAuthenticated]);

//   const handleGoToCreateMenu = (businessId) => {
//     navigate(`/dashboard/menu/create/${businessId}`);
//   };

//   const handleRegisterRestaurant = () => {
//     navigate("/dashboard/menu/bussines");
//   };

//   if (!isAuthenticated) return null;
//   if (loading) return <p className={styles.loading}>Cargando negocios...</p>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.logoContainer}>
//         <img
//           src="/logo.png"
//           alt="Logo del Restaurante"
//           className={styles.logo}
//         />
//       </div>
//       <h1 className={styles.title}>Tus negocios</h1>

//       <div className={styles.cardsContainer}>
//         {businesses.length > 0 ? (
//           businesses.map((business) => (
//             <div
//               key={business.idBusiness}
//               className={styles.card}
//               onClick={() => handleGoToCreateMenu(business.idBusiness)}
//             >
//               <h2>{business.name}</h2>

//               <span className={styles.link}>Ver menú</span>
//             </div>
//           ))
//         ) : (
//           <p>No tienes restaurantes registrados aún.</p>
//         )}
//       </div>

//       <div className={styles.newSection}>
//         <hr />
//         <h2>¿Nuevo restaurante?</h2>
//         <button className={styles.newButton} onClick={handleRegisterRestaurant}>
//           Registrar nuevo restaurante
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MenuView;
