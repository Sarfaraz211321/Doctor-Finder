import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-5">
        <div className="row g-4">

          <div className="col-lg-5">
            <Link
              to="/"
              className="text-decoration-none text-white fs-4 fw-bold"
            >
              <i className="bi bi-heart-pulse-fill me-2 text-info"></i>
              Doctor Finder
            </Link>

            <p className="text-white-50 mt-3 mb-0">
              Find trusted doctors near you and book your appointment
              easily with Doctor Finder.
            </p>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="fw-bold mb-3">Quick Links</h6>

            <div className="d-flex flex-column gap-2">
              <Link to="/" className="text-white-50 text-decoration-none">
                Home
              </Link>

              <Link
                to="/doctors"
                className="text-white-50 text-decoration-none"
              >
                Find Doctors
              </Link>

              <Link
                to="/about"
                className="text-white-50 text-decoration-none"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="col-6 col-lg-4">
            <h6 className="fw-bold mb-3">Contact</h6>

            <p className="text-white-50 mb-2">
              <i className="bi bi-envelope me-2 text-info"></i>
              support@doctorfinder.com
            </p>

            <p className="text-white-50 mb-2">
              <i className="bi bi-telephone me-2 text-info"></i>
              +91 8787656543
            </p>

            <div className="d-flex gap-3 mt-3">
              <i className="bi bi-facebook fs-5"></i>
              <i className="bi bi-instagram fs-5"></i>
              <i className="bi bi-linkedin fs-5"></i>
            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-white-50 small">
          © {new Date().getFullYear()} Doctor Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;