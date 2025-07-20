import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { ClientDetails } from '../../../core/models/client.model';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Loading } from '../../../shared/components/loading/loading';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-detail',
  imports: [MatIconModule, MatButtonModule, RouterModule, Loading],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss',
})
export class ClientDetail implements OnInit {
  client: ClientDetails | null = null;
  clientId: number;

  constructor(private clientService: ClientService, private router: Router) {
    this.clientId = this.getClientIdFromRoute();
  }

  ngOnInit() {
    this.loadClient();
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

  goBack(): void {
    this.router.navigate(['/clients']);
  }
}
