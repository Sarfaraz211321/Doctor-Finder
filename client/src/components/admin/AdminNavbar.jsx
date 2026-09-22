import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutAdmin } from "../../redux/slices/authSlice.js";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminData = JSON.parse(
    localStorage.getItem("admin") || "null"
  );

  const adminName = adminData?.name || "Admin";
  const adminEmail = adminData?.email || "";

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  return (
    <nav
      className="bg-white border-bottom px-4 py-3"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">

        <div>
          <h5 className="fw-bold mb-0">
            Admin Panel
          </h5>

          <small className="text-muted">
            Manage Doctor Finder
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">

          <div className="d-none d-md-block text-end">
            <div className="fw-semibold">
              {adminName}
            </div>

            {adminEmail && (
              <small className="text-muted">
                {adminEmail}
              </small>
            )}
          </div>

          <div
            className="rounded-circle bg-mint-light d-flex align-items-center justify-content-center"
            style={{
              width: "42px",
              height: "42px",
            }}
          >
            <i className="bi bi-person-fill text-mint fs-5"></i>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => navigate("/admin/profile")}
            title="Profile"
          >
            <i className="bi bi-person-circle"></i>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={handleLogout}
            title="Logout"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;