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
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  user: User;
  login: (jwt: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({ userID: null });

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");

    if (jwt) {
      const decodedToken: { exp: number; sub: number } = jwtDecode(jwt);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser({ userID: decodedToken.sub });
      } else {
        sessionStorage.removeItem("jwt");
      }
    }
  }, []);

  const login = (jwt: string) => {
    sessionStorage.setItem("jwt", jwt);
    const decodedToken: { exp: number; sub: number } = jwtDecode(jwt);
    setUser({ userID: decodedToken.sub });
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    setUser({ userID: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextInterface;
};
