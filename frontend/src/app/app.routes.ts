import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Clients } from './pages/clients/clients';
import { Orders } from './pages/orders/orders';
import { Dishes } from './pages/dishes/dishes';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'clients',
    component: Clients,
  },
  {
    path: 'orders',
    component: Orders,
  },
  {
    path: 'dishes',
    component: Dishes,
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
