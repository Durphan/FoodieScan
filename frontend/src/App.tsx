import "./index.css";
import {
  BrowserRouter as Router,
  useRoutes,
  Navigate,
} from "react-router-dom";
import React from "react";

const AuthSignInView = React.lazy(() => import("@auth/templates/AuthSignInView"));
const AuthSingUpView = React.lazy(() => import("@auth/templates/AuthSignUpView"));
const DashboardView = React.lazy(() => import("@dashboard/templates/DashboardView"));
const DashboardMenuView = React.lazy(() => import("@dashboard/templates/DashboardMenuView"));
const DashboardCreateBusiness = React.lazy(() => import("@dashboard/components/DashboardCreateBusiness"));
const DashboardCreateMenu = React.lazy(() => import("@dashboard/components/DashboardCreateMenu"));
const DashboardQr = React.lazy(() => import("@dashboard/components/DashboardQr"));
const LandingView = React.lazy(() => import("@landing/templates/LandingView"));
const LandingMenu = React.lazy(() => import("@landing/components/LandingMenu"));
const NotFound = React.lazy(() => import("./NotFound"));


const routes = [
  // Module Landing
  { path: "/", element: <LandingView /> },
  { path: "/menuDemo", element: <LandingMenu /> },


  // Module Auth
  { path: "/signin", element: <AuthSignInView /> },
  { path: "/signup", element: <AuthSingUpView /> },


  // Module Dashboard
  {
    path: "/dashboard",
    element: <DashboardView />,
    children: [
      { index: true, element: <Navigate to="menu" replace /> },
      { path: "qr", element: <DashboardQr /> },
      { path: "menu", element: <DashboardMenuView /> },
      { path: "menu/business", element: <DashboardCreateBusiness /> },
      { path: "/dashboard/menu/create/:businessId", element: <DashboardCreateMenu /> },
    ],
  },

   { path: "*", element: <NotFound /> },
];


function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}


// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// // import "./App.css";

// import Menu from "../src/landing/components/MenuDemo/Menu/Menu";
// import MenuView from "./dashboard/templates/MenuView";
// import LandingPage from "../src/landing/templates/LandingPage";
// import Signin from "../src/auth/templates/Signin";
// import Signup from "../src/auth/templates/Signup";
// import DashboardLayout from "./dashboard/layouts/DashboardLayout";
// import QRCodeView from "../src/dashboard/components/Qr/Qr";
// import CreateBussines from "../src/dashboard/components/CreateBussines/CreateBussines";
// import CreateMenu from "../src/dashboard/components/CreateMenu/CreateMenu";

// export function CreateRouters() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/menuDemo" element={<Menu />} />
//         <Route path="/signin" element={<Signin />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Rutas con Sidebar */}
//         <Route path="/dashboard" element={<DashboardLayout />}>
//           <Route index element={<Navigate to="menu" replace />} />
//           <Route path="menu" element={<MenuView />} />
//           <Route path="menu/bussines" element={<CreateBussines />} />
//           <Route
//             path="/dashboard/menu/create/:businessId"
//             element={<CreateMenu />}
//           />

//           <Route path="qr" element={<QRCodeView />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }
