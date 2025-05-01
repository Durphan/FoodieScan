import DashboardSidebar from "@dashboard/components/DashboardSidebar";
import { Outlet } from "react-router-dom";
import "./DashboardView.css";

export default function DashboardView() {
  return (
    <div className="layout">
      <DashboardSidebar />
      <section className="content ml-96">
        <Outlet />
      </section>
    </div>
  )
}

// code javascript
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar/Sidebar";
// import styles from "./DashboardLayout.module.css";

// const DashboardLayout = () => {
//   return (
//     <div className={styles.layout}>
//       <Sidebar />
//       <main className={styles.content}>
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
