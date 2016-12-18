import Board from './components/Board';

import Auth from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export default [
  {
    path: '',
    component: Board,
  },
  {
    path: '/auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        component: Login,
        meta: { requiresGuest: true },
      },
      {
        path: 'register',
        component: Register,
        meta: { requiresGuest: true },
      },
    ],
  },
  {
    path: '*',
    redirect: '/',
  },
];
