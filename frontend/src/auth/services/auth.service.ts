import { UserLogin, UserRegister } from "@auth/interfaces/auth.interface";

const URI = "https://menuproject-backend-test.onrender.com";

export const authLogin = async (user: UserLogin) => {
  try {
    const response = await fetch(`${URI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    return {
      status: response.status,
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

    const data = await response.json();

    return {
      status: response.status,
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
