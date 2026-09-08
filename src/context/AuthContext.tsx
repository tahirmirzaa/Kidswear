import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface User {
  name: string;
  email: string;
  phone?: string;
}

interface Account extends User {
  password: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  updateProfile: (fields: Partial<User>) => void;
  resetPassword: (email: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// `account` is the persisted credential record (survives logout); `user` is
// just the current signed-in session, cleared on logout. This is still a
// fully client-side, localStorage-backed prototype with no real backend, but
// it now actually checks the password you registered with instead of
// accepting any input.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useLocalStorage<Account | null>("ta-account", null);
  const [user, setUser] = useLocalStorage<User | null>("ta-user", null);

  const login = (email: string, password: string) => {
    if (!account || account.email.toLowerCase() !== email.toLowerCase() || account.password !== password) {
      return false;
    }
    setUser({ name: account.name, email: account.email, phone: account.phone });
    return true;
  };

  const register = (name: string, email: string, password: string) => {
    setAccount({ name, email, password });
    setUser({ name, email });
  };

  const logout = () => setUser(null);

  const updateProfile = (fields: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...fields } : prev));
    setAccount((prev) => (prev ? { ...prev, ...fields } : prev));
  };

  const resetPassword = (email: string, newPassword: string) => {
    if (!account || account.email.toLowerCase() !== email.toLowerCase()) return false;
    setAccount({ ...account, password: newPassword });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
