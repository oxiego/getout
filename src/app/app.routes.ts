import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'items', loadComponent: () => import('./item/item.component').then(m => m.ItemComponent) },
  { path: 'categories', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'packlists', loadComponent: () => import('./packlist/packlist.component').then(m => m.PacklistComponent) }
];
