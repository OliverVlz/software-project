import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Heroes } from './pages/heroes/heroes';

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
        path: 'about',
        component: About
      },
      {
        path: 'heroes',
        component: Heroes
      }
    ]
  }
];
