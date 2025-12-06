import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { createOrder, closeOrderModal } from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { constructorItems, orderRequest, orderModalData } = useAppSelector(
    (state) => state.order
  );

  const { isAuthenticated } = useAppSelector((state) => state.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(createOrder());
  };

  const closeOrderModalHandler = () => {
    dispatch(closeOrderModal());
  };

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
