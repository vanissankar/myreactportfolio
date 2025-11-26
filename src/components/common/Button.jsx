export default function Button({ children, onClick, type = "primary", style = {} }) {
  const baseStyle = {
    padding: "0.8rem 1.6rem",
    borderRadius: "0.5rem",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "0.25s ease",
  };

  const variants = {
    primary: {
      background: "var(--accent)",
      color: "#000",
    },
    outline: {
      background: "transparent",
      color: "var(--accent)",
      border: "1px solid var(--accent)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-light)",
    },
  };

  const mergedStyle = { ...baseStyle, ...variants[type], ...style };

  return (
    <button onClick={onClick} style={mergedStyle}>
      {children}
    </button>
  );
}
