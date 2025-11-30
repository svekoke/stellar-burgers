import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useAppSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../slices/ingredientsSlice';

import { TIngredient } from '../../utils/types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ingredients = useAppSelector(selectIngredients);
  const loading = useAppSelector(selectIngredientsLoading);

  if (loading || !ingredients.length) {
    return <Preloader />;
  }

  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  if (!ingredient) {
    navigate('/not-found', { replace: true });
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};
