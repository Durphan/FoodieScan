import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@auth/schemas/auth.schema";
import { UserRegister } from "@auth/interfaces/auth.interface";
import { authRegister } from "@auth/services/auth.service";
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


export default function AuthRegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: UserRegister) => {
    console.log("Datos del formulario", data);
    setIsLoading(true);

    const newUser = await authRegister(data);
    if (newUser.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Usuario registrado correctamente",
        text: "Ahora puedes iniciar sesión.",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/signin");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: newUser.data?.message,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[350px]">
        <TextField
          label="Nombre"
          variant="outlined"
          type="text"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

        <TextField
          label="Fecha de nacimiento"
          variant="outlined"
          type="date"
          {...register("dateOfBirth")}
          error={Boolean(errors.dateOfBirth)}
          helperText={errors.dateOfBirth?.message}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Telefono"
          variant="outlined"
          type="text"
          {...register("phoneNumber")}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber?.message}
        />

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
          {isLoading ? <CircularProgress size={24} /> : "Registrarse"}
        </Button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes cuenta?
        <Link to={"/signin"}>
          <span> Inicia sesión</span>{" "}
        </Link>
      </p>
    </div>
  )
}
