import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import { removeIngredient, moveIngredient } from '../../slices/orderSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleMoveUp = () => {
      if (index <= 0) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index)); // <<<<< ФИКС
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
