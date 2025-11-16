import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface SecureRouteProps {
  children?: ReactNode;
}

export const SecureRoute = ({ children }: SecureRouteProps) => {
  const location = useLocation();

  // Заглушка — позже заменим на реальную авторизацию
  const isAuth = false;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // если вызван как обёртка <SecureRoute>...</SecureRoute>
  if (children) {
    return <>{children}</>;
  }

  // если вызван через <Route element={<SecureRoute />}>
  return <Outlet />;
};
