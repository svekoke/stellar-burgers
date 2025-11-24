import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAppSelector } from '../../services/store';

interface SecureRouteProps {
  children?: ReactNode;
}

export const SecureRoute = ({ children }: SecureRouteProps) => {
  const location = useLocation();

  const { isAuthenticated, isAuthChecked } = useAppSelector(
    (state) => state.user
  );

  // ответ getUser
  if (!isAuthChecked) return null;

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (children) return <>{children}</>;

  return <Outlet />;
};
