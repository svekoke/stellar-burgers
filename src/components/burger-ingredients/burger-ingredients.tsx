import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector(selectIngredients);

  // === ВАЖНО: берём ингредиенты из конструктора ===
  const constructorItems = useAppSelector((state) => state.order.constructorItems);

  // === ФУНКЦИЯ ДЛЯ ПОДСЧЁТА КОЛИЧЕСТВА ===
  const getCount = (ingredient: TIngredient) => {
    // булка — всегда либо 1, либо 0
    if (ingredient.type === 'bun') {
      return constructorItems.bun?._id === ingredient._id ? 1 : 0;
    }

    // начинка/соус — считаем количество таких _id
    return constructorItems.ingredients.filter((item) => item._id === ingredient._id).length;
  };

  // === РАЗБИРАЕМ НА ГРУППЫ ===
  const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
  const mains = ingredients.filter((item: TIngredient) => item.type === 'main');
  const sauces = ingredients.filter((item: TIngredient) => item.type === 'sauce');

  // === ТАБЫ ===
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
  <BurgerIngredientsUI
    currentTab={currentTab}
    buns={buns}
    mains={mains}
    sauces={sauces}
    titleBunRef={titleBunRef}
    titleMainRef={titleMainRef}
    titleSaucesRef={titleSaucesRef}
    bunsRef={bunsRef}
    mainsRef={mainsRef}
    saucesRef={saucesRef}
    onTabClick={onTabClick}
  />
);
};
