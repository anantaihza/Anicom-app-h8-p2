import { createBrowserRouter, redirect } from 'react-router-dom';
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
    loader: () => {
      if (localStorage.access_token) {
        return redirect('/');
      }
      return null;
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect('/');
      }
      return null;
    },
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/my-subscribes',
        element: <SubscribesPage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '/recommendation',
        element: <RecommendationPage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '',
        element: <HomePage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '/:id',
        element: <DetailPage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/login');
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
