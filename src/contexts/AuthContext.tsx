import { createContext, useContext, useState, ReactNode } from "react";

type UserType = "student" | "landlord" | null;

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  login: (type?: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("dormlink-auth") === "true"
  );
  const [userType, setUserType] = useState<UserType>(
    () => (localStorage.getItem("dormlink-user-type") as UserType) || null
  );

  const login = (type: UserType = "student") => {
    localStorage.setItem("dormlink-auth", "true");
    localStorage.setItem("dormlink-user-type", type || "student");
    setIsLoggedIn(true);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem("dormlink-auth");
    localStorage.removeItem("dormlink-user-type");
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
