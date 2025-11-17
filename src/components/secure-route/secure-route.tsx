import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAppSelector } from "../../services/store";

interface SecureRouteProps {
  children?: ReactNode;
}

export const SecureRoute = ({ children }: SecureRouteProps) => {
  const location = useLocation();

  const { isAuthenticated, isAuthChecked } = useAppSelector(
    (state) => state.user
  );

  // Ждём ответа getUser
  if (!isAuthChecked) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // если <SecureRoute>children</SecureRoute>
  if (children) return <>{children}</>;

  // если <Route element={<SecureRoute/>}>
  return <Outlet />;
};
