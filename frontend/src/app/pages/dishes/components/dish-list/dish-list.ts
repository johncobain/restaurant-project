import { DishService } from './../../../../core/services/dish.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Dish } from '../../../../core/models/dish.model';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dish-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './dish-list.html',
  styleUrl: './dish-list.scss',
})
export class DishList {
  @Input() dishes: Dish[] = [];

  @Output() dishUpdated = new EventEmitter<Dish>();
  @Output() dishDeleted = new EventEmitter<number>();

  constructor(
    private dishService: DishService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  formatCreatedDate(date: string | Date): string {
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

  deleteDish(dish: Dish): void {
    if (confirm(`Tem certeza que deseja excluir o prato "${dish.name}"?`)) {
      this.dishService.delete(dish.id!).subscribe({
        next: () => {
          this.dishDeleted.emit(dish.id!);

          this.snackBar.open('Prato excluído com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Erro ao excluir prato:', error);
          this.snackBar.open('Erro ao excluir prato', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  editDish(dish: Dish): void {
    this.router.navigate(['/dishes', dish.id, 'edit']);
  }

  viewDish(dish: Dish): void {
    this.router.navigate(['/dishes', dish.id]);
  }
}
