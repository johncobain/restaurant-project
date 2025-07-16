export interface Order {
  id?: number;
  clientId: number;
  dishId: number;
  price?: number;
  orderDate?: Date;
  attended: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderDto {
  clientId: number;
  dishId: number;
}

export interface UpdateOrderDto {
  clientId?: number;
  dishId?: number;
}
