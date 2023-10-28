import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((mod) => mod.HomeComponent),
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
