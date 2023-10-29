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
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./home/products/products.component').then(
            (m) => m.ProductsComponent,
          ),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./home/inventory/inventory.component').then(
            (m) => m.InventoryComponent,
          ),
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('./home/sales/sales.component').then((m) => m.SalesComponent),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
