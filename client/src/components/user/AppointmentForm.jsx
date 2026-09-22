import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createAppointment } from "../../services/appointmentService.js";

const AppointmentForm = ({ doctor }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    patientPhone: "",
    appointmentDate: "",
    preferredTime: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(formData.patientPhone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await createAppointment({
        doctor: doctor._id,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        appointmentDate: formData.appointmentDate,
        preferredTime: formData.preferredTime,
        reason: formData.reason,
      });

      setSuccess(
        response.message || "Appointment booked successfully."
      );

      setTimeout(() => {
        navigate("/appointments");
      }, 1200);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to book appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <i className="bi bi-check-circle me-2"></i>
          {success}
        </div>
      )}

      <div className="row g-3">

        {/* Patient Name */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Patient Name
          </label>

          <input
            type="text"
            name="patientName"
            className="form-control"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            required
          />
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Phone Number
          </label>

          <input
            type="tel"
            name="patientPhone"
            className="form-control"
            value={formData.patientPhone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
            inputMode="numeric"
            required
          />
        </div>

        {/* Date */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Appointment Date
          </label>

          <input
            type="date"
            name="appointmentDate"
            className="form-control"
            value={formData.appointmentDate}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        {/* Time */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            Preferred Time
          </label>

          <input
            type="time"
            name="preferredTime"
            className="form-control"
            value={formData.preferredTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reason */}
        <div className="col-12">
          <label className="form-label fw-semibold">
            Reason for Visit
            <span className="text-muted fw-normal">
              {" "} (Optional)
            </span>
          </label>

          <textarea
            name="reason"
            className="form-control"
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly describe your problem..."
          ></textarea>
        </div>

        {/* Doctor Info */}
        <div className="col-12">
          <div className="bg-mint-light rounded-3 p-3">
            <div className="d-flex align-items-center gap-3">
              <i className="bi bi-person-badge fs-3 text-mint"></i>

              <div>
                <small className="text-muted">
                  Appointment with
                </small>

                <div className="fw-bold">
                  {doctor.name}
                </div>

                <small className="text-muted">
                  {doctor.specialization} • ₹
                  {doctor.consultationFee}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Booking...
              </>
            ) : (
              <>
                <i className="bi bi-calendar-check me-2"></i>
                Book Appointment
              </>
            )}
          </button>
        </div>

      </div>
    </form>
  );
};

export default AppointmentForm;