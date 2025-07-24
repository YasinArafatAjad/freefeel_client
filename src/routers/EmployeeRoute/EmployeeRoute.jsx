import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import Loader from "../../components/Loader/Loader";
import useEmployee from "../../hooks/useEmployee/useEmployee";

const EmployeeRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isEmployee, isEmployeeLoading } = useEmployee();
  const location = useLocation();

  if (loading || isEmployeeLoading) {
    return <Loader></Loader>;
  }

  if (user && isEmployee) {
    return children;
  }

  return <Navigate state={location?.pathname} to="/" replace></Navigate>;
};

export default EmployeeRoute;
