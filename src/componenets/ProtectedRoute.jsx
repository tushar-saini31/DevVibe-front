// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo); // adjust based on your user slice
  if (!user) {
    return <Navigate to="/login" replace />; // redirect to login if not logged in
  }
  return children;
};

export default ProtectedRoute;
