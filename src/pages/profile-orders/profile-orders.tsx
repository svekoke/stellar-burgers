import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import {
  fetchProfileOrdersThunk,
  selectProfileOrders
} from '../../slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(fetchProfileOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
