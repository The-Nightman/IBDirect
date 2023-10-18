import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();
  const jwt = sessionStorage.getItem("jwt");
  let auth = false;
  if (user.userID && jwt) {
    auth = true;
  } else {
    auth = false;
  }
  return <>{auth ? <Outlet /> : <Navigate to={"/"}/>}</>;
};
export default PrivateRoutes;
