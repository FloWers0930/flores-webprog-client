import { Link } from "react-router-dom";

function Button({
  children,
  to,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2.5 text-[11px] tracking-[0.08em] uppercase rounded-full border-[1.5px] transition-all duration-300";

  const variants = {
    primary:
      "border-[#2a3a2a] text-[#2a3a2a] hover:bg-[#2a3a2a] hover:text-[#f8f9f5]",
    secondary:
      "border-[#c5d0c5] text-[#6a7a6a] hover:border-[#8a9a8a] hover:text-[#2a3a2a]",
    dark: "border-[#2a3a2a] bg-[#2a3a2a] text-[#f8f9f5] hover:bg-[#3a4a3a]",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}

export default Button;
