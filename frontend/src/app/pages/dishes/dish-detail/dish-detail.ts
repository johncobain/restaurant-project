import { Dish } from './../../../core/models/dish.model';
import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../core/services/dish.service';
import { ClientService } from '../../../core/services/client.service';
import { DishDetails } from '../../../core/models/dish.model';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Loading } from '../../../shared/components/loading/loading';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Client } from '../../../core/models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    Loading,
  ],
  templateUrl: './dish-detail.html',
  styleUrl: './dish-detail.scss',
})
export class DishDetail implements OnInit {
  dish: DishDetails | null = null;
  Clients: Client[] = [];
  dishId: number;

  constructor(
    private dishService: DishService,
    private clientService: ClientService,
    private router: Router
  ) {
    this.dishId = this.getDishIdFromRoute();
  }

  ngOnInit() {
    this.loadDish();
    this.loadClients();
  }

  private getDishIdFromRoute(): number {
    const route = this.router.url.split('/');
    return +route[route.length - 1];
  }

  loadDish(): void {
    this.dishService.getByIdDetails(this.dishId).subscribe({
      next: (dish) => {
        this.dish = dish;
      },
      error: (error) => {
        console.error('Error loading dish details:', error);
      },
    });
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.Clients = clients;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/dishes']);
  }

  getClientName(clientId: number): string | undefined {
    return this.Clients.find((client) => client.id === clientId)?.name;
  }

  formatDate(date: any): string {
    if (!date) return '';

    try {
      const dateObj = new Date(date);

      if (isNaN(dateObj.getTime())) {
        return 'Data inválida';
      }

      return dateObj.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data de criação:', error);
      return 'Data inválida';
    }
  }
}
