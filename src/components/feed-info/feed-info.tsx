import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/store';
import { selectFeedOrders, selectFeed } from '../../slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useAppSelector(selectFeedOrders);
  const feedState = useAppSelector(selectFeed);

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  const feed = {
    total: feedState.total,
    totalToday: feedState.totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
