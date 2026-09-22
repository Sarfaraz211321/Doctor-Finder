export const validateAppointment = (data) => {
  const {
    doctor,
    patientName,
    patientPhone,
    appointmentDate,
    preferredTime,
  } = data;

  if (!doctor) return "Doctor is required";

  if (!patientName || !patientName.trim()) {
    return "Patient name is required";
  }

  if (!patientPhone || !/^[6-9]\d{9}$/.test(patientPhone)) {
    return "Enter a valid 10-digit Indian phone number";
  }

  if (!appointmentDate) {
    return "Appointment date is required";
  }

  if (!preferredTime || !preferredTime.trim()) {
    return "Preferred time is required";
  }

  return null;
};