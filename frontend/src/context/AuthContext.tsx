import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add token to every request
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 → auto logout
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/", { replace: true }); // Optional: redirect on expired token
      }
      return Promise.reject(err);
    }
  );

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      throw error; // Let LoginForm handle error display
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/signup", {
        firstname,
        lastname,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      throw error; // Let SignupForm handle error
    } finally {
      setIsLoading(false);
    }
  };

  // FIXED: Logout now redirects to home!
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true }); // ← This is the magic!
  };

  // Auto-login on page load/refresh
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log("Auto-login failed:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate]); // Add navigate to deps (good practice)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
