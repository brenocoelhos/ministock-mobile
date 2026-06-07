import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@MiniStock:token";
const USER_KEY = "@MiniStock:user";

export async function getStoredToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function saveToken(token) {
  return AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function removeToken() {
  return AsyncStorage.removeItem(TOKEN_KEY);
}

export async function getStoredUser() {
  const value = await AsyncStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : null;
}

export async function saveUser(user) {
  return AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function removeUser() {
  return AsyncStorage.removeItem(USER_KEY);
}
