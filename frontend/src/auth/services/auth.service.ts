import { UserLogin, UserRegister } from "@auth/interfaces/auth.interface";

export const URI = "https://menuproject-backend-test.onrender.com";

export const authLogin = async (user: UserLogin) => {
  try {
    const response = await fetch(`${URI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: response.status, // return status 400
        data: errorData.message || { message: "Credenciales Incorrectas" },
      };
    }

    const data = await response.json();
    return {
      status: response.status, // return status 200
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: { message: "Error interno del servidor" },
    };
  }
};

export const authRegister = async (user: UserRegister) => {
  try {
    const response = await fetch(`${URI}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la solicitud: ", errorData);
      return {
        status: response.status, // return status 400
        data:  errorData.message || { message: "Error en la solicitud" },
      };
    }
    return {
      status: response.status, // return status 201
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      data: { message: "Error interno del servidor" },
    };
  }
};
