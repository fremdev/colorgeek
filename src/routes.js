import UserPalettes from './components/UserPalettes';
import PublicPalettes from './components/PublicPalettes';
import PickedPalettes from './components/PickedPalettes';
import PopularPalettes from './components/PopularPalettes';
import CreatePalette from './components/CreatePalette';

import Auth from './components/auth/Auth';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import About from './components/About';

export default [
  {
    path: '',
    redirect: '/popular',
  },
  {
    path: '/my-palettes',
    component: UserPalettes,
    meta: { requiresAuth: true },
  },
  {
    path: '/public',
    component: PublicPalettes,
  },
  {
    path: '/picked',
    component: PickedPalettes,
  },
  {
    path: '/popular',
    component: PopularPalettes,
  },
  {
    path: '/create',
    component: CreatePalette,
  },
  {
    path: '/about',
    component: About,
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
