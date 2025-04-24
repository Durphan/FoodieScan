import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CreateMenu.module.css";
import Swal from "sweetalert2";

const menuSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
});

const CreateMenu = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const userToken = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuSchema),
  });

  const createMenu = async (data) => {
    if (!userToken || !businessId) {
      alert("Faltan datos necesarios.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        "https://menuproject-backend-test.onrender.com/api/menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            name: data.name,
            businessId: Number(businessId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el menú.");
      }

      Swal.fire({
        position: "top",
        icon: "success",
        toast: true,
        title: `Menu creado correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al crear el menú.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.logoContainer}
        onClick={() => navigate("/dashboard/menu")}
      >
        <button className={styles.newButton}>Volver</button>
      </div>

      <h1>Crear menú</h1>

      <form onSubmit={handleSubmit(createMenu)}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nombre del menú"
            {...register("name")}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? "Guardando..." : "Crear Menú"}
        </button>
      </form>
    </div>
  );
};

export default CreateMenu;
