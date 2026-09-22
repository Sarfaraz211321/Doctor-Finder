import { Link } from "react-router-dom";
import doctorPlaceholder from "../../assets/images/doctor-placeholder.png";

const DoctorCard = ({ doctor }) => {
  const image = doctor.image || doctorPlaceholder;

  const handleCall = () => {
    window.location.href = `tel:${doctor.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Dr. ${doctor.name}, I found your profile on Doctor Finder. I would like to know more about consultation and appointment availability.`
    );

    window.open(
      `https://wa.me/91${doctor.phone}?text=${message}`,
      "_blank"
    );
  };

  const handleDirections = () => {
    const destination =
      doctor.latitude && doctor.longitude
        ? `${doctor.latitude},${doctor.longitude}`
        : encodeURIComponent(
            `${doctor.clinicAddress}, ${doctor.city}`
          );

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      "_blank"
    );
  };

  return (
    <div className="card h-100 border-0 shadow-sm overflow-hidden">
      <div
        className="position-relative"
        style={{
          height: "220px",
          background: "#E6FFFB",
        }}
      >
        <img
          src={image}
          alt={doctor.name}
          className="rounded-circle"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            objectPosition: "center 10%",
            display: "block",
            margin: "20px auto",
            border: "3px solid #2DD4BF",
            boxShadow:
              "0 0 5px rgba(45, 212, 191, 0.5), 0 0 10px rgba(45, 212, 191, 0.25)",
          }}
          onError={(e) => {
            e.currentTarget.src = doctorPlaceholder;
          }}
        />

        <span
          className="badge position-absolute top-0 end-0 m-3"
          style={{
            background: "#2DD4BF",
            color: "#111",
          }}
        >
          {doctor.availability || "Available"}
        </span>
      </div>

      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <h5 className="fw-bold mb-1">{doctor.name}</h5>
            <p className="text-muted mb-2">{doctor.degree}</p>
          </div>

          <span
            className="badge"
            style={{
              background: "#E6FFFB",
              color: "#0F766E",
            }}
          >
            {doctor.specialization}
          </span>
        </div>

        <div className="small text-muted mb-3">
          <div className="mb-2">
            <i className="bi bi-briefcase me-2"></i>
            {doctor.experience} years experience
          </div>

          <div className="mb-2">
            <i className="bi bi-hospital me-2"></i>
            {doctor.clinicName}
          </div>

          <div>
            <i className="bi bi-geo-alt me-2"></i>
            {doctor.clinicAddress}, {doctor.city}

            <button
              type="button"
              className="btn btn-sm p-0 ms-2"
              title="Get directions"
              onClick={handleDirections}
              style={{ color: "#14B8A6" }}
            >
              <i className="bi bi-map"></i>
            </button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small">
            Consultation Fee
          </span>

          <span className="fw-bold">
            ₹{doctor.consultationFee}
          </span>
        </div>

        <div className="d-flex gap-2 mb-3">
          <button
            type="button"
            className="btn btn-outline-primary flex-fill"
            onClick={handleCall}
          >
            <i className="bi bi-telephone me-1"></i>
            Call
          </button>

          <button
            type="button"
            className="btn flex-fill"
            onClick={handleWhatsApp}
            style={{
              border: "1px solid #25D366",
              color: "#128C7E",
            }}
          >
            <i className="bi bi-whatsapp me-1"></i>
            WhatsApp
          </button>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          className="btn btn-primary w-100"
        >
          <i className="bi bi-calendar-check me-2"></i>
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;