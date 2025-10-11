import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home/home';
import { Heroes } from './pages/heroes/heroes';
import { Combat } from './pages/combat/combat';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'heroes',
        component: Heroes
      },
      {
        path: 'combat',
        component: Combat
      }
    ]
  }
];
