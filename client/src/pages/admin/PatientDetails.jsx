
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getUserById } from "../../services/adminService.js";

import { getAllAppointments } from "../../services/appointmentService.js";

const PatientDetails = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPatientDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const [userResponse, appointmentResponse] =
        await Promise.all([
          getUserById(id),
          getAllAppointments(),
        ]);

      setPatient(userResponse.user);

      const allAppointments =
        appointmentResponse.appointments || [];

      const patientAppointments =
        allAppointments.filter(
          (appointment) =>
            appointment.user?._id === id ||
            appointment.user === id
        );

      setAppointments(patientAppointments);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load patient details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatientDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-info"></div>

        <p className="text-muted mt-2">
          Loading patient details...
        </p>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div>
        <div className="alert alert-danger">
          {error || "Patient not found."}
        </div>

        <Link
          to="/admin/patients"
          className="btn btn-outline-primary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Patients
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            Patient Details
          </h3>

          <p className="text-muted mb-0">
            View patient information and appointment history.
          </p>
        </div>

        <Link
          to="/admin/patients"
          className="btn btn-outline-primary"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      {/* Patient Info */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">

          <div className="d-flex align-items-center gap-4">

            <div
              className="rounded-circle bg-mint-light d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
              }}
            >
              <i className="bi bi-person-fill fs-1 text-mint"></i>
            </div>

            <div>
              <h4 className="fw-bold mb-1">
                {patient.name}
              </h4>

              <p className="text-muted mb-0">
                Registered Patient
              </p>
            </div>

          </div>

          <hr />

          <div className="row g-4">

            <div className="col-md-4">
              <small className="text-muted">
                Email Address
              </small>

              <div className="fw-semibold mt-1">
                <i className="bi bi-envelope text-mint me-2"></i>
                {patient.email}
              </div>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Registration Date
              </small>

              <div className="fw-semibold mt-1">
                <i className="bi bi-calendar text-mint me-2"></i>

                {patient.createdAt
                  ? new Date(
                      patient.createdAt
                    ).toLocaleDateString("en-IN")
                  : "-"}
              </div>
            </div>

            <div className="col-md-4">
              <small className="text-muted">
                Total Appointments
              </small>

              <div className="fw-semibold mt-1">
                <i className="bi bi-calendar-check text-mint me-2"></i>
                {appointments.length}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Appointment History */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <h5 className="fw-bold mb-4">
            Appointment History
          </h5>

          {appointments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-calendar-x fs-1 text-mint"></i>

              <p className="text-muted mt-3 mb-0">
                No appointments found for this patient.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Clinic</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map(
                    (appointment, index) => (
                      <tr key={appointment._id}>

                        <td>{index + 1}</td>

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
                          {appointment.doctor
                            ?.specialization || "-"}
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

                        <td>
                          {appointment.preferredTime ||
                            "-"}
                        </td>

                        <td>
                          {appointment.doctor
                            ?.clinicName || "-"}
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

export default PatientDetails;

