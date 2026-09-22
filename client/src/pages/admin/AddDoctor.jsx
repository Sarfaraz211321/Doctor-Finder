import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addDoctor } from "../../services/doctorService.js";
import { getSpecializations } from "../../services/specializationService.js";
import { getLocations } from "../../services/locationService.js";



const AddDoctor = () => {
  const navigate = useNavigate();

  const [specializations, setSpecializations] = useState([]);
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    degree: "",
    experience: "",
    consultationFee: "",
    specialization: "",
    clinicName: "",
    clinicAddress: "",
    city: "",
    phone: "",
    availability: "Available",
    latitude: "",
    longitude: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const loadOptions = async () => {
      try {
        setError("");

        const [specializationResponse, locationResponse] =
          await Promise.all([
            getSpecializations(),
            getLocations(),
          ]);

        setSpecializations(
          specializationResponse?.specializations || []
        );

        setLocations(
          locationResponse?.locations || []
        );
      } catch (error) {
        console.error("Add Doctor Options Error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load specializations or locations."
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("degree", formData.degree);
      data.append("experience", Number(formData.experience));
      data.append(
        "consultationFee",
        Number(formData.consultationFee)
      );
      data.append("specialization", formData.specialization);
      data.append("clinicName", formData.clinicName);
      data.append("clinicAddress", formData.clinicAddress);
      data.append("city", formData.city);
      data.append("phone", formData.phone);
      data.append("availability", formData.availability);

      if (formData.latitude !== "") {
        data.append("latitude", Number(formData.latitude));
      }

      if (formData.longitude !== "") {
        data.append("longitude", Number(formData.longitude));
      }

      if (image) {
        data.append("image", image);
      }

      await addDoctor(data);

      navigate("/admin/doctors");
    } catch (error) {
      console.error("Add Doctor Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add doctor."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Add Doctor</h3>

        <p className="text-muted mb-0">
          Add a new doctor to Doctor Finder.
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          {loadingOptions && (
            <div className="alert alert-info">
              Loading specializations and locations...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Doctor Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Degree
                </label>

                <input
                  type="text"
                  name="degree"
                  className="form-control"
                  placeholder="MBBS, MD"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Experience (Years)
                </label>

                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  min="0"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Consultation Fee
                </label>

                <input
                  type="number"
                  name="consultationFee"
                  className="form-control"
                  min="0"
                  value={formData.consultationFee}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Specialization
                </label>

                <select
                  name="specialization"
                  className="form-select"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    {loadingOptions
                      ? "Loading..."
                      : "Select specialization"}
                  </option>

                  {specializations.map((item) => (
                    <option
                      key={item._id}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Clinic / Hospital Name
                </label>

                <input
                  type="text"
                  name="clinicName"
                  className="form-control"
                  value={formData.clinicName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Clinic Address
                </label>

                <input
                  type="text"
                  name="clinicAddress"
                  className="form-control"
                  value={formData.clinicAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  className="form-control"
                  placeholder="Enter city e.g. Amethi"
                  value={formData.city}
                  onChange={handleChange}
                  list="city-options"
                  required
                />

                <datalist id="city-options">
                  {locations.map((item) => (
                    <option
                      key={item._id}
                      value={item.city}
                    />
                  ))}
                </datalist>

                <small className="text-muted">
                  Existing city select karo ya new city type karo.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Doctor Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <small className="text-muted">
                  Device se doctor ki photo select karo. Maximum 5 MB.
                </small>

                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Doctor Preview"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Availability
                </label>

                <select
                  name="availability"
                  className="form-select"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Not Available">
                    Not Available
                  </option>

                  <option value="By Appointment">
                    By Appointment
                  </option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="latitude"
                  className="form-control"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  name="longitude"
                  className="form-control"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 mt-4">
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Doctor
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      navigate("/admin/doctors")
                    }
                  >
                    Cancel
                  </button>

                </div>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddDoctor;