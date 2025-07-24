import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider/AuthProvider";
import Loader from "../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  // Using React Query to fetch user data based on their email
  const { isPending: isUserDataLoading, data } = useQuery({
    queryKey: [user?.email, "userData"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/getUserByEmail/${user?.email}`);
      return res?.data && res?.data?.data;
    },
  });

  // Show a loading if the authentication or user data is still loading
  if (loading || isUserDataLoading) {
    return <Loader />;
  }

  // Extract allowed routes from the fetched user data
  const allowedRoutes = data.components || [];

  // Get the current route the user is trying to visit
  const currentRoute = location?.pathname;

  // Function to check if the current route matches any allowed route (including dynamic routes)
  const hasAccess = (currentRoute) => {
    // Check if the current route matches any of the allowed routes
    return allowedRoutes.some((route) => {
      // Replace ':id' with a regular expression that matches MongoDB ObjectId pattern
      const routePattern = route.replace(/:id/g, "[a-f0-9]{24}");
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(currentRoute); // Test if currentRoute matches the pattern
    });
  };

  // This hasAccess for without any dynamic route
  //   const hasAccess = allowedRoutes?.includes(currentRoute);

  // If the user has access to the current route, render the children (protected content)
  if (user?.email && hasAccess(currentRoute)) {
    return children;
  }

  // If the user doesn't have access or the data isn't available, redirect to the home page
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
