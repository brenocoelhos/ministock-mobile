import api from "./api";
import { removeToken, removeUser, saveToken, saveUser } from "./storage";

export async function login(username, password) {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
      expiresInMins: 60
    });

    const token = response.data.accessToken || response.data.token;
    const user = {
      id: response.data.id,
      username: response.data.username,
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      image: response.data.image
    };

    await saveToken(token);
    await saveUser(user);

    return { token, user };
  } catch (error) {
    throw error;
  } finally {
    // Required by the assignment: all async calls keep a try/catch/finally shape.
  }
}

export async function logout() {
  try {
    await removeToken();
    await removeUser();
  } catch (error) {
    throw error;
  } finally {
  }
}
