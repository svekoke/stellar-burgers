import { FC, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';

import { useAppDispatch, useAppSelector } from '../../services/store';

import { TIngredient, TOrder } from '@utils-types';

import {
  selectIngredients,
  fetchIngredientsThunk
} from '../../slices/ingredientsSlice';
import { selectFeedOrders, fetchFeedThunk } from '../../slices/feedSlice';
import {
  selectProfileOrders,
  fetchProfileOrdersThunk
} from '../../slices/profileOrdersSlice';

import {
  fetchOrderByNumberThunk,
  selectOrderByNumber
} from '../../slices/ordersFeedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const orderNum = Number(number);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const ingredients = useAppSelector(selectIngredients);
  const feedOrders = useAppSelector(selectFeedOrders);
  const profileOrders = useAppSelector(selectProfileOrders);
  const orderByNumber = useAppSelector(selectOrderByNumber);

  const isProfileRoute = location.pathname.startsWith('/profile');

  // === Загружаем всё, чего нет ===
  useEffect(() => {
    if (!ingredients.length) dispatch(fetchIngredientsThunk());

    const existsInFeed = feedOrders.some((o: TOrder) => o.number === orderNum);
    const existsInProfile = profileOrders.some(
      (o: TOrder) => o.number === orderNum
    );

    if (!existsInFeed && !existsInProfile && !orderByNumber) {
      if (isProfileRoute) {
        dispatch(fetchProfileOrdersThunk());
      } else {
        dispatch(fetchFeedThunk());
      }

      dispatch(fetchOrderByNumberThunk(orderNum));
    }
  }, [
    orderNum,
    feedOrders,
    profileOrders,
    orderByNumber,
    ingredients.length,
    dispatch,
    isProfileRoute
  ]);

  // === Берём заказ из всех возможных источников ===
  const orderData: TOrder | null =
    feedOrders.find((o: TOrder) => o.number === orderNum) ||
    profileOrders.find((o: TOrder) => o.number === orderNum) ||
    orderByNumber ||
    null;

  // === Формирование UI-данных ===
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: Record<string, TIngredient & { count: number }>, id: string) => {
        const ing = ingredients.find((i: TIngredient) => i._id === id);
        if (ing) {
          acc[id] = acc[id]
            ? { ...acc[id], count: acc[id].count + 1 }
            : { ...ing, count: 1 };
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, ing) => sum + ing.price * ing.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
