import { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchIngredientsThunk,
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const loading = useAppSelector(selectIngredientsLoading);

  //  загружаем если нет ингредиентов
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredientsThunk());
    }
  }, [ingredients.length, dispatch]);

  // лоадер
  if (loading || !ingredients.length) {
    return <Preloader />;
  }

  // поиск ингредиента
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  // ошибка
  if (!ingredient) {
    navigate('/not-found', { replace: true });
    return null;
  }

  // данные
  return <IngredientDetailsUI ingredientData={ingredient} />;
};
