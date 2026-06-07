import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import * as authService from "../services/authService";
import { getStoredToken, getStoredUser } from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [storedToken, storedUser] = await Promise.all([getStoredToken(), getStoredUser()]);
        setToken(storedToken);
        setUser(storedUser);
      } catch (error) {
        setToken(null);
        setUser(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  async function signIn(username, password) {
    try {
      const session = await authService.login(username, password);
      setToken(session.token);
      setUser(session.user);
      return session;
    } catch (error) {
      throw error;
    } finally {
    }
  }

  async function signOut() {
    try {
      await authService.logout();
      setToken(null);
      setUser(null);
    } catch (error) {
      throw error;
    } finally {
    }
  }

  const value = useMemo(
    () => ({
      isBootstrapping,
      token,
      user,
      signIn,
      signOut
    }),
    [isBootstrapping, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
