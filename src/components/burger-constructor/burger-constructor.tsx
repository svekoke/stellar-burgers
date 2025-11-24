import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, closeOrderModal } from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // данные из orderSlice
  const { constructorItems, orderRequest, orderModalData } = useAppSelector(
    (state) => state.order
  );

  // данные из userSlice
  const { isAuthenticated } = useAppSelector((state) => state.user);

  // КНОПКА "ОФОРМИТЬ ЗАКАЗ"
  const onOrderClick = () => {
    // нельзя без булки
    if (!constructorItems.bun || orderRequest) return;

    // если не авторизован то на логин
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(createOrder());
  };

  // закрытие модалки заказа
  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

  // ПОДСЧЁТ ЦЕНЫ
  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TIngredient) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModalHandler}
    />
  );
};
