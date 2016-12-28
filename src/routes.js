import Board from './components/Board';
import UserPalettes from './components/UserPalettes';
import PublicPalettes from './components/PublicPalettes';
import PopularPalettes from './components/PopularPalettes';

import Auth from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export default [
  {
    path: '',
    component: Board,
  },
  {
    path: '/my-palettes',
    component: UserPalettes,
  },
  {
    path: '/public',
    component: PublicPalettes,
  },
  {
    path: '/popular',
    component: PopularPalettes,
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
