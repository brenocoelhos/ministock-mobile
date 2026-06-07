import axios from "axios";

import { getStoredToken, removeToken, removeUser } from "./storage";

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000
});

api.interceptors.request.use(
  async (config) => {
    const token = await getStoredToken();

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new ApiError("Tempo de resposta excedido. Tente novamente.", "timeout", error)
      );
    }

    const status = error.response?.status;

    if (status === 401) {
      await removeToken();
      await removeUser();
      return Promise.reject(new ApiError("Sessao expirada. Faca login novamente.", 401, error));
    }

    if (status === 404) {
      return Promise.reject(new ApiError("Recurso nao encontrado.", 404, error));
    }

    if (status >= 500) {
      return Promise.reject(
        new ApiError("Servidor indisponivel no momento. Tente mais tarde.", status, error)
      );
    }

    return Promise.reject(
      new ApiError(
        error.response?.data?.message || "Nao foi possivel concluir a solicitacao.",
        status || "network",
        error
      )
    );
  }
);

export default api;
