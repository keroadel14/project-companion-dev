import { useAuth } from "@/contexts/AuthContext";
import StudentProfile from "./StudentProfile";
import LandlordProfile from "./LandlordProfile";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isLoggedIn, userType } = useAuth();

  if (!isLoggedIn) return <Navigate to="/sign-in" replace />;

  return userType === "landlord" ? <LandlordProfile /> : <StudentProfile />;
};

export default Profile;
