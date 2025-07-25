import { Order } from './order.model';

export interface Dish {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DishDetails extends Dish {
  orders?: Order[];
}

export interface CreateDishDto {
  name: string;
  description: string;
  price: number;
  category: boolean;
}

export interface UpdateDishDto {
  name?: string;
  description?: string;
  price?: number;
  category?: boolean;
}
