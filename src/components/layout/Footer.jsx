import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} Anis — All Rights Reserved.
      </p>

      <p className="footer-credit">
        Built with ❤️ using React + Vite
      </p>
    </footer>
  );
}
