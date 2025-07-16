import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../core/services/client.service';
import { Client } from '../../core/models/client.model';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  clients: Client[] = [];
  loading = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    this.clientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        console.log('Clientes carregados:', clients);
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      },
    });
  }
}
