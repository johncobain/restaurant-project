import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { Orders } from './pages/orders/orders';
import { Dishes } from './pages/dishes/dishes';
import { ClientDetail } from './pages/clients/client-detail/client-detail';
import { DishDetail } from './pages/dishes/dish-detail/dish-detail';
import { OrderDetail } from './pages/orders/order-detail/order-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },

  { path: 'clients', component: Clients },
  { path: 'clients/new', component: ClientDetail },
  { path: 'clients/:id', component: ClientDetail },
  { path: 'clients/:id/edit', component: ClientDetail },

  { path: 'dishes', component: Dishes },
  { path: 'dishes/new', component: DishDetail },
  { path: 'dishes/:id', component: DishDetail },
  { path: 'dishes/:id/edit', component: DishDetail },

  { path: 'orders', component: Orders },
  { path: 'orders/new', component: OrderDetail },
  { path: 'orders/:id', component: OrderDetail },
  { path: 'orders/:id/edit', component: OrderDetail },

  { path: '**', redirectTo: '' },
];
