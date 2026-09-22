import { useNavigate } from "react-router-dom";

const SpecializationCard = ({ specialization }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/doctors", {
      state: {
        specialization: specialization.name,
        city: "",
      },
    });
  };

  return (
    <div
      className="card h-100 border-0 shadow-sm text-center p-4"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div
        className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "70px",
          height: "70px",
          background: "#E6FFFB",
        }}
      >
        <i className="bi bi-heart-pulse fs-2 text-mint"></i>
      </div>

      <h5 className="fw-bold mb-2">
        {specialization.name}
      </h5>

      {specialization.description && (
        <p className="text-muted small mb-0">
          {specialization.description}
        </p>
      )}

      <div className="mt-3">
        <span className="text-mint small fw-semibold">
          Find Doctors
          <i className="bi bi-arrow-right ms-2"></i>
        </span>
      </div>
    </div>
  );
};

export default SpecializationCard;