import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DishService } from '../../../core/services/dish.service';
import { Dish } from '../../../core/models/dish.model';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-dish-create-or-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    Loading,
  ],
  templateUrl: './dish-create-or-edit.html',
  styleUrl: './dish-create-or-edit.scss',
})
export class DishCreateOrEdit implements OnInit {
  dishForm: FormGroup;
  isEditMode = false;
  dishId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.dishForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.dishId = +id;
        this.loadDish(this.dishId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      category: ['', [Validators.required]],
    });
  }

  loadDish(id: number): void {
    this.loading = true;

    this.dishService.getById(id).subscribe({
      next: (dish) => {
        this.dishForm.patchValue({
          name: dish.name,
          description: dish.description,
          price: dish.price,
          category: dish.category,
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar prato:', error);
        this.snackBar.open('Erro ao carregar dados do prato', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/dishes']);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.dishForm.valid) {
      this.saving = true;

      const formData = this.dishForm.value;
      const dishData: Partial<Dish> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        category: formData.category,
      };

      const operation = this.isEditMode
        ? this.dishService.update(this.dishId!, dishData)
        : this.dishService.create(dishData as Dish);

      operation.subscribe({
        next: (dish) => {
          const message = this.isEditMode
            ? 'Prato atualizado com sucesso!'
            : 'Prato cadastrado com sucesso!';

          this.snackBar.open(message, 'Fechar', { duration: 3000 });
          this.router.navigate(['/dishes']);
        },
        error: (error) => {
          console.error('Erro ao salvar prato:', error);

          let errorMessage = 'Erro ao salvar prato';
          if (error.error?.message) {
            errorMessage = error.error.message;
          }

          this.snackBar.open(errorMessage, 'Fechar', { duration: 3000 });
          this.saving = false;
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/dishes']);
  }

  onPriceInput(event: any): void {
    const value = event.target.value.replace(/\D/g, '');
    const formatted = this.formatPriceInput(value);
    this.dishForm.patchValue({ price: formatted });
  }

  private formatPriceInput(value: string): string {
    if (!value) return '';
    const numberValue = parseFloat(value) / 100;
    return numberValue.toFixed(2);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.dishForm.controls).forEach((key) => {
      const control = this.dishForm.get(key);
      control?.markAsTouched();
    });
  }

  get name() {
    return this.dishForm.get('name');
  }

  get description() {
    return this.dishForm.get('description');
  }

  get price() {
    return this.dishForm.get('price');
  }

  get category() {
    return this.dishForm.get('category');
  }

  getNameError(): string {
    if (this.name?.hasError('required')) return 'Nome é obrigatório';
    if (this.name?.hasError('minlength'))
      return 'Nome deve ter pelo menos 3 caracteres';
    if (this.name?.hasError('maxlength'))
      return 'Nome deve ter no máximo 100 caracteres';
    return '';
  }

  getDescriptionError(): string {
    if (this.description?.hasError('required'))
      return 'Descrição é obrigatória';
    if (this.description?.hasError('maxlength'))
      return 'Descrição deve ter no máximo 500 caracteres';
    return '';
  }

  getPriceError(): string {
    if (this.price?.hasError('required')) return 'Preço é obrigatório';
    if (this.price?.hasError('pattern'))
      return 'Preço deve estar no formato 0.00';
    return '';
  }
}
