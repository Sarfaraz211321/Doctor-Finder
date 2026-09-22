const EmptyState = ({
  icon = "bi-inbox",
  title = "No Data Found",
  message = "There is nothing to show here.",
  action,
}) => {
  return (
    <div className="text-center py-5 px-3">
      <div
        className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
        style={{
          width: "70px",
          height: "70px",
          backgroundColor: "#E6FFFB",
        }}
      >
        <i
          className={`bi ${icon} fs-2`}
          style={{ color: "#14B8A6" }}
        ></i>
      </div>

      <h5 className="fw-bold mb-2">{title}</h5>

      <p className="text-muted mb-3">{message}</p>

      {action && action}
    </div>
  );
};

export default EmptyState;