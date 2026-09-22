import { useEffect, useState } from "react";

import {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} from "../../services/locationService.js";

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "Uttar Pradesh",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadLocations = async () => {
    try {
      setLoading(true);

      const response = await getLocations();

      setLocations(response.locations || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load locations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.city.trim()) {
      setError("Location name and city are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await updateLocation(editingId, formData);
      } else {
        await addLocation(formData);
      }

      setFormData({
        name: "",
        city: "",
        state: "Uttar Pradesh",
      });

      setEditingId(null);

      await loadLocations();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save location."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (location) => {
    setEditingId(location._id);

    setFormData({
      name: location.name || "",
      city: location.city || "",
      state: location.state || "Uttar Pradesh",
    });

    setError("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this location?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteLocation(id);

      setLocations((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        handleCancel();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete location."
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      city: "",
      state: "Uttar Pradesh",
    });

    setError("");
  };

  const filteredLocations = locations.filter((item) =>
    `${item.name} ${item.city} ${item.state || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          Manage Locations
        </h3>

        <p className="text-muted mb-0">
          Add and manage locations available for doctor search.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row g-4">
        {/* Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                {editingId
                  ? "Edit Location"
                  : "Add Location"}
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Location Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Gomti Nagar"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="e.g. Lucknow"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    placeholder="e.g. Uttar Pradesh"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i
                          className={`bi ${
                            editingId
                              ? "bi-check-circle"
                              : "bi-plus-circle"
                          } me-2`}
                        ></i>

                        {editingId ? "Update" : "Add"}
                      </>
                    )}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">
                  All Locations
                </h5>

                <span className="badge bg-dark">
                  {locations.length}
                </span>
              </div>

              {/* Search */}
              <div className="input-group mb-4">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search location or city..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-info"></div>
                </div>
              ) : filteredLocations.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-geo-alt fs-1 text-mint"></i>

                  <p className="text-muted mt-2 mb-0">
                    No locations found.
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {filteredLocations.map((location) => (
                    <div
                      key={location._id}
                      className="border rounded-3 p-3"
                    >
                      <div className="d-flex justify-content-between align-items-center gap-3">

                        <div>
                          <h6 className="fw-bold mb-1">
                            <i className="bi bi-geo-alt-fill text-mint me-2"></i>
                            {location.name}
                          </h6>

                          <p className="text-muted small mb-0">
                            {location.city}
                            {location.state
                              ? `, ${location.state}`
                              : ""}
                          </p>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              handleEdit(location)
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              handleDelete(location._id)
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageLocations;