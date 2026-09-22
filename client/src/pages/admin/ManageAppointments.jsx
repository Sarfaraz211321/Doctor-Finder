
import { useEffect, useMemo, useState } from "react";

import { getAllAppointments } from "../../services/appointmentService.js";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllAppointments();

      setAppointments(response.appointments || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return appointments.filter((appointment) => {
      const patientName =
        appointment.patientName || "";

      const patientPhone =
        appointment.patientPhone || "";

      const patientEmail =
        appointment.user?.email || "";

      const doctorName =
        appointment.doctor?.name || "";

      const specialization =
        appointment.doctor?.specialization || "";

      const clinic =
        appointment.doctor?.clinicName || "";

      const city =
        appointment.doctor?.city || "";

      const matchesSearch =
        !searchValue ||
        `${patientName} ${patientPhone} ${patientEmail} ${doctorName} ${specialization} ${clinic} ${city}`
          .toLowerCase()
          .includes(searchValue);

      const appointmentDate =
        appointment.appointmentDate
          ? new Date(appointment.appointmentDate)
              .toISOString()
              .split("T")[0]
          : "";

      const matchesDate =
        !dateFilter ||
        appointmentDate === dateFilter;

      return matchesSearch && matchesDate;
    });
  }, [appointments, search, dateFilter]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            Manage Appointments
          </h3>

          <p className="text-muted mb-0">
            View all patient appointments.
          </p>
        </div>

        <span className="badge bg-dark fs-6 px-3 py-2">
          {appointments.length} Appointments
        </span>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          {/* Filters */}
          <div className="row g-3 mb-4">

            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search patient, email, doctor, clinic..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
              />
            </div>

          </div>

          {/* Clear Filters */}
          {(search || dateFilter) && (
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mb-3"
              onClick={() => {
                setSearch("");
                setDateFilter("");
              }}
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear Filters
            </button>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info"></div>

              <p className="text-muted mt-2 mb-0">
                Loading appointments...
              </p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-mint"></i>

              <h6 className="fw-bold mt-3">
                No appointments found
              </h6>

              <p className="text-muted mb-0">
                Try changing your search or date filter.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Clinic</th>
                    <th>City</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map(
                    (appointment, index) => (
                      <tr key={appointment._id}>

                        <td>{index + 1}</td>

                        {/* Patient */}
                        <td>
                          <div className="fw-semibold">
                            {appointment.patientName ||
                              appointment.user?.name ||
                              "Patient"}
                          </div>

                          <small className="text-muted">
                            <i className="bi bi-telephone me-1"></i>
                            {appointment.patientPhone ||
                              "-"}
                          </small>

                          {appointment.user?.email && (
                            <small className="d-block text-muted">
                              <i className="bi bi-envelope me-1"></i>
                              {appointment.user.email}
                            </small>
                          )}
                        </td>

                        {/* Doctor */}
                        <td>
                          <div className="fw-semibold">
                            {appointment.doctor?.name ||
                              "Doctor"}
                          </div>

                          <small className="text-muted">
                            {appointment.doctor?.degree ||
                              ""}
                          </small>
                        </td>

                        <td>
                          <span className="badge bg-mint text-black">
                            {appointment.doctor
                              ?.specialization || "-"}
                          </span>
                        </td>

                        <td>
                          <i className="bi bi-calendar3 text-mint me-2"></i>

                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </td>

                        <td>
                          <i className="bi bi-clock text-mint me-2"></i>

                          {appointment.preferredTime ||
                            "-"}
                        </td>

                        <td>
                          {appointment.doctor?.clinicName ||
                            "-"}
                        </td>

                        <td>
                          {appointment.doctor?.city ||
                            "-"}
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;

