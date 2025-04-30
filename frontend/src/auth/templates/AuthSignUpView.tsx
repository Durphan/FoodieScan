import AuthRegisterForm from "@auth/components/AuthRegisterForm";
import { Link } from "react-router-dom";

export default function AuthSingUpView() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        <img src="/registro.png" alt="Register Image" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vh",
          }}
        >
          <Link to={"/"}>
            <img src="/logo.png" alt="logo" />
          </Link>
          <p>Registrarse</p>
          <AuthRegisterForm />
        </div>
      </div>
    </div>
  );
}

// code javascript
// import RegisterForm from "../components/RegisterForm/RegisterForm";
// import { Link } from "react-router-dom";
// import styles from "./Signin.module.css";

// const Signup = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.formImage}>
//         <img src="/registro.png" alt="Register Image" />
//       </div>
//       <div className={styles.formContainer}>
//         <Link to={"/"}></Link>
//         <p>Registrarse</p>
//         <RegisterForm />
//       </div>
//     </div>
//   );
// };

// export default Signup;
