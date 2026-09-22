import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section
      className="py-5"
      style={{ backgroundColor: "#F7FAF9", minHeight: "80vh" }}
    >
      <div className="container">

        {/* Welcome */}
        <div className="mb-5">
          <p
            className="fw-semibold mb-1"
            style={{ color: "#14B8A6" }}
          >
            WELCOME BACK
          </p>

          <h2 className="fw-bold mb-2">
            Hello, {user?.name || "User"} 👋
          </h2>

          <p className="text-muted mb-0">
            Find a doctor and manage your healthcare appointments
            easily.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="row g-4 mb-5">

          <div className="col-md-4">
            <Link
              to="/doctors"
              className="text-decoration-none"
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: "55px",
                      height: "55px",
                      backgroundColor: "#E6FFFB",
                    }}
                  >
                    <i
                      className="bi bi-search fs-4"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h5 className="fw-bold">
                    Find a Doctor
                  </h5>

                  <p className="text-muted small mb-3">
                    Search doctors by specialization and location.
                  </p>

                  <span
                    className="fw-semibold"
                    style={{ color: "#14B8A6" }}
                  >
                    Search Now
                    <i className="bi bi-arrow-right ms-2"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/appointments"
              className="text-decoration-none"
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: "55px",
                      height: "55px",
                      backgroundColor: "#E6FFFB",
                    }}
                  >
                    <i
                      className="bi bi-calendar-check fs-4"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h5 className="fw-bold">
                    My Appointments
                  </h5>

                  <p className="text-muted small mb-3">
                    View your previous and upcoming appointments.
                  </p>

                  <span
                    className="fw-semibold"
                    style={{ color: "#14B8A6" }}
                  >
                    View Appointments
                    <i className="bi bi-arrow-right ms-2"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/profile"
              className="text-decoration-none"
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: "55px",
                      height: "55px",
                      backgroundColor: "#E6FFFB",
                    }}
                  >
                    <i
                      className="bi bi-person fs-4"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h5 className="fw-bold">
                    My Profile
                  </h5>

                  <p className="text-muted small mb-3">
                    View and manage your profile information.
                  </p>

                  <span
                    className="fw-semibold"
                    style={{ color: "#14B8A6" }}
                  >
                    View Profile
                    <i className="bi bi-arrow-right ms-2"></i>
                  </span>
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Information Banner */}
        <div
          className="card border-0 rounded-4"
          style={{ backgroundColor: "#111111" }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center">

              <div className="col-lg-8">
                <span
                  className="badge rounded-pill mb-3"
                  style={{
                    backgroundColor: "#2DD4BF",
                    color: "#111111",
                  }}
                >
                  Healthcare Made Easy
                </span>

                <h3 className="fw-bold text-white mb-2">
                  Need medical consultation?
                </h3>

                <p className="text-white-50 mb-lg-0">
                  Find the right specialist near you and book
                  your appointment in a few simple steps.
                </p>
              </div>

              <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                <Link
                  to="/doctors"
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "#2DD4BF",
                    color: "#111111",
                    fontWeight: "600",
                  }}
                >
                  Find Doctors
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;