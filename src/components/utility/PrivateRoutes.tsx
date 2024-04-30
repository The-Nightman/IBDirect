import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SpinnerStatus from "../UX/Spinner";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  const jwt = sessionStorage.getItem("jwt");
  let auth = false;
  if (user.userID && jwt) {
    auth = true;
  }
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <p className="animate-pulse absolute top-[45%] z-[100] text-2xl text-white">
          Checking User Authentication
        </p>
        <SpinnerStatus color="success" />
      </div>
    );
  }
  return <>{user && jwt ? <Outlet /> : <Navigate to={"/"} />}</>;
};
export default PrivateRoutes;
