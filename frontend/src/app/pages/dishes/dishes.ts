import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { DishService } from '../../core/services/dish.service';
import { Dish } from '../../core/models/dish.model';
import { Loading } from '../../shared/components/loading/loading';
import { DishList } from './components/dish-list/dish-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dishes',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
    DishList,
  ],
  templateUrl: './dishes.html',
  styleUrl: './dishes.scss',
})
export class Dishes implements OnInit {
  dishes: Dish[] = [];
  loading = true;

  constructor(
    private dishService: DishService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getAll().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dishes:', error);
        this.snackBar.open('Erro ao carregar pratos', 'Fechar', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  getUniqueCategories(): number {
    const categories = new Set(this.dishes.map((dish) => dish.category));
    return categories.size;
  }

  onDishUpdated(updatedDish: Dish): void {
    const index = this.dishes.findIndex((d) => d.id === updatedDish.id);
    if (index !== -1) {
      this.dishes[index] = updatedDish;
    }
  }

  onDishDeleted(dishId: number): void {
    this.dishes = this.dishes.filter((d) => d.id !== dishId);
  }
}
