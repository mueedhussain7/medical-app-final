import { Navigate } from "react-router-dom";

const ReRoute = ({children}) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/appointments" replace />;
  }
  return children;
};
export default ReRoute;