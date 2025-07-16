import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private endpoint = '/clients';

  constructor(private api: ApiService) {}

  getAll(): Observable<Client[]> {
    return this.api.get<Client[]>(this.endpoint);
  }

  getAllByActive(active: boolean): Observable<Client[]> {
    return this.api.get<Client[]>(`${this.endpoint}?active=${active}`);
  }

  getById(id: number): Observable<Client> {
    return this.api.get<Client>(`${this.endpoint}/${id}`);
  }

  getByIdDetails(id: number): Observable<Client> {
    return this.api.get<Client>(`${this.endpoint}/${id}/details`);
  }

  create(client: CreateClientDto): Observable<Client> {
    return this.api.post<Client>(this.endpoint, client);
  }

  update(id: number, client: UpdateClientDto): Observable<Client> {
    return this.api.put<Client>(`${this.endpoint}/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  getMostOrders(): Observable<Client[]> {
    return this.api.get<Client[]>(`${this.endpoint}/most-orders`);
  }

  getMostSpent(): Observable<Client[]> {
    return this.api.get<Client[]>(`${this.endpoint}/most-spent`);
  }

  activate(id: number): Observable<Client> {
    return this.api.post<Client>(`${this.endpoint}/active/${id}`, {});
  }

  deactivate(id: number): Observable<Client> {
    return this.api.delete<Client>(`${this.endpoint}/active/${id}`);
  }
}
