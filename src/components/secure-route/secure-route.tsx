import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

interface SecureRouteProps {
  children?: ReactNode;
}

export const SecureRoute = ({ children }: SecureRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useAppSelector(
    (state) => state.user
  );

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
