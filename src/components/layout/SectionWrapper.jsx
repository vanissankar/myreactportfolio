export default function SectionWrapper({ id, children }) {
  return (
    <section id={id} className="container">
      {children}
    </section>
  );
}

