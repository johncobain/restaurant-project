import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order, CreateOrderDto, UpdateOrderDto } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private endpoint = '/orders';

  constructor(private api: ApiService) {}

  getAll(): Observable<Order[]> {
    return this.api.get<Order[]>(this.endpoint);
  }

  getAllByAttended(attended: boolean): Observable<Order[]> {
    return this.api.get<Order[]>(`${this.endpoint}?attended=${attended}`);
  }

  getById(id: number): Observable<Order> {
    return this.api.get<Order>(`${this.endpoint}/${id}`);
  }

  getByIdDetails(id: number): Observable<Order> {
    return this.api.get<Order>(`${this.endpoint}/${id}/details`);
  }

  create(order: CreateOrderDto): Observable<Order> {
    return this.api.post<Order>(this.endpoint, order);
  }

  update(id: number, order: UpdateOrderDto): Observable<Order> {
    return this.api.put<Order>(`${this.endpoint}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  attend(id: number): Observable<Order> {
    return this.api.post<Order>(`${this.endpoint}/attended/${id}`, {});
  }

  unattend(id: number): Observable<Order> {
    return this.api.delete<Order>(`${this.endpoint}/attended/${id}`);
  }
}
