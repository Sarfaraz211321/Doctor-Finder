const AppointmentCard = ({ appointment }) => {
  const doctor = appointment.doctor;

  const appointmentDate = new Date(
    appointment.appointmentDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4">

        {/* Doctor */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "55px",
              height: "55px",
              background: "#E6FFFB",
            }}
          >
            <i className="bi bi-person-badge fs-3 text-mint"></i>
          </div>

          <div>
            <h5 className="fw-bold mb-1">
              {doctor?.name || "Doctor"}
            </h5>

            <p className="text-muted mb-0">
              {doctor?.specialization || "Specialist"}
            </p>
          </div>
        </div>

        <hr />

        {/* Appointment Details */}
        <div className="d-flex flex-column gap-3 mt-3">

          <div className="d-flex gap-3">
            <i className="bi bi-calendar-event fs-5 text-mint"></i>

            <div>
              <small className="text-muted">
                Appointment Date
              </small>

              <div className="fw-semibold">
                {appointmentDate}
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            <i className="bi bi-clock fs-5 text-mint"></i>

            <div>
              <small className="text-muted">
                Preferred Time
              </small>

              <div className="fw-semibold">
                {appointment.preferredTime}
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            <i className="bi bi-hospital fs-5 text-mint"></i>

            <div>
              <small className="text-muted">
                Clinic
              </small>

              <div className="fw-semibold">
                {doctor?.clinicName || "Not available"}
              </div>
            </div>
          </div>

          <div className="d-flex gap-3">
            <i className="bi bi-geo-alt fs-5 text-mint"></i>

            <div>
              <small className="text-muted">
                Location
              </small>

              <div className="fw-semibold">
                {doctor?.city || "Not available"}
              </div>
            </div>
          </div>

        </div>

        {/* Reason */}
        {appointment.reason && (
          <div className="bg-mint-light rounded-3 p-3 mt-4">
            <small className="text-muted">
              Reason for Visit
            </small>

            <p className="mb-0 mt-1">
              {appointment.reason}
            </p>
          </div>
        )}

        {/* Fee */}
        <div className="d-flex justify-content-between align-items-center border-top mt-4 pt-3">
          <span className="text-muted">
            Consultation Fee
          </span>

          <span className="fw-bold">
            ₹{doctor?.consultationFee || 0}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AppointmentCard;