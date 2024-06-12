import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'orders',
                loadComponent: () => import('./pages/orders/orders.component').then(mod => mod.OrdersComponent)
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products.component').then(mod => mod.ProductsComponent)
            },
            {
                path: 'category',
                loadComponent: () => import('./pages/category/category.component').then(mod => mod.CategoryComponent)
            },
            {
                path: 'brands',
                loadComponent: () => import('./pages/brand/brand.component').then(mod => mod.BrandComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('./pages/users/users.component').then(mod => mod.UsersComponent)
            },
            {
                path: 'customers',
                loadComponent: () => import('./pages/customers/customers.component').then(mod => mod.CustomersComponent)
            },
        ]
    }
];
