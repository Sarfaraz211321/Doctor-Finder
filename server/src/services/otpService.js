export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOTPExpiry = () => {
  return new Date(Date.now() + 5 * 60 * 1000);
};

export const verifyOTP = (savedOTP, enteredOTP, expiry) => {
  if (!savedOTP || savedOTP !== enteredOTP) {
    return {
      valid: false,
      message: "Invalid OTP",
    };
  }

  if (!expiry || expiry < new Date()) {
    return {
      valid: false,
      message: "OTP expired",
    };
  }

  return {
    valid: true,
    message: "OTP verified successfully",
  };
};