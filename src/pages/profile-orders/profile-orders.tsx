import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders: any[] = []; // временно пусто

  return <ProfileOrdersUI orders={orders} />;
};
