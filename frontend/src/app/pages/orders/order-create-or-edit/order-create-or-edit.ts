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
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { OrderService } from '../../../core/services/order.service';
import { ClientService } from '../../../core/services/client.service';
import { DishService } from '../../../core/services/dish.service';
import { Order, CreateOrderDto } from '../../../core/models/order.model';
import { Client } from '../../../core/models/client.model';
import { Dish } from '../../../core/models/dish.model';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-order-create-or-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    Loading,
  ],
  templateUrl: './order-create-or-edit.html',
  styleUrl: './order-create-or-edit.scss',
})
export class OrderCreateOrEdit implements OnInit {
  orderForm: FormGroup;
  clients: Client[] = [];
  dishes: Dish[] = [];
  isEditMode = false;
  orderId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private clientService: ClientService,
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      clientId: [null, Validators.required],
      dishId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadDishes();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.orderId = +id;
        this.loadOrder(this.orderId);
      }
    });
  }

  loadOrder(id: number): void {
    this.loading = true;
    this.orderService.getById(id).subscribe({
      next: (order) => {
        this.orderForm.patchValue({
          clientId: order.clientId,
          dishId: order.dishId,
        });
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar pedido', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/orders']);
        this.loading = false;
      },
    });
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar clientes', 'Fechar', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  loadDishes(): void {
    this.dishService.getAll().subscribe({
      next: (dishes) => {
        this.dishes = dishes;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar pratos', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.saving = true;
      const formData: CreateOrderDto = {
        clientId: this.orderForm.value.clientId,
        dishId: this.orderForm.value.dishId,
      };

      const operation =
        this.isEditMode && this.orderId
          ? this.orderService.update(this.orderId, formData)
          : this.orderService.create(formData);

      operation.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditMode
              ? 'Pedido atualizado com sucesso!'
              : 'Pedido cadastrado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao salvar pedido', 'Fechar', {
            duration: 3000,
          });
          this.saving = false;
        },
      });
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/orders']);
  }

  get clientId() {
    return this.orderForm.get('clientId');
  }
  get dishId() {
    return this.orderForm.get('dishId');
  }
}
