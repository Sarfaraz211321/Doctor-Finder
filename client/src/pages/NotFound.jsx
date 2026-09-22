const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-4 fw-bold">404</h1>

      <p className="text-muted mb-4">
        Page not found
      </p>

      <a href="/" className="btn btn-primary">
        Go Home
      </a>
    </div>
  );
};

export default NotFound;