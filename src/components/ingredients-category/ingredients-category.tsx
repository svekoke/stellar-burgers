import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // ингредиенты из конструктора
  const constructorItems = useAppSelector(
    (state) => state.order.constructorItems
  );

  // СЧЁТЧИКИ КОЛИЧЕСТВА
  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    // начинка/соусы
    constructorItems.ingredients.forEach((item: TIngredient) => {
      counters[item._id] = (counters[item._id] || 0) + 1;
    });

    // булка — всегда 2
    if (constructorItems.bun) {
      counters[constructorItems.bun._id] = 2;
    }

    return counters;
  }, [constructorItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
