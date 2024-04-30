import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtDecode from "jwt-decode";

interface User {
  userID: number | null;
  role: number | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  user: User;
  login: (jwt: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({ userID: null, role: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    setTimeout(() => {
      if (jwt) {
        const decodedToken: { exp: number; sub: number; role: number } =
          jwtDecode(jwt);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({ userID: decodedToken.sub, role: decodedToken.role });
        } else {
          sessionStorage.removeItem("jwt");
        }
      }
      setLoading(false);
    }, 1000);
  }, []);

  const login = (jwt: string) => {
    sessionStorage.setItem("jwt", jwt);
    const decodedToken: { exp: number; sub: number; role: number } =
      jwtDecode(jwt);
    setUser({ userID: decodedToken.sub, role: decodedToken.role });
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setUser({ userID: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextInterface;
};
