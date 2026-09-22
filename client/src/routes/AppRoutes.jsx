import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

import Home from "../pages/user/Home.jsx";
import Dashboard from "../pages/user/Dashboard.jsx";
import Doctors from "../pages/user/Doctors.jsx";
import DoctorDetailsPage from "../pages/user/DoctorDetailsPage.jsx";
import MyAppointments from "../pages/user/MyAppointments.jsx";
import Profile from "../pages/user/Profile.jsx";
import About from "../pages/user/About.jsx";

import UserLogin from "../pages/auth/UserLogin.jsx";
import UserRegister from "../pages/auth/UserRegister.jsx";
import AdminLogin from "../pages/auth/AdminLogin.jsx";

import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import ManageDoctors from "../pages/admin/ManageDoctors.jsx";
import AddDoctor from "../pages/admin/AddDoctor.jsx";
import EditDoctor from "../pages/admin/EditDoctor.jsx";
import ManagePatients from "../pages/admin/ManagePatients.jsx";
import PatientDetails from "../pages/admin/PatientDetails.jsx";
import ManageAppointments from "../pages/admin/ManageAppointments.jsx";
import ManageSpecializations from "../pages/admin/ManageSpecializations.jsx";
import ManageLocations from "../pages/admin/ManageLocations.jsx";
import AdminProfile from "../pages/admin/AdminProfile.jsx";

import UserProtectedRoute from "./UserProtectedRoute.jsx";
import AdminProtectedRoute from "./AdminProtectedRoute.jsx";

import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= USER PUBLIC ================= */}

      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route
          path="/doctors/:id"
          element={<DoctorDetailsPage />}
        />

        <Route
          path="/login"
          element={<UserLogin />}
        />

        <Route
          path="/register"
          element={<UserRegister />}
        />
      </Route>


      {/* ================= USER PROTECTED ================= */}

      <Route element={<UserProtectedRoute />}>
        <Route element={<UserLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/appointments"
            element={<MyAppointments />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>
      </Route>


      {/* ================= ADMIN AUTH ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      {/* ================= ADMIN PROTECTED ================= */}

      <Route element={<AdminProtectedRoute />}>
        <Route element={<AdminLayout />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/doctors"
            element={<ManageDoctors />}
          />

          <Route
            path="/admin/doctors/add"
            element={<AddDoctor />}
          />

          <Route
            path="/admin/doctors/edit/:id"
            element={<EditDoctor />}
          />

          <Route
            path="/admin/patients"
            element={<ManagePatients />}
          />

          <Route
            path="/admin/patients/:id"
            element={<PatientDetails />}
          />

          <Route
            path="/admin/appointments"
            element={<ManageAppointments />}
          />

          <Route
            path="/admin/specializations"
            element={<ManageSpecializations />}
          />

          <Route
            path="/admin/locations"
            element={<ManageLocations />}
          />

          <Route
            path="/admin/profile"
            element={<AdminProfile />}
          />

        </Route>
      </Route>


      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;