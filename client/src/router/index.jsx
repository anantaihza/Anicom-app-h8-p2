import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../pages/MainLayout';
import HomePage from '../pages/HomePage';
import SubscribesPage from '../pages/SubscribesPage';
import ProfilePage from '../pages/ProfilePage';
import RecommendationPage from '../pages/RecommendationPage';
import DetailPage from '../pages/DetailPage';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/my-subscribes',
        element: <SubscribesPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/recommendation',
        element: <RecommendationPage />,
      },
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: '/:id',
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
