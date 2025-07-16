import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';
import { Dish } from '../../core/models/dish.model';
import { DishService } from '../../core/services/dish.service';
import { Loading } from '../../shared/components/loading/loading';
import { forkJoin } from 'rxjs';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-home',
  imports: [Loading],
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
    private orderService: OrderService
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
        this.loading = false;
      },
    });
  }
}
