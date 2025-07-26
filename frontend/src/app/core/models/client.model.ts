import { Order } from './order.model';

export interface Client {
  id?: number;
  name: string;
  birthDate: string;
  cpf: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  totalSpent?: string;
  totalOrders?: string;
}

export interface ClientDetails extends Client {
  orders?: Order[];
}

export interface CreateClientDto {
  name: string;
  birthDate: string;
  cpf: string;
}

export interface UpdateClientDto {
  name?: string;
  birthDate?: string;
  cpf?: string;
  active?: boolean;
}
