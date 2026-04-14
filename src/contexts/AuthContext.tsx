import { createContext, useContext, useState, ReactNode } from "react";

type UserType = "student" | "landlord" | null;

const ADMIN_EMAILS = [
  "admin@dormlink.com",
  "superadmin@dormlink.com",
];

interface AuthContextType {
  isLoggedIn: boolean;
  userType: UserType;
  isAdmin: boolean;
  userEmail: string | null;
  login: (type?: UserType, email?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userType: null,
  isAdmin: false,
  userEmail: null,
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
  const [userEmail, setUserEmail] = useState<string | null>(
    () => localStorage.getItem("dormlink-email") || null
  );

  const isAdmin = ADMIN_EMAILS.includes(userEmail?.toLowerCase() || "");

  const login = (type: UserType = "student", email?: string) => {
    localStorage.setItem("dormlink-auth", "true");
    localStorage.setItem("dormlink-user-type", type || "student");
    if (email) localStorage.setItem("dormlink-email", email);
    setIsLoggedIn(true);
    setUserType(type);
    if (email) setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("dormlink-auth");
    localStorage.removeItem("dormlink-user-type");
    localStorage.removeItem("dormlink-email");
    setIsLoggedIn(false);
    setUserType(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, isAdmin, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
