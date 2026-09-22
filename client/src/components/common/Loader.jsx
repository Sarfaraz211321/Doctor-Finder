const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div
        className="spinner-border"
        role="status"
        style={{
          width: "3rem",
          height: "3rem",
          color: "#2DD4BF",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>

      <p className="mt-3 mb-0 text-muted">{text}</p>
    </div>
  );
};

export default Loader;