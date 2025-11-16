import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import styles from "./app.module.css";

import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
} from "@pages";

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  SecureRoute,
} from "@components";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // используется для отображения модалки поверх предыдущей страницы
  const state = location.state as { background?: Location };

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />

      {/* ОСНОВНЫЕ РОУТЫ */}
      <Routes location={state?.background || location}>
        {/* публичные */}
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:number" element={<OrderInfo />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/ingredients/:id" element={<IngredientDetails />} />

        {/* защищённые маршруты */}
        <Route element={<SecureRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<ProfileOrders />} />
          <Route path="/profile/orders/:number" element={<OrderInfo />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {/* ===================== МОДАЛКИ ===================== */}
      {state?.background && (
        <Routes>
          {/* Ингредиент */}
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Описание ингредиента" onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />

          {/* Заказ в общей ленте */}
          <Route
            path="/feed/:number"
            element={
              <Modal title="Заказ" onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />

          {/* Заказ пользователя */}
          <Route
            path="/profile/orders/:number"
            element={
              <SecureRoute>
                <Modal title="Заказ" onClose={closeModal}>
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
