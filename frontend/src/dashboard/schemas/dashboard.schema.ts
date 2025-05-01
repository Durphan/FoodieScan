import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
});

export const restaurantSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  phoneNumber: z.string().min(7, "El teléfono debe tener al menos 7 dígitos."),
  email: z.string().email("Debe ser un correo válido."),
});