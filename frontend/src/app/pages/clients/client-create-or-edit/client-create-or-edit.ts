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

import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  selector: 'app-client-create-or-edit',
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
  templateUrl: './client-create-or-edit.html',
  styleUrl: './client-create-or-edit.scss',
})
export class ClientCreateOrEdit implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId: number | null = null;
  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.clientForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id && id !== 'new') {
        this.isEditMode = true;
        this.clientId = +id;
        this.loadClient(this.clientId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      cpf: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
        ],
      ],
      birthDate: ['', [Validators.required, this.maxDateValidator()]],
    });
  }

  private maxDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const selectedDate = new Date(control.value);
      const today = new Date();

      if (selectedDate > today) {
        return { futureDate: true };
      }

      const maxAge = new Date();
      maxAge.setFullYear(maxAge.getFullYear() - 120);

      if (selectedDate < maxAge) {
        return { tooOld: true };
      }

      return null;
    };
  }

  loadClient(id: number): void {
    this.loading = true;

    this.clientService.getById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue({
          name: client.name,
          cpf: this.formatCpf(client.cpf),
          birthDate: this.formatDateFromApi(client.birthDate),
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
        this.snackBar.open('Erro ao carregar dados do cliente', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/clients']);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.saving = true;

      const formData = this.clientForm.value;
      const clientData: Partial<Client> = {
        name: formData.name.trim(),
        cpf: this.cleanCpf(formData.cpf),
        birthDate: this.formatDateForApi(formData.birthDate),
        active: true,
      };

      const operation = this.isEditMode
        ? this.clientService.update(this.clientId!, clientData)
        : this.clientService.create(clientData as Client);

      operation.subscribe({
        next: (client) => {
          const message = this.isEditMode
            ? 'Cliente atualizado com sucesso!'
            : 'Cliente cadastrado com sucesso!';

          this.snackBar.open(message, 'Fechar', { duration: 3000 });
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Erro ao salvar cliente:', error);

          let errorMessage = 'Erro ao salvar cliente';
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

  private formatDateForApi(date: Date): string {
    if (!date) return '';

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private formatDateFromApi(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(year, month - 1, day);
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }

  onCpfInput(event: any): void {
    const value = event.target.value.replace(/\D/g, '');
    const formatted = this.formatCpfInput(value);
    this.clientForm.patchValue({ cpf: formatted });
  }

  formatCpfInput(value: string): string {
    if (value.length <= 11) {
      return value
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value.substring(0, 14);
  }

  formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  cleanCpf(cpf: string): string {
    return cpf.replace(/\D/g, '');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.clientForm.controls).forEach((key) => {
      const control = this.clientForm.get(key);
      control?.markAsTouched();
    });
  }

  get name() {
    return this.clientForm.get('name');
  }
  get cpf() {
    return this.clientForm.get('cpf');
  }
  get birthDate() {
    return this.clientForm.get('birthDate');
  }

  getNameError(): string {
    if (this.name?.hasError('required')) return 'Nome é obrigatório';
    if (this.name?.hasError('minlength'))
      return 'Nome deve ter pelo menos 2 caracteres';
    if (this.name?.hasError('maxlength'))
      return 'Nome deve ter no máximo 100 caracteres';
    return '';
  }

  getCpfError(): string {
    if (this.cpf?.hasError('required')) return 'CPF é obrigatório';
    if (this.cpf?.hasError('pattern'))
      return 'CPF deve estar no formato 000.000.000-00';
    return '';
  }

  getBirthDateError(): string {
    if (this.birthDate?.hasError('required'))
      return 'Data de nascimento é obrigatória';
    return '';
  }
}
