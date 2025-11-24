import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { updateUser } from '../../slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();

  // реальный пользователь
  const { user } = useAppSelector((state) => state.user);

  // стейт
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // useEffect
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // проверки
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  //  отправка
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  // cancel
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  // input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
