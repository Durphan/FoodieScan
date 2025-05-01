import { Business } from "@dashboard/interfaces/dashboard.interface";
import { restaurantSchema } from "@dashboard/schemas/dashboard.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./DashboardCreateBusiness.css";
import { createBusiness } from "@dashboard/services/dashboard.service";
import Swal from "sweetalert2";

export default function DashboardCreateBusiness() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(restaurantSchema),
  });

  const onSubmit = async (data: Business) => {
    console.log(data);

    setIsSaving(true);
    const createNewBusiness = await createBusiness(data);
    if (createNewBusiness.status === 202) {
      Swal.fire({
        position: "top",
        icon: "success",
        toast: true,
        title: `Negocio registrado correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/menu");
    } else {
      alert("Hubo un problema al registrar el restaurante.");
    }

    setIsSaving(false);
  }

  return (
    <div className="container">
      <div
        className="logoContainer"
        onClick={() => navigate("/dashboard/menu")}
      >
        <button className="newButton">Volver</button>
      </div>
      <h1>Registrar Restaurante</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup">
          <input
            type="text"
            placeholder="Nombre del restaurante"
            {...register("name")}
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Teléfono"
            {...register("phoneNumber")}
            className="input"
          />
          {errors.phoneNumber && (
            <p className="error">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="inputGroup">
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register("email")}
            className="input"
          />
          {errors.email && (
            <p className="error">{errors.email.message}</p>
          )}
        </div>

        <button type="submit" className="saveButton" disabled={isSaving}>
          {isSaving ? "Guardando..." : "Registrar Restaurante"}
        </button>
      </form>
    </div>
  )
}
