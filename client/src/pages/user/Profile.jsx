import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../../redux/slices/authSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#F7FAF9",
        minHeight: "80vh",
      }}
    >
      <div className="container">

        <div className="mb-5">
          <p
            className="fw-semibold mb-1"
            style={{ color: "#14B8A6" }}
          >
            ACCOUNT
          </p>

          <h2 className="fw-bold mb-2">
            My Profile
          </h2>

          <p className="text-muted mb-0">
            View your registered account information.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "90px",
                      height: "90px",
                      backgroundColor: "#E6FFFB",
                    }}
                  >
                    <i
                      className="bi bi-person-fill fs-1"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h4 className="fw-bold mt-3 mb-1">
                    {user?.name || "User"}
                  </h4>

                  <span className="text-muted">
                    Doctor Finder User
                  </span>
                </div>

                <hr />

                <div className="mb-4">
                  <label className="text-muted small">
                    Full Name
                  </label>

                  <div className="fw-semibold mt-1">
                    <i
                      className="bi bi-person me-2"
                      style={{ color: "#14B8A6" }}
                    ></i>
                    {user?.name || "N/A"}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-muted small">
                    Email Address
                  </label>

                  <div className="fw-semibold mt-1">
                    <i
                      className="bi bi-envelope me-2"
                      style={{ color: "#14B8A6" }}
                    ></i>
                    {user?.email || "N/A"}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Profile;