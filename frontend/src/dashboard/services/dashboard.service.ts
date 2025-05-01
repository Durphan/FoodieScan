import { URI } from "@auth/services/auth.service";
import { Business, Menu } from "@dashboard/interfaces/dashboard.interface";

export const getAllBusinesses = async () => {
  const userToken = localStorage.getItem("token");
  if (!userToken) {
    return {
      status: 401,
      data: { message: "Token no encontrado" },
    };
  }

  try {
    const response = await fetch(`${URI}/api/business/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: response.status, //return status 400
        data: errorData.message || { message: "Error en la solicitud" },
      };
    }

    const data = await response.json();
    return {
      status: response.status, //return status 202
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

export const createMenu = async (menu: Menu) => {
  const userToken = localStorage.getItem("token");
  if (!userToken) {
    return {
      status: 401,
      data: { message: "Token no encontrado" },
    };
  }

  try {
    const response = await fetch(`${URI}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(menu),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error en la solicitud: ", errorData);
      return {
        status: response.status, //return status 403
        data: errorData.message || { message: "Error en la solicitud" },
      };
    }

    const data = await response.json();
    return {
      status: response.status, //return status 202
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

export const createBusiness = async (business: Business) => {
  const userToken = localStorage.getItem("token");
  if (!userToken) {
    return {
      status: 401,
      data: { message: "Token no encontrado" },
    };
  }

  try {
    const response = await fetch(`${URI}/api/business/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(business),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error en la solicitud: ", errorData);
      return {
        status: response.status, // return status 403
        data: errorData.message || { message: "Error en la solicitud" },
      };
    }
    const data = await response.json();
    return {
      status: response.status, //return status 202
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
