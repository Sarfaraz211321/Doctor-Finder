import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DoctorSearch from "../../components/user/DoctorSearch.jsx";
import SpecializationCard from "../../components/user/SpecializationCard.jsx";
import { getSpecializations } from "../../services/specializationService.js";

import heroDoctor from "../../assets/images/hero-doctor.png";

const Home = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const response = await getSpecializations();
        setSpecializations(response.specializations || []);
      } catch (error) {
        console.error("Failed to load specializations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpecializations();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="section-light py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span
                className="badge mb-3"
                style={{
                  background: "#E6FFFB",
                  color: "#0F766E",
                }}
              >
                <i className="bi bi-heart-pulse me-2"></i>
                Trusted Healthcare Platform
              </span>

              <h1 className="display-4 fw-bold mb-3">
                Find the Right Doctor
                <span className="text-mint"> Near You</span>
              </h1>

              <p className="lead text-muted mb-4">
                Search trusted doctors by specialization and
                location. Connect with the right healthcare
                professional and book your appointment easily.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link
                  to="/doctors"
                  className="btn btn-primary px-4 py-2"
                >
                  <i className="bi bi-search me-2"></i>
                  Find a Doctor
                </Link>

                <Link
                  to="/about"
                  className="btn btn-outline-primary px-4 py-2"
                >
                  Learn More
                </Link>
              </div>

              <div className="d-flex flex-wrap gap-4 text-muted small">
                <span>
                  <i className="bi bi-check-circle-fill text-mint me-2"></i>
                  Verified Profiles
                </span>

                <span>
                  <i className="bi bi-check-circle-fill text-mint me-2"></i>
                  Easy Booking
                </span>

                <span>
                  <i className="bi bi-check-circle-fill text-mint me-2"></i>
                  Quick Contact
                </span>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={heroDoctor}
                alt="Doctor"
                className="img-fluid"
                style={{
                  maxHeight: "480px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section
        className="py-4"
        style={{ marginTop: "-45px" }}
      >
        <div className="container">
          <DoctorSearch />
        </div>
      </section>

      {/* Specializations */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-mint fw-semibold">
              SPECIALIZATIONS
            </span>

            <h2 className="fw-bold mt-2">
              Find Doctors by Specialization
            </h2>

            <p className="text-muted">
              Choose a medical specialty to find the right
              doctor for your needs.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-info"></div>
            </div>
          ) : specializations.length === 0 ? (
            <div className="text-center text-muted py-4">
              No specializations available.
            </div>
          ) : (
            <div className="row g-4">
              {specializations.map((item) => (
                <div
                  className="col-12 col-sm-6 col-lg-3"
                  key={item._id}
                >
                  <SpecializationCard
                    specialization={item}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-light py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-mint fw-semibold">
              WHY CHOOSE US
            </span>

            <h2 className="fw-bold mt-2">
              Healthcare Made Simple
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <i className="bi bi-search fs-1 text-mint mb-3"></i>

                <h5 className="fw-bold">
                  Easy Doctor Search
                </h5>

                <p className="text-muted mb-0">
                  Find doctors by specialization and
                  location within seconds.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <i className="bi bi-calendar-check fs-1 text-mint mb-3"></i>

                <h5 className="fw-bold">
                  Easy Appointment
                </h5>

                <p className="text-muted mb-0">
                  Select your preferred date and time
                  and book your appointment easily.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 text-center">
                <i className="bi bi-telephone fs-1 text-mint mb-3"></i>

                <h5 className="fw-bold">
                  Direct Contact
                </h5>

                <p className="text-muted mb-0">
                  Call or WhatsApp doctors directly from
                  their profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;