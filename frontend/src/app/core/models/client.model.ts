export interface Client {
  id?: number;
  name: string;
  birthDate: string;
  cpf: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
}
