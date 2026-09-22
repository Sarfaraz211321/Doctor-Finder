import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMyAppointments } from "../../services/appointmentService.js";

import {
  setAppointments,
  setAppointmentLoading,
  setAppointmentError,
} from "../../redux/slices/appointmentSlice.js";

import AppointmentCard from "../../components/user/AppointmentCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

const MyAppointments = () => {
  const dispatch = useDispatch();

  const { appointments, loading, error } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        dispatch(setAppointmentLoading(true));
        dispatch(setAppointmentError(null));

        const data = await getMyAppointments();

        dispatch(setAppointments(data.appointments || []));
      } catch (error) {
        dispatch(
          setAppointmentError(
            error.response?.data?.message ||
              "Failed to load appointments."
          )
        );
      } finally {
        dispatch(setAppointmentLoading(false));
      }
    };

    fetchAppointments();
  }, [dispatch]);

  return (
    <section
      className="py-5"
      style={{
        backgroundColor: "#F7FAF9",
        minHeight: "80vh",
      }}
    >
      <div className="container">
        <div className="mb-5">
          <p
            className="fw-semibold mb-1"
            style={{ color: "#14B8A6" }}
          >
            MY HEALTHCARE
          </p>

          <h2 className="fw-bold mb-2">
            My Appointments
          </h2>

          <p className="text-muted mb-0">
            View your booked appointments and doctor details.
          </p>
        </div>

        {loading && (
          <Loader text="Loading your appointments..." />
        )}

        {!loading && error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <EmptyState
                icon="bi-calendar-x"
                title="No Appointments Yet"
                message="You haven't booked any doctor appointments yet."
                action={
                  <Link
                    to="/doctors"
                    className="btn btn-primary"
                  >
                    Find a Doctor
                  </Link>
                }
              />
            </div>
          </div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {appointments.length} Appointment
                {appointments.length > 1 ? "s" : ""}
              </h5>
            </div>

            <div className="row g-4">
              {appointments.map((appointment) => (
                <div
                  className="col-md-6 col-lg-4"
                  key={appointment._id}
                >
                  <AppointmentCard appointment={appointment} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MyAppointments;