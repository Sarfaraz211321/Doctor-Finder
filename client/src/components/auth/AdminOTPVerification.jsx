import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  verifyAdminOTP,
  sendAdminOTP,
} from "../../services/authService.js";

import { setAdmin } from "../../redux/slices/authSlice.js";

const AdminOTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedData = JSON.parse(
    sessionStorage.getItem("adminOtpData")
  );

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await verifyAdminOTP({
        email: savedData.email,
        phone: savedData.phone,
        otp,
      });

      if (response.success) {
        dispatch(
          setAdmin({
            admin: response.admin,
            token: response.token,
          })
        );

        sessionStorage.removeItem("adminOtpData");

        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setError("");

      await sendAdminOTP(savedData);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  if (!savedData) {
    navigate("/admin/login");
    return null;
  }

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
                      className="bi bi-shield-check fs-2"
                      style={{ color: "#14B8A6" }}
                    ></i>
                  </div>

                  <h3 className="fw-bold">
                    Verify Admin OTP
                  </h3>

                  <p className="text-muted mb-0">
                    OTP sent to {savedData.phone}
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerify}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Enter OTP
                    </label>

                    <input
                      type="text"
                      className="form-control text-center fs-4"
                      placeholder="------"
                      maxLength="6"
                      inputMode="numeric"
                      value={otp}
                      onChange={(e) =>
                        setOtp(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <span className="text-muted small">
                    Didn't receive OTP?{" "}
                  </span>

                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={handleResend}
                    disabled={resendLoading}
                  >
                    {resendLoading
                      ? "Sending..."
                      : "Resend OTP"}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdminOTPVerification;