import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';
import { Loading } from '../../shared/components/loading/loading';
import { ClientList } from './components/client-list/client-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    Loading,
    ClientList,
  ],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients implements OnInit {
  clients: Client[] = [];
  loading = false;

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.snackBar.open('Erro ao carregar clientes', 'Fechar', {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }
  getActiveClients(): number {
    return this.clients.filter((client) => client.active === true).length;
  }

  onClientUpdated(updatedClient: Client): void {
    const index = this.clients.findIndex((c) => c.id === updatedClient.id);
    if (index !== -1) {
      this.clients[index] = updatedClient;
    }
  }

  onClientDeleted(clientId: number): void {
    this.clients = this.clients.filter((c) => c.id !== clientId);
  }
}
