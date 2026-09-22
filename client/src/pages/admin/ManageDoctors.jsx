import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  deleteDoctor,
  getDoctors,
} from "../../services/doctorService.js";

import doctorPlaceholder from "../../assets/images/doctor-placeholder.png";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDoctors();
      setDoctors(response.doctors || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load doctors."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmed) return;

    try {
      await deleteDoctor(id);

      setDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete doctor."
      );
    }
  };

  const filteredDoctors = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return doctors;

    return doctors.filter((doctor) =>
      [
        doctor.name,
        doctor.degree,
        doctor.specialization,
        doctor.clinicName,
        doctor.city,
        doctor.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [doctors, search]);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            Manage Doctors
          </h3>

          <p className="text-muted mb-0">
            Add, edit, search and manage doctors.
          </p>
        </div>

        <Link
          to="/admin/doctors/add"
          className="btn btn-primary"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Doctor
        </Link>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search by name, specialization, clinic, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-info"></div>
          <p className="text-muted mt-3">
            Loading doctors...
          </p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="card border-0 shadow-sm text-center p-5">
          <i className="bi bi-person-x fs-1 text-mint"></i>

          <h5 className="fw-bold mt-3">
            No doctors found
          </h5>

          <p className="text-muted mb-0">
            {search
              ? "Try a different search."
              : "No doctors have been added yet."}
          </p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Clinic</th>
                  <th>Location</th>
                  <th>Fee</th>
                  <th>Availability</th>
                  <th className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.map((doctor) => {
                  const image =
                    doctor.image || doctorPlaceholder;

                  return (
                    <tr key={doctor._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={image}
                            alt={doctor.name}
                            width="50"
                            height="50"
                            className="rounded-circle"
                            style={{
                              objectFit: "cover",
                              background: "#E6FFFB",
                            }}
                            onError={(e) => {
                              e.currentTarget.src =
                                doctorPlaceholder;
                            }}
                          />

                          <div>
                            <div className="fw-bold">
                              {doctor.name}
                            </div>

                            <small className="text-muted">
                              {doctor.degree}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className="badge"
                          style={{
                            background: "#E6FFFB",
                            color: "#0F766E",
                          }}
                        >
                          {doctor.specialization}
                        </span>
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {doctor.clinicName}
                        </div>

                        <small className="text-muted">
                          {doctor.phone}
                        </small>
                      </td>

                      <td>
                        <i className="bi bi-geo-alt me-1 text-mint"></i>
                        {doctor.city}
                      </td>

                      <td className="fw-semibold">
                        ₹{doctor.consultationFee}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            doctor.availability === "Available"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {doctor.availability || "Available"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            to={`/admin/doctors/edit/${doctor._id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit Doctor"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            title="Delete Doctor"
                            onClick={() =>
                              handleDelete(doctor._id)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;