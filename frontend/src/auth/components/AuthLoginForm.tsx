import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@auth/schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "@auth/interfaces/auth.interface";
import { useState } from "react";
import { authLogin } from "@auth/services/auth.service";
import Swal from "sweetalert2";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: UserLogin) => {
    console.log("Datos del formulario", data);
    setIsLoading(true);

    const user = await authLogin(data);
    if (user.status === 200) {
      Swal.fire({
        position: "top",
        icon: "success",
        toast: true,
        title: `Bienvenido`,
        showConfirmButton: false,
        timer: 1500,
      });

      if (user.data.jwtToken) {
        /* login(result.jwtToken, result.user); */
        localStorage.setItem("token", user.data.jwtToken);
        navigate("/dashboard/menu");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se recibió un token.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: user.data.message || "Credenciales incorrectas.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="E-mail"
          variant="outlined"
          type="email"
          {...register("email")}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? (
                      <EyeSlashIcon style={{ width: 20, height: 20 }} />
                    ) : (
                      <EyeIcon style={{ width: 20, height: 20 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button type="submit" variant="contained" color="primary">
          {isLoading ? <CircularProgress size={24} /> : "Ingresar"}
        </Button>
      </form>

      <p className="mt-3 text-center">
        ¿No tienes una cuenta?
        <Link to={"/signup"}>
          <span> Registrate</span>{" "}
        </Link>
      </p>
    </div>
  )
}
