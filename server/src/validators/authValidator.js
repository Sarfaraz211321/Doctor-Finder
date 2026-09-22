export const validateUserAuth = (name, phone) => {
  if (!name || !name.trim()) {
    return "Name is required";
  }

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return "Enter a valid 10-digit Indian phone number";
  }

  return null;
};

export const validateAdminAuth = (name, email, phone) => {
  if (!name || !name.trim()) {
    return "Name is required";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address";
  }

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return "Enter a valid 10-digit Indian phone number";
  }

  return null;
};