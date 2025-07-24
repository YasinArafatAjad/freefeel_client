import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loader from "../../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loader></Loader>;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/sign-in-with-email-address" state={{ from: location }} replace />;
};

export default PrivateRoute;
