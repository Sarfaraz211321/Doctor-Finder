
import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { getAllUsers } from "../../services/adminService.js";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllUsers();

      setPatients(response.users || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load patients."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return patients;

    return patients.filter((patient) =>
      `${patient.name || ""} ${patient.email || ""}`
        .toLowerCase()
        .includes(value)
    );
  }, [patients, search]);

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">
            Manage Patients
          </h3>

          <p className="text-muted mb-0">
            View registered patients and their details.
          </p>
        </div>

        <span className="badge bg-dark fs-6 px-3 py-2">
          {patients.length} Patients
        </span>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          {/* Search */}
          <div className="input-group mb-4">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search by patient name or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info"></div>

              <p className="text-muted mt-2 mb-0">
                Loading patients...
              </p>
            </div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-people fs-1 text-mint"></i>

              <h6 className="fw-bold mt-3">
                No patients found
              </h6>

              <p className="text-muted mb-0">
                Try another search.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Registered On</th>
                    <th className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map(
                    (patient, index) => (
                      <tr key={patient._id}>

                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="rounded-circle bg-mint-light d-flex align-items-center justify-content-center"
                              style={{
                                width: "42px",
                                height: "42px",
                              }}
                            >
                              <i className="bi bi-person-fill text-mint"></i>
                            </div>

                            <div>
                              <div className="fw-semibold">
                                {patient.name}
                              </div>

                              <small className="text-muted">
                                Patient
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          <i className="bi bi-envelope me-2 text-mint"></i>
                          {patient.email}
                        </td>

                        <td>
                          {patient.createdAt
                            ? new Date(
                                patient.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                        <td className="text-end">
                          <Link
                            to={`/admin/patients/${patient._id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-eye me-1"></i>
                            View
                          </Link>
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

export default ManagePatients;

