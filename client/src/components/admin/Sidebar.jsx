// import { NavLink, useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: "bi-speedometer2",
//       path: "/admin/dashboard",
//     },
//     {
//       label: "Doctors",
//       icon: "bi-person-badge",
//       path: "/admin/doctors",
//     },
//     {
//       label: "Patients",
//       icon: "bi-people",
//       path: "/admin/patients",
//     },
//     {
//       label: "Appointments",
//       icon: "bi-calendar-check",
//       path: "/admin/appointments",
//     },
//     {
//       label: "Specializations",
//       icon: "bi-heart-pulse",
//       path: "/admin/specializations",
//     },
//     {
//       label: "Locations",
//       icon: "bi-geo-alt",
//       path: "/admin/locations",
//     },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("admin");

//     navigate("/admin/login");
//   };

//   return (
//     <aside
//       className="bg-dark text-white d-flex flex-column"
//       style={{
//         width: "250px",
//         minHeight: "100vh",
//         position: "fixed",
//         left: 0,
//         top: 0,
//         bottom: 0,
//         zIndex: 1000,
//       }}
//     >

//       {/* Logo */}
//       <div className="p-4 border-bottom border-secondary">
//         <h4 className="fw-bold mb-0">
//           <span className="text-mint">
//             Doctor
//           </span>{" "}
//           Finder
//         </h4>

//         <small className="text-secondary">
//           Admin Panel
//         </small>
//       </div>

//       {/* Menu */}
//       <div className="p-3 flex-grow-1">

//         <small className="text-secondary px-2">
//           MENU
//         </small>

//         <div className="mt-2">

//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `d-flex align-items-center gap-3 text-decoration-none rounded-3 px-3 py-3 mb-1 ${
//                   isActive
//                     ? "bg-mint text-black"
//                     : "text-white"
//                 }`
//               }
//             >
//               <i
//                 className={`bi ${item.icon}`}
//               ></i>

//               <span>{item.label}</span>
//             </NavLink>
//           ))}

//         </div>

//         <hr className="border-secondary my-4" />

//         <small className="text-secondary px-2">
//           ACCOUNT
//         </small>

//         <NavLink
//           to="/admin/profile"
//           className={({ isActive }) =>
//             `d-flex align-items-center gap-3 text-decoration-none rounded-3 px-3 py-3 mt-2 ${
//               isActive
//                 ? "bg-mint text-black"
//                 : "text-white"
//             }`
//           }
//         >
//           <i className="bi bi-person-circle"></i>
//           <span>Profile</span>
//         </NavLink>

//       </div>

//       {/* Logout */}
//       <div className="p-3 border-top border-secondary">

//         <button
//           type="button"
//           className="btn btn-outline-light w-100"
//           onClick={handleLogout}
//         >
//           <i className="bi bi-box-arrow-right me-2"></i>
//           Logout
//         </button>

//       </div>

//     </aside>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
const navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);

const menuItems = [
{
label: "Dashboard",
icon: "bi-speedometer2",
path: "/admin/dashboard",
},
{
label: "Doctors",
icon: "bi-person-badge",
path: "/admin/doctors",
},
{
label: "Patients",
icon: "bi-people",
path: "/admin/patients",
},
{
label: "Appointments",
icon: "bi-calendar-check",
path: "/admin/appointments",
},
{
label: "Specializations",
icon: "bi-heart-pulse",
path: "/admin/specializations",
},
{
label: "Locations",
icon: "bi-geo-alt",
path: "/admin/locations",
},
];

const handleLogout = () => {
localStorage.removeItem("adminToken");
localStorage.removeItem("admin");
navigate("/admin/login");
};

const closeSidebar = () => {
setIsOpen(false);
};

return (
<>
{/* Mobile Hamburger */}
<button
type="button"
className="admin-sidebar-toggle d-lg-none"
onClick={() => setIsOpen(true)}
aria-label="Open sidebar"
> <i className="bi bi-list"></i> </button>


  {/* Overlay */}
  {isOpen && (
    <div
      className="admin-sidebar-overlay d-lg-none"
      onClick={closeSidebar}
    ></div>
  )}

  {/* Sidebar */}
  <aside
    className={`admin-sidebar bg-dark text-white d-flex flex-column ${
      isOpen ? "admin-sidebar-open" : ""
    }`}
  >
    {/* Logo */}
    <div className="p-4 border-bottom border-secondary">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h4 className="fw-bold mb-0">
            <span className="text-mint">Doctor</span> Finder
          </h4>

          <small className="text-secondary">
            Admin Panel
          </small>
        </div>

        {/* Mobile Close */}
        <button
          type="button"
          className="btn btn-sm btn-outline-light d-lg-none"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>

    {/* Menu */}
    <div className="p-3 flex-grow-1 overflow-auto">
      <small className="text-secondary px-2">
        MENU
      </small>

      <div className="mt-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `d-flex align-items-center gap-3 text-decoration-none rounded-3 px-3 py-3 mb-1 ${
                isActive
                  ? "bg-mint text-black"
                  : "text-white"
              }`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <hr className="border-secondary my-4" />

      <small className="text-secondary px-2">
        ACCOUNT
      </small>

      <NavLink
        to="/admin/profile"
        onClick={closeSidebar}
        className={({ isActive }) =>
          `d-flex align-items-center gap-3 text-decoration-none rounded-3 px-3 py-3 mt-2 ${
            isActive
              ? "bg-mint text-black"
              : "text-white"
          }`
        }
      >
        <i className="bi bi-person-circle"></i>
        <span>Profile</span>
      </NavLink>
    </div>

    {/* Logout */}
    <div className="p-3 border-top border-secondary">
      <button
        type="button"
        className="btn btn-outline-light w-100"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  </aside>
</>


);
};

export default Sidebar;
