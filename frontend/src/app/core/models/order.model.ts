import { Client } from './client.model';
import { Dish } from './dish.model';

export interface Order {
  id?: number;
  clientId: number;
  dishId: number;
  price?: number;
  orderDate?: Date;
  attended: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  client?: Client;
  dish?: Dish;
}

export interface CreateOrderDto {
  clientId: number;
  dishId: number;
}

export interface UpdateOrderDto {
  clientId?: number;
  dishId?: number;
}
