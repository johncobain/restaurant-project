import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order.model';
import { Loading } from '../../shared/components/loading/loading';
import { Client } from '../../core/models/client.model';
import { Dish } from '../../core/models/dish.model';
import { ClientService } from '../../core/services/client.service';
import { DishService } from '../../core/services/dish.service';

@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  orders: Order[] = [];
  clients: Client[] = [];
  dishes: Dish[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private clientService: ClientService,
    private dishService: DishService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
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

  getRecentOrders(): Order[] {
    return this.orders
      .sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  }

  getPendingOrdersCount(): number {
    return this.orders.filter((order) => !order.attended).length;
  }

  addOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  editOrder(order: Order): void {
    this.router.navigate(['/orders', order.id, 'edit']);
  }

  removeOrder(order: Order): void {
    if (confirm(`Deseja remover o pedido #${order.id}?`)) {
      this.orderService.delete(order.id!).subscribe({
        next: () => {
          this.snackBar.open('Pedido removido com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.loadData();
        },
        error: (error) => {
          console.error('Erro ao remover pedido:', error);
          this.snackBar.open('Erro ao remover pedido', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  markAsAttended(order: Order): void {
    this.orderService.attend(order.id!).subscribe({
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

  markAsUnattended(order: Order): void {
    this.orderService.unattend(order.id!).subscribe({
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
  getClientName(order: Order): string {
    return order.client?.name ?? `#${order.clientId}`;
  }

  getDishName(order: Order): string {
    return order.dish?.name ?? `#${order.dishId}`;
  }
}
