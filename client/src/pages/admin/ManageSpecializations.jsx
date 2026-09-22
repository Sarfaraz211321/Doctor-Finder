import { useEffect, useState } from "react";

import {
  getSpecializations,
  addSpecialization,
  updateSpecialization,
  deleteSpecialization,
} from "../../services/specializationService.js";

const ManageSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSpecializations = async () => {
    try {
      setLoading(true);

      const response = await getSpecializations();

      setSpecializations(
        response.specializations || []
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load specializations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecializations();
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

    if (!formData.name.trim()) {
      setError("Specialization name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId) {
        await updateSpecialization(
          editingId,
          formData
        );
      } else {
        await addSpecialization(formData);
      }

      setFormData({
        name: "",
        description: "",
      });

      setEditingId(null);

      await loadSpecializations();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save specialization."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (specialization) => {
    setEditingId(specialization._id);

    setFormData({
      name: specialization.name || "",
      description:
        specialization.description || "",
    });

    setError("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this specialization?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteSpecialization(id);

      setSpecializations((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (editingId === id) {
        handleCancel();
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete specialization."
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
    });

    setError("");
  };

  const filteredSpecializations =
    specializations.filter((item) =>
      `${item.name} ${item.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div>

      {/* Header */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">
          Manage Specializations
        </h3>

        <p className="text-muted mb-0">
          Add and manage doctor specializations.
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
                  ? "Edit Specialization"
                  : "Add Specialization"}
              </h5>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="e.g. Cardiologist"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    placeholder="Short description..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
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

                        {editingId
                          ? "Update"
                          : "Add"}
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

        {/* List */}
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                <h5 className="fw-bold mb-0">
                  All Specializations
                </h5>

                <span className="badge bg-dark">
                  {specializations.length}
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
                  placeholder="Search specialization..."
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
              ) : filteredSpecializations.length ===
                0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-heart-pulse fs-1 text-mint"></i>

                  <p className="text-muted mt-2 mb-0">
                    No specializations found.
                  </p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">

                  {filteredSpecializations.map(
                    (item) => (
                      <div
                        key={item._id}
                        className="border rounded-3 p-3"
                      >
                        <div className="d-flex justify-content-between align-items-start gap-3">

                          <div>
                            <h6 className="fw-bold mb-1">
                              {item.name}
                            </h6>

                            <p className="text-muted small mb-0">
                              {item.description ||
                                "No description added."}
                            </p>
                          </div>

                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button>

                          </div>

                        </div>
                      </div>
                    )
                  )}

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageSpecializations;