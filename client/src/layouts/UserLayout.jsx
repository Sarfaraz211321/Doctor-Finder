import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";

const UserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;