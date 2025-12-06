import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { loginUser } from '../../slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, request, isAuthenticated } = useAppSelector(
    (state) => state.user
  );

  //  возвращать пользователя после логина
  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
