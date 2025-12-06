import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { logoutUser } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login', { replace: true });
      })
      .catch(() => {});
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
