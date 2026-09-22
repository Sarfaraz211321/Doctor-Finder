import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginUser } from "../../services/authService.js";
import { setUser } from "../../redux/slices/authSlice.js";

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser(formData);

      if (response.success) {
        dispatch(
          setUser({
            user: response.user,
            token: response.token,
          })
        );

        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-vh-100 d-flex align-items-center"
      style={{ backgroundColor: "#F7FAF9" }}
    >
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
                    style={{
                      width: "70px",
                      height: "70px",
                      backgroundColor: "#E6FFFB",
                    }}
                  >
                    <i
                      className="bi bi-person-circle fs-2"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h3 className="fw-bold">
                    Welcome to Doctor Finder
                  </h3>

                  <p className="text-muted mb-0">
                    Login to find and book doctors
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Gmail / Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </button>

                </form>

                <p className="text-center text-muted small mt-4 mb-0">
                  Don't have an account? Register to continue.
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UserLogin;