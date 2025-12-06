import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();

  const isConstructorActive = location.pathname === '/';
  const isFeedActive = location.pathname.startsWith('/feed');
  const isProfileActive = location.pathname.startsWith('/profile');

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      isConstructorActive={isConstructorActive}
      isFeedActive={isFeedActive}
      isProfileActive={isProfileActive}
    />
  );
};
