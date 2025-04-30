import AuthLoginForm from "@auth/components/AuthLoginForm";
import { Link } from "react-router-dom";

export default function AuthSignInView() {
  return (
    <div>
      <div>
        <img src="/login.png" alt="loginImage" />
      </div>
      <div>
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" />
        </Link>
        <p>Iniciar sesión</p>
        <AuthLoginForm />
      </div>
    </div>
  )
}



// code javascript
// import LoginForm from "../components/LoginForm/LoginForm";
// import { Link } from "react-router-dom";
// import styles from "./Signin.module.css";

// const Signin = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.formImage}>
//         <img src="/login.png" alt="loginImage" />
//       </div>
//       <div className={styles.formContainer}>
//         <Link to={"/"}>
//           <img src="/logo.png" alt="logo" />
//         </Link>
//         <p>Iniciar sesión</p>
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default Signin;
