const Modal = ({
  show,
  onClose,
  title,
  children,
  size = "",
}) => {
  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-dialog modal-dialog-centered ${size}`}>
          <div className="modal-content border-0 shadow-lg rounded-4">

            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold">{title}</h5>

              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-4">
              {children}
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Modal;