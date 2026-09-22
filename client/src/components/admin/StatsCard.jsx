const StatsCard = ({
  title,
  value,
  icon,
  subtitle = "",
}) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          
          <div>
            <p className="text-muted mb-2 small fw-semibold">
              {title}
            </p>

            <h3 className="fw-bold mb-1">
              {value ?? 0}
            </h3>

            {subtitle && (
              <small className="text-muted">
                {subtitle}
              </small>
            )}
          </div>

          <div
            className="d-flex justify-content-center align-items-center rounded-3"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#E6FFFB",
            }}
          >
            <i
              className={`bi ${icon} fs-5`}
              style={{ color: "#14B8A6" }}
            ></i>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatsCard;