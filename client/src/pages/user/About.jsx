import { Link } from "react-router-dom";

import aboutDoctor from "../../assets/images/about-doctor.png";

const About = () => {
  return (
    <>
      {/* Hero */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#111111",
          color: "#ffffff",
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{
                  backgroundColor: "#2DD4BF",
                  color: "#111111",
                }}
              >
                About Doctor Finder
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Making Healthcare
                <span style={{ color: "#2DD4BF" }}>
                  {" "}Simple & Accessible
                </span>
              </h1>

              <p className="text-white-50 lead mb-0">
                Doctor Finder helps patients discover trusted
                doctors based on their medical needs and location,
                making the journey to better healthcare easier.
              </p>
            </div>

            <div className="col-lg-5 text-center">
              <img
                src={aboutDoctor}
                alt="Doctor Finder"
                className="img-fluid"
                style={{
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-5">
        <div className="container py-3">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">
                Why Doctor Finder?
              </h2>

              <p className="text-muted">
                Finding the right doctor can sometimes be
                difficult. Doctor Finder provides a simple platform
                where users can search doctors by specialization
                and location.
              </p>

              <p className="text-muted">
                Users can view doctor profiles, clinic information,
                consultation fees, contact doctors directly and
                book appointments online.
              </p>

              <Link
                to="/doctors"
                className="btn btn-primary mt-2"
              >
                Find a Doctor
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  ["bi-search", "Easy Search", "Find doctors quickly."],
                  ["bi-person-check", "Doctor Profiles", "View complete doctor details."],
                  ["bi-calendar-check", "Easy Booking", "Book appointments easily."],
                  ["bi-geo-alt", "Nearby Doctors", "Search by location."],
                ].map(([icon, title, text]) => (
                  <div className="col-6" key={title}>
                    <div className="card border-0 shadow-sm p-4 text-center h-100">
                      <i
                        className={`bi ${icon} fs-1 mb-3`}
                        style={{ color: "#14B8A6" }}
                      ></i>

                      <h6 className="fw-bold">{title}</h6>

                      <p className="text-muted small mb-0">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-5"
        style={{ backgroundColor: "#E6FFFB" }}
      >
        <div className="container text-center py-3">
          <i
            className="bi bi-heart-pulse fs-1"
            style={{ color: "#14B8A6" }}
          ></i>

          <h2 className="fw-bold mt-3">
            Our Mission
          </h2>

          <p
            className="text-muted mx-auto mb-0"
            style={{ maxWidth: "700px" }}
          >
            To make finding and connecting with the right
            healthcare professional simple, convenient and
            accessible for everyone.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;