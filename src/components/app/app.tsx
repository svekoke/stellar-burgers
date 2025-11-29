import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { getUser } from '../../slices/userSlice';

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

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // модалки
  const state = location.state as { background?: Location };
  const closeModal = () => navigate(-1);

  // === ИСПРАВЛЕНИЕ ОШИБКИ: не дёргаем getUser без refreshToken ===
  useEffect(() => {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route element={<SecureRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* модалки */}
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
