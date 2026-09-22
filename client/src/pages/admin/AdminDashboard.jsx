import { useEffect, useState } from "react";

import { getDashboardStats } from "../../services/adminService.js";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardStats();

      setDashboard(response);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info"></div>
        <p className="text-muted mt-2">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
      </div>
    );
  }

  const stats = dashboard?.stats || {};

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          Admin Dashboard
        </h3>

        <p className="text-muted mb-0">
          Overview of your Doctor Finder platform.
        </p>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Total Doctors
                  </p>

                  <h3 className="fw-bold mb-0">
                    {stats.totalDoctors || 0}
                  </h3>
                </div>

                <div className="bg-mint-light rounded-3 p-3">
                  <i className="bi bi-person-badge fs-4 text-mint"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Total Users
                  </p>

                  <h3 className="fw-bold mb-0">
                    {stats.totalUsers || 0}
                  </h3>
                </div>

                <div className="bg-mint-light rounded-3 p-3">
                  <i className="bi bi-people fs-4 text-mint"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Appointments
                  </p>

                  <h3 className="fw-bold mb-0">
                    {stats.totalAppointments || 0}
                  </h3>
                </div>

                <div className="bg-mint-light rounded-3 p-3">
                  <i className="bi bi-calendar-check fs-4 text-mint"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Specializations
                  </p>

                  <h3 className="fw-bold mb-0">
                    {stats.totalSpecializations || 0}
                  </h3>
                </div>

                <div className="bg-mint-light rounded-3 p-3">
                  <i className="bi bi-heart-pulse fs-4 text-mint"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row g-4">

        {/* Recent Appointments */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">
                  Recent Appointments
                </h5>

                <span className="badge bg-dark">
                  Latest
                </span>
              </div>

              {(!dashboard?.recentAppointments ||
                dashboard.recentAppointments.length ===
                  0) ? (
                <p className="text-muted text-center py-4 mb-0">
                  No appointments yet.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">

                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dashboard.recentAppointments
                        .slice(0, 5)
                        .map((appointment) => (
                          <tr key={appointment._id}>

                            <td>
                              <div className="fw-semibold">
                                {appointment.patientName ||
                                  appointment.user?.name ||
                                  "Patient"}
                              </div>

                              <small className="text-muted">
                                {appointment.patientPhone ||
                                  ""}
                              </small>
                            </td>

                            <td>
                              <div className="fw-semibold">
                                {appointment.doctor?.name ||
                                  "Doctor"}
                              </div>

                              <small className="text-muted">
                                {appointment.doctor
                                  ?.specialization || ""}
                              </small>
                            </td>

                            <td>
                              {appointment.appointmentDate
                                ? new Date(
                                    appointment.appointmentDate
                                  ).toLocaleDateString(
                                    "en-IN"
                                  )
                                : "-"}
                            </td>

                          </tr>
                        ))}
                    </tbody>

                  </table>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Recent Doctors */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Recently Added Doctors
              </h5>

              {(!dashboard?.recentDoctors ||
                dashboard.recentDoctors.length ===
                  0) ? (
                <p className="text-muted text-center py-4 mb-0">
                  No doctors added yet.
                </p>
              ) : (
                <div className="d-flex flex-column gap-3">

                  {dashboard.recentDoctors
                    .slice(0, 5)
                    .map((doctor) => (
                      <div
                        key={doctor._id}
                        className="d-flex align-items-center gap-3"
                      >
                        <div
                          className="rounded-circle bg-mint-light d-flex align-items-center justify-content-center"
                          style={{
                            width: "45px",
                            height: "45px",
                          }}
                        >
                          <i className="bi bi-person-badge text-mint"></i>
                        </div>

                        <div>
                          <div className="fw-semibold">
                            {doctor.name}
                          </div>

                          <small className="text-muted">
                            {doctor.specialization} •{" "}
                            {doctor.city}
                          </small>
                        </div>
                      </div>
                    ))}

                </div>
              )}

            </div>
          </div>
        </div>

      </div>

      {/* Popular Data */}
      <div className="row g-4 mt-1">

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Popular Specializations
              </h5>

              {dashboard?.popularSpecializations?.length ? (
                dashboard.popularSpecializations.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <span>
                        {item._id}
                      </span>

                      <span className="badge bg-mint text-black">
                        {item.count}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-muted mb-0">
                  No data available.
                </p>
              )}

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Popular Locations
              </h5>

              {dashboard?.popularLocations?.length ? (
                dashboard.popularLocations.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between border-bottom py-2"
                    >
                      <span>
                        {item._id}
                      </span>

                      <span className="badge bg-mint text-black">
                        {item.count}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-muted mb-0">
                  No data available.
                </p>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;