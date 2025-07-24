import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin/useAdmin";
import Loader from "../../components/Loader/Loader";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const { isAdmin, isAdminLoading } = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader></Loader>;
  }

  if (user?.email && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
