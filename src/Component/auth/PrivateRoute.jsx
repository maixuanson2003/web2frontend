import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authenticate = localStorage.getItem("token");
  if (!authenticate) {
    localStorage.removeItem("token");
    return <Navigate to={"/login"} />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
