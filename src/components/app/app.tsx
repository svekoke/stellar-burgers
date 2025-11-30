import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { getUser } from '../../slices/userSlice';
import { fetchIngredientsThunk } from '../../slices/ingredientsSlice';

import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  SecureRoute
} from '@components';

import { PublicRoute } from '../public-route/public-route';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // background хранит предыдущую страницу — используется для модалок
  const state = location.state as { background?: Location };

  // Умное закрытие модального окна
  const closeModal = () => {
    if (state?.background) {
      // Если модалка открыта как модалка — вернуться назад
      navigate(-1);
    } else {
      // Если страница открыта напрямую — перейти на нужный список
      if (location.pathname.startsWith('/profile/orders/')) {
        navigate('/profile/orders');
      } else if (location.pathname.startsWith('/feed/')) {
        navigate('/feed');
      } else if (location.pathname.startsWith('/ingredients/')) {
        navigate('/');
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) dispatch(getUser());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* Основные роуты */}
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* PUBLIC ROUTES */}
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* SECURE ROUTES */}
        <Route element={<SecureRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* МОДАЛКИ */}
      {state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Описание ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal title='Заказ' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <SecureRoute>
                <Modal title='Заказ' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              </SecureRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
