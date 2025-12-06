import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';

import {
  fetchFeedThunk,
  selectFeed,
  selectFeedOrders
} from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector(selectFeedOrders);
  const { loading } = useAppSelector(selectFeed);

  useEffect(() => {
    dispatch(fetchFeedThunk());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeedThunk())} />
  );
};
