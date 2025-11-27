export default function Card({ children, style = {}, className = "" }) {
  const cardStyle = {
    background: "var(--card-dark)",
    padding: "1.8rem",
    borderRadius: "1rem",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.3s ease",
    ...style,
  };

  const hoverStyle = {
    borderColor: "var(--accent)",
  };

  return (
    <div
      className={className}          // ⭐ ADDED (important)
      style={cardStyle}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
    >
      {children}
    </div>
  );
}
