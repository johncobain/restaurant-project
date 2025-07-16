import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Dish, CreateDishDto, UpdateDishDto } from '../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private endpoint = '/dishes';

  constructor(private api: ApiService) {}

  getAll(): Observable<Dish[]> {
    return this.api.get<Dish[]>(this.endpoint);
  }

  getAllByCategory(category: string): Observable<Dish[]> {
    return this.api.get<Dish[]>(`${this.endpoint}?category=${category}`);
  }

  getById(id: number): Observable<Dish> {
    return this.api.get<Dish>(`${this.endpoint}/${id}`);
  }

  getByIdDetails(id: number): Observable<Dish> {
    return this.api.get<Dish>(`${this.endpoint}/${id}/details`);
  }

  create(dish: CreateDishDto): Observable<Dish> {
    return this.api.post<Dish>(this.endpoint, dish);
  }

  update(id: number, dish: UpdateDishDto): Observable<Dish> {
    return this.api.put<Dish>(`${this.endpoint}/${id}`, dish);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  getByPopularity(): Observable<Dish[]> {
    return this.api.get<Dish[]>(`${this.endpoint}/popularity`);
  }
}
