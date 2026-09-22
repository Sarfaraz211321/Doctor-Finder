import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getDoctorById } from "../../services/doctorService.js";
import AppointmentForm from "./AppointmentForm.jsx";

import doctorPlaceholder from "../../assets/images/doctor-placeholder.png";

const DoctorDetails = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = !!localStorage.getItem("userToken");

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDoctorById(id);
        setDoctor(response.doctor);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load doctor details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [id]);

  const handleCall = () => {
    if (doctor?.phone) {
      window.location.href = `tel:${doctor.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (!doctor?.phone) return;

    const phone = doctor.phone.replace(/\D/g, "");

    const whatsappNumber = phone.startsWith("91")
      ? phone
      : `91${phone}`;

    const message = encodeURIComponent(
      `Hello Dr. ${doctor.name}, I found your profile on Doctor Finder. I would like to know more about consultation and appointment availability.`
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  const handleDirections = () => {
    if (!doctor) return;

    const destination =
      doctor.latitude !== null &&
      doctor.latitude !== undefined &&
      doctor.longitude !== null &&
      doctor.longitude !== undefined
        ? `${doctor.latitude},${doctor.longitude}`
        : `${doctor.clinicAddress}, ${doctor.city}`;

    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destination
    )}`;

    window.open(mapsUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-info"></div>
        <p className="mt-3 text-muted">
          Loading doctor details...
        </p>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold">Doctor not found</h4>

        <p className="text-muted">
          {error || "Unable to find this doctor."}
        </p>

        <Link to="/doctors" className="btn btn-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Doctors
        </Link>
      </div>
    );
  }

  const image = doctor.image || doctorPlaceholder;

  return (
    <div className="section-light py-5">
      <div className="container">

        {/* Back */}
        <Link
          to="/doctors"
          className="text-decoration-none text-muted d-inline-flex align-items-center mb-4"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Doctors
        </Link>

        {/* Doctor Profile */}
        <div className="card border-0 shadow-sm overflow-hidden mb-4">
          <div className="row g-0">

            {/* Image */}
            <div className="col-lg-4">
              <div
                style={{
                  height: "100%",
                  minHeight: "380px",
                  background: "#E6FFFB",
                }}
              >
                <img
                  src={image}
                  alt={doctor.name}
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src = doctorPlaceholder;
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="col-lg-8">
              <div className="p-4 p-lg-5">

                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <span
                      className="badge mb-2"
                      style={{
                        background: "#E6FFFB",
                        color: "#0F766E",
                      }}
                    >
                      {doctor.specialization}
                    </span>

                    <h2 className="fw-bold mb-1">
                      {doctor.name}
                    </h2>

                    <p className="text-muted mb-3">
                      {doctor.degree}
                    </p>
                  </div>

                  <span
                    className="badge"
                    style={{
                      background: "#2DD4BF",
                      color: "#111",
                    }}
                  >
                    {doctor.availability || "Available"}
                  </span>
                </div>

                <hr />

                <div className="row g-3 mb-4">

                  {/* Experience */}
                  <div className="col-md-6">
                    <div className="d-flex gap-3">
                      <i className="bi bi-briefcase fs-4 text-mint"></i>

                      <div>
                        <small className="text-muted">
                          Experience
                        </small>

                        <div className="fw-semibold">
                          {doctor.experience} Years
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="col-md-6">
                    <div className="d-flex gap-3">
                      <i className="bi bi-cash-stack fs-4 text-mint"></i>

                      <div>
                        <small className="text-muted">
                          Consultation Fee
                        </small>

                        <div className="fw-semibold">
                          ₹{doctor.consultationFee}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clinic */}
                  <div className="col-md-6">
                    <div className="d-flex gap-3">
                      <i className="bi bi-hospital fs-4 text-mint"></i>

                      <div>
                        <small className="text-muted">
                          Clinic / Hospital
                        </small>

                        <div className="fw-semibold">
                          {doctor.clinicName}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="col-md-6">
                    <div className="d-flex gap-3">
                      <i className="bi bi-geo-alt fs-4 text-mint"></i>

                      <div>
                        <small className="text-muted">
                          Location
                        </small>

                        <div className="fw-semibold">
                          {doctor.clinicAddress}, {doctor.city}

                          <button
                            type="button"
                            className="btn btn-sm p-0 ms-2"
                            onClick={handleDirections}
                            title="Get Directions"
                            style={{ color: "#14B8A6" }}
                          >
                            <i className="bi bi-map"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Contact Buttons */}
                <div className="d-flex flex-wrap gap-2">

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleCall}
                  >
                    <i className="bi bi-telephone me-2"></i>
                    Call Doctor
                  </button>

                  <button
                    type="button"
                    className="btn"
                    onClick={handleWhatsApp}
                    style={{
                      border: "1px solid #25D366",
                      color: "#128C7E",
                    }}
                  >
                    <i className="bi bi-whatsapp me-2"></i>
                    WhatsApp
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Section */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">

            <div className="mb-4">
              <h3 className="fw-bold mb-1">
                Book an Appointment
              </h3>

              <p className="text-muted mb-0">
                Choose your preferred date and time.
              </p>
            </div>

            {isLoggedIn ? (
              <AppointmentForm doctor={doctor} />
            ) : (
              <div className="bg-mint-light rounded-3 p-4 text-center">

                <i className="bi bi-person-lock fs-2 text-mint"></i>

                <h5 className="fw-bold mt-2">
                  Login required
                </h5>

                <p className="text-muted mb-3">
                  Please login to book an appointment.
                </p>

                <Link
                  to="/login"
                  className="btn btn-primary px-4"
                >
                  Login to Continue
                </Link>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;