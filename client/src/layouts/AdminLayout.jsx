// import { Outlet } from "react-router-dom";

// import Sidebar from "../components/admin/Sidebar.jsx";
// import AdminNavbar from "../components/admin/AdminNavbar.jsx";

// const AdminLayout = () => {
//   return (
//     <div className="min-vh-100 bg-light">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Area */}
//       <div
//         style={{
//           marginLeft: "250px",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Navbar */}
//         <AdminNavbar />

//         {/* Page Content */}
//         <main className="p-4">
//           <Outlet />
//         </main>
//       </div>

//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar.jsx";
import AdminNavbar from "../components/admin/AdminNavbar.jsx";

const AdminLayout = () => {
  return (
    <div className="admin-layout min-vh-100 bg-light">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="admin-main">

        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;