const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} FoddieScan. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
