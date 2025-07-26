import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { Orders } from './pages/orders/orders';
import { Dishes } from './pages/dishes/dishes';
import { ClientDetail } from './pages/clients/client-detail/client-detail';
import { DishDetail } from './pages/dishes/dish-detail/dish-detail';
import { ClientCreateOrEdit } from './pages/clients/client-create-or-edit/client-create-or-edit';
import { DishCreateOrEdit } from './pages/dishes/dish-create-or-edit/dish-create-or-edit';
import { OrderCreateOrEdit } from './pages/orders/order-create-or-edit/order-create-or-edit';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', redirectTo: '' },

  { path: 'clients', component: Clients },
  { path: 'clients/new', component: ClientCreateOrEdit },
  { path: 'clients/:id', component: ClientDetail },
  { path: 'clients/:id/edit', component: ClientCreateOrEdit },

  { path: 'dishes', component: Dishes },
  { path: 'dishes/new', component: DishCreateOrEdit },
  { path: 'dishes/:id', component: DishDetail },
  { path: 'dishes/:id/edit', component: DishCreateOrEdit },

  { path: 'orders', component: Orders },
  { path: 'orders/new', component: OrderCreateOrEdit },
  { path: 'orders/:id/edit', component: OrderCreateOrEdit },

  { path: '**', redirectTo: '' },
];
