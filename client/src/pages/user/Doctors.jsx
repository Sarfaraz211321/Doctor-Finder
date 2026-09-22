import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DoctorSearch from "../../components/user/DoctorSearch.jsx";
import DoctorCard from "../../components/user/DoctorCard.jsx";

import {
  getDoctors,
  searchDoctors,
} from "../../services/doctorService.js";

const Doctors = () => {
  const location = useLocation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchState = location.state || {};

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);

        // Search results already available
        if (Array.isArray(searchState.doctors)) {
          setDoctors(searchState.doctors);
          return;
        }

        // Search by specialization or city
        if (searchState.specialization || searchState.city) {
          const response = await searchDoctors(
            searchState.specialization || "",
            searchState.city || ""
          );

          setDoctors(response.doctors || []);
          return;
        }

        // Normal doctors page
        const response = await getDoctors();
        setDoctors(response.doctors || []);
      } catch (error) {
        console.error("Failed to load doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [location.state]);

  return (
    <div className="section-light min-vh-100">
      {/* Header */}
      <section
        className="py-5"
        style={{
          background: "#111111",
          color: "#ffffff",
        }}
      >
        <div className="container py-3">
          <span
            className="badge mb-3"
            style={{
              background: "#E6FFFB",
              color: "#0F766E",
            }}
          >
            Doctor Finder
          </span>

          <h1 className="fw-bold mb-2">
            Find the Right Doctor
          </h1>

          <p className="text-white-50 mb-0">
            Search trusted doctors by specialization and location.
          </p>
        </div>
      </section>

      {/* Search */}
      <section
        className="py-4"
        style={{ marginTop: "-30px" }}
      >
        <div className="container">
          <DoctorSearch />
        </div>
      </section>

      {/* Results */}
      <section className="py-4 pb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="fw-bold mb-1">
                Available Doctors
              </h3>

              <p className="text-muted mb-0">
                {searchState.specialization || searchState.city
                  ? `Search results${
                      searchState.specialization
                        ? ` for ${searchState.specialization}`
                        : ""
                    }${
                      searchState.city
                        ? ` in ${searchState.city}`
                        : ""
                    }`
                  : "Browse all available doctors"}
              </p>
            </div>

            {!loading && (
              <span className="badge bg-dark">
                {doctors.length} Doctors
              </span>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info"></div>
              <p className="text-muted mt-3">
                Loading doctors...
              </p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="card border-0 shadow-sm text-center p-5">
              <i className="bi bi-person-x fs-1 text-mint"></i>

              <h5 className="fw-bold mt-3">
                No doctors found
              </h5>

              <p className="text-muted mb-0">
                Try another specialization or location.
              </p>
            </div>
          ) : (
            <div className="row g-4">
              {doctors.map((doctor) => (
                <div
                  className="col-12 col-md-6 col-xl-4"
                  key={doctor._id}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Doctors;