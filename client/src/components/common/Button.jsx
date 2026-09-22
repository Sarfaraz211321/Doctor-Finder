const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} px-4 py-2 ${className}`}
    >
      {icon && <i className={`bi ${icon} me-2`}></i>}

      {children}
    </button>
  );
};

export default Button;