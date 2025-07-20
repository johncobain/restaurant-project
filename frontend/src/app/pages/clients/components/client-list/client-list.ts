import { ClientService } from './../../../../core/services/client.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../../../core/models/client.model';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-client-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule,
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList {
  @Input() clients: Client[] = [];

  @Output() clientUpdated = new EventEmitter<Client>();
  @Output() clientDeleted = new EventEmitter<number>();

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  formatCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatBirthDate(date: string | Date): string {
    if (!date) return '';

    try {
      let dateObj: Date;

      if (typeof date === 'string') {
        const [year, month, day] = date.split('-').map(Number);
        dateObj = new Date(year, month - 1, day);
      } else {
        dateObj = date;
      }

      if (isNaN(dateObj.getTime())) {
        return 'Data inválida';
      }

      return dateObj.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error, date);
      return 'Data inválida';
    }
  }

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

  toggleClientStatus(client: Client): void {
    const newStatus = !client.active;
    const action = newStatus ? 'ativar' : 'desativar';

    if (confirm(`Tem certeza que deseja ${action} este cliente?`)) {
      const serviceCall = newStatus
        ? this.clientService.activate(client.id!)
        : this.clientService.deactivate(client.id!);

      serviceCall.subscribe({
        next: (updatedClient) => {
          client.active = newStatus;

          this.clientUpdated.emit(updatedClient);

          this.snackBar.open(
            `Cliente ${newStatus ? 'ativado' : 'desativado'} com sucesso!`,
            'Fechar',
            { duration: 3000 }
          );
        },
        error: (error) => {
          console.error('Erro ao alterar status:', error);
          this.snackBar.open(`Erro ao ${action} cliente`, 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  deleteClient(client: Client): void {
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
      this.clientService.delete(client.id!).subscribe({
        next: () => {
          this.clientDeleted.emit(client.id!);

          this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Erro ao excluir cliente:', error);
          this.snackBar.open('Erro ao excluir cliente', 'Fechar', {
            duration: 3000,
          });
        },
      });
    }
  }

  editClient(client: Client): void {
    this.router.navigate(['/clients', client.id, 'edit']);
  }

  viewClient(client: Client): void {
    this.router.navigate(['/clients', client.id]);
  }
}
