import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { DishService } from '../../../core/services/dish.service';
import { ClientDetails } from '../../../core/models/client.model';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Loading } from '../../../shared/components/loading/loading';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../../core/models/dish.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    Loading,
  ],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss',
})
export class ClientDetail implements OnInit {
  client: ClientDetails | null = null;
  dishes: Dish[] = [];
  clientId: number;

  constructor(
    private clientService: ClientService,
    private dishService: DishService,
    private router: Router
  ) {
    this.clientId = this.getClientIdFromRoute();
  }

  ngOnInit() {
    this.loadClient();
    this.loadDishes();
  }

  private getClientIdFromRoute(): number {
    const route = this.router.url.split('/');
    return +route[route.length - 1];
  }

  loadClient(): void {
    this.clientService.getByIdDetails(this.clientId).subscribe({
      next: (client) => {
        this.client = client;
      },
      error: (error) => {
        console.error('Error loading client details:', error);
      },
    });
  }

  loadDishes(): void {
    this.dishService.getAll().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/clients']);
  }

  getDishName(dishId: number): string | undefined {
    return this.dishes.find((dish) => dish.id === dishId)?.name;
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
