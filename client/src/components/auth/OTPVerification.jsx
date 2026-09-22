import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  verifyUserOTP,
  sendUserOTP,
} from "../../services/authService.js";

import { setUser } from "../../redux/slices/authSlice.js";

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const phone = sessionStorage.getItem("otpPhone");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await verifyUserOTP({
        phone,
        otp,
      });

      if (response.success) {
        dispatch(
          setUser({
            user: response.user,
            token: response.token,
          })
        );

        sessionStorage.removeItem("otpPhone");

        navigate("/dashboard");
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
    const name = JSON.parse(localStorage.getItem("user"))?.name || "";

    try {
      setResendLoading(true);
      setError("");

      await sendUserOTP({
        name,
        phone,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  if (!phone) {
    navigate("/login");
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
                    Verify Your Number
                  </h3>

                  <p className="text-muted mb-0">
                    Enter the OTP sent to +91 {phone}
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
                    {loading ? "Verifying..." : "Verify OTP"}
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

export default OTPVerification;