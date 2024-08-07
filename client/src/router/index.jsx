import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../pages/MainLayout';
import HomePage from '../pages/HomePage';
import SubscribesPage from '../pages/SubscribesPage';
import ProfilePage from '../pages/ProfilePage';
import RecommendationPage from '../pages/RecommendationPage';

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
        path: '',
        element: <HomePage />,
      },
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
    ],
  },
]);

export default router;
