import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ClientService } from '../../core/services/client.service';
import { DishService } from '../../core/services/dish.service';
import { OrderService } from '../../core/services/order.service';
import { Client } from '../../core/models/client.model';
import { Dish } from '../../core/models/dish.model';
import { Order } from '../../core/models/order.model';
import { Loading } from '../../shared/components/loading/loading';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    Loading,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  clients: Client[] = [];
  dishes: Dish[] = [];
  orders: Order[] = [];
  loading = false;

  constructor(
    private clientService: ClientService,
    private dishService: DishService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    forkJoin({
      clients: this.clientService.getAll(),
      dishes: this.dishService.getAll(),
      orders: this.orderService.getAll(),
    }).subscribe({
      next: ({ clients, dishes, orders }) => {
        this.clients = clients;
        this.dishes = dishes;

        this.orders = orders.map((order) => ({
          ...order,
          client: clients.find((client) => client.id === order.clientId),
          dish: dishes.find((dish) => dish.id === order.dishId),
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.snackBar.open('Erro ao carregar dados', 'Fechar', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  getActiveClients(): number {
    return this.clients.filter((client) => client.active !== false).length;
  }

  getUniqueCategories(): number {
    const categories = new Set(this.dishes.map((dish) => dish.category));
    return categories.size;
  }

  getPendingOrders(): number {
    return this.orders.filter((order) => !order.attended).length;
  }

  getRecentOrders(): Order[] {
    return this.orders
      .sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  }

  openClientForm(): void {
    this.router.navigate(['/clients/new']);
  }

  openDishForm(): void {
    this.router.navigate(['/dishes/new']);
  }

  openOrderForm(): void {
    this.router.navigate(['/orders/new']);
  }

  markAsAttended(orderId: number): void {
    this.orderService.attend(orderId).subscribe({
      next: () => {
        this.snackBar.open('Pedido marcado como atendido!', 'Fechar', {
          duration: 3000,
        });
        this.loadData();
      },
      error: (error) => {
        console.error('Erro ao marcar pedido:', error);
        this.snackBar.open('Erro ao marcar pedido', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  markAsUnattended(orderId: number): void {
    this.orderService.unattend(orderId).subscribe({
      next: () => {
        this.snackBar.open('Pedido marcado como não atendido!', 'Fechar', {
          duration: 3000,
        });
        this.loadData();
      },
      error: (error) => {
        console.error('Erro ao desmarcar pedido:', error);
        this.snackBar.open('Erro ao desmarcar pedido', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }
}
