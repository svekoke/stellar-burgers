import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAuthChecked } = useAppSelector(
    (state) => state.user
  );

  if (!isAuthChecked) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
};
