import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      onConstructorClick={() => navigate('/')}
      onFeedClick={() => navigate('/feed')}
      onProfileClick={() => navigate('/profile')}
      isConstructorActive={location.pathname === '/'}
      isFeedActive={location.pathname.startsWith('/feed')}
      isProfileActive={location.pathname.startsWith('/profile')}
    />
  );
};
