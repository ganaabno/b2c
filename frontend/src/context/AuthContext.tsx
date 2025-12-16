import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "CLIENT" | "MANAGER" | "ADMIN";
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  signupAsManager:(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const signupAsManager = async (
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
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...userData };
    });
  };

  // Auto-login on mount/refresh
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
        console.log(err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, updateUser, signupAsManager }}>
      {children}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
