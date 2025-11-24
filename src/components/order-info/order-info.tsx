import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { selectFeedOrders } from '../../slices/feedSlice';
import { selectProfileOrders } from '../../slices/profileOrdersSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const ingredients: TIngredient[] = useAppSelector(selectIngredients);
  const feedOrders: TOrder[] = useAppSelector(selectFeedOrders);
  const profileOrders: TOrder[] = useAppSelector(selectProfileOrders);

  const orderData = useMemo(() => {
    const allOrders = [...feedOrders, ...profileOrders];
    return allOrders.find((order) => order.number === Number(number)) || null;
  }, [feedOrders, profileOrders, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
