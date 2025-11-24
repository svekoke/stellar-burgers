import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import { fetchFeedThunk, selectFeedOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(fetchFeedThunk());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeedThunk())} />
  );
};
