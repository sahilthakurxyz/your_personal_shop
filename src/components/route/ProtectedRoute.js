import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ children, isAuthenticated, isAdmin, adminRoute }) => {
  if (adminRoute && !isAdmin) {
    console.log(isAdmin, "true");
    alert(
      "You're not Allowed for this Role & You Cannot Access Dashboard: For that Please Login As a Admin"
    );
    return <Navigate to="/account" />;
  }
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
