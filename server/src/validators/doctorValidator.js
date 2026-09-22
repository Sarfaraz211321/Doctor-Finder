export const validateDoctor = (data) => {
  const {
    name,
    degree,
    experience,
    consultationFee,
    specialization,
    clinicName,
    clinicAddress,
    city,
    phone,
  } = data;

  if (!name || !name.trim()) return "Doctor name is required";
  if (!degree || !degree.trim()) return "Doctor degree is required";

  if (experience === undefined || experience === null || experience < 0) {
    return "Valid experience is required";
  }

  if (
    consultationFee === undefined ||
    consultationFee === null ||
    consultationFee < 0
  ) {
    return "Valid consultation fee is required";
  }

  if (!specialization || !specialization.trim()) {
    return "Specialization is required";
  }

  if (!clinicName || !clinicName.trim()) {
    return "Clinic name is required";
  }

  if (!clinicAddress || !clinicAddress.trim()) {
    return "Clinic address is required";
  }

  if (!city || !city.trim()) {
    return "City is required";
  }

  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    return "Enter a valid 10-digit Indian phone number";
  }

  return null;
};