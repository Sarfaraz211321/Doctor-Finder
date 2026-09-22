import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile } from "../../services/adminService.js";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getAdminProfile();
        setAdmin(response.admin);
      } catch (error) {
        console.error("Admin profile error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("admin");
          navigate("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="text-center py-5">
        <h5>Admin profile not found</h5>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold">Admin Profile</h2>
        <p className="text-muted mb-0">
          Manage your administrator account details.
        </p>
      </div>

      <div className="card shadow-sm p-4" style={{ maxWidth: "650px" }}>
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-mint d-inline-flex align-items-center justify-content-center fw-bold"
            style={{
              width: "90px",
              height: "90px",
              fontSize: "32px",
            }}
          >
            {admin.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <small className="text-muted">Name</small>
            <h6 className="mt-1">{admin.name}</h6>
          </div>

          <div className="col-md-6">
            <small className="text-muted">Email</small>
            <h6 className="mt-1">{admin.email}</h6>
          </div>

          <div className="col-md-6">
            <small className="text-muted">Phone</small>
            <h6 className="mt-1">{admin.phone}</h6>
          </div>

          <div className="col-md-6">
            <small className="text-muted">Verification</small>
            <h6 className="mt-1">
              <span
                className={`badge ${
                  admin.isVerified ? "bg-success" : "bg-secondary"
                }`}
              >
                {admin.isVerified ? "Verified" : "Not Verified"}
              </span>
            </h6>
          </div>
        </div>

        <hr />

        <button
          className="btn btn-dark"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;