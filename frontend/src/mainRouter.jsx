import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Menu from "../src/landing/components/MenuDemo/Menu/Menu";
import MenuView from "./dashboard/templates/MenuView";
import LandingPage from "../src/landing/templates/LandingPage";
import Signin from "../src/auth/templates/Signin";
import Signup from "../src/auth/templates/Signup";
import DashboardLayout from "./dashboard/layouts/DashboardLayout";
import QRCodeView from "../src/dashboard/components/Qr/Qr";
import CreateBussines from "../src/dashboard/components/CreateBussines/CreateBussines";
import CreateMenu from "../src/dashboard/components/CreateMenu/CreateMenu";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menuDemo" element={<Menu />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Rutas con Sidebar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="menu" replace />} />
          <Route path="menu" element={<MenuView />} />
          <Route path="menu/bussines" element={<CreateBussines />} />
          <Route
            path="/dashboard/menu/create/:businessId"
            element={<CreateMenu />}
          />

          <Route path="qr" element={<QRCodeView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default MainRouter;
