# Restaurant API

Esta é uma API RESTful desenvolvida em Node.js para gerenciar clientes, pratos e pedidos de um restaurante. A API utiliza Express.js para o roteamento, Sequelize como ORM para interagir com um banco de dados PostgreSQL e implementa diversas regras de negócio e relatórios.

## Índice

1. [Tecnologias Utilizadas](#tecnologias-utilizadas)
2. [Pré-requisitos](#pré-requisitos)
3. [Estrutura do Projeto](#estrutura-do-projeto)
4. [Documentação da API (Endpoints)](#documentação-da-api-endpoints)
   - [Clientes](#clientes)
   - [Pratos](#pratos)
   - [Pedidos](#pedidos)
5. [Regras de Negócio](#regras-de-negócio)

## Tecnologias Utilizadas

- Backend: Node.js
- Framework: Express.js
- ORM: Sequelize
- Banco de Dados: PostgreSQL
- Variáveis de Ambiente: Dotenv
- Containerização: Docker & Docker Compose

## Pré-requisitos

### Para execução local

- Node.js
- NPM ou Yarn
- Uma instância do PostgreSQL em execução

### Para execução com Docker

- Docker
- Docker Compose

### Portas e Acessos

- **API**: `http://localhost:3000`
- **PostgreSQL**: localhost:5434 (externamente)
- **Banco de dados**: restaurant_api
- **Usuário**: postgres
- **Senha**: 1994

### Variáveis de Ambiente

As variáveis estão configuradas no arquivo `.env`:

```env
PORT=3000
DB_NAME=restaurant_api
DB_USER=postgres
DB_PASSWORD=1994
DB_DIALECT=postgres
DB_HOST=postgres  # Nome do serviço Docker
```

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas para separar as responsabilidades:

```plaintext
/src
|-- /controllers/   # Controla o fluxo de requisição e resposta.
|-- /database/      # Configuração da conexão com o banco de dados.
|-- /errors/        # Classes de erro customizadas.
|-- /middlewares/   # Funções de middleware (validação, tratamento de erros).
|-- /models/        # Definições dos modelos e associações do Sequelize.
|-- /routes/        # Definição das rotas da API.
|-- /services/      # Contém a lógica de negócio da aplicação.
`-- app.js          # Ponto de entrada principal da aplicação Express.
```

## Documentação da API (Endpoints)

### Clientes

Endpoints para gerenciar os clientes.

GET /clientes: Lista todos os clientes. Suporta filtragem por status.

- Query Params:
  - active (boolean): Filtra clientes por status (true ou false).
- Exemplo de Requisição: GET /clientes?active=true
- Resposta de Sucesso (200 OK):

```bash
[
  {
    "id": 1,
    "nome": "John Doe",
    "data_nascimento": "1990-01-15",
    "cpf": "39217029092",
    "active": true,
    "createdAt": "2025-06-20T10:00:00.000Z",
    "updatedAt": "2025-06-20T10:00:00.000Z"
  }
]
```

POST /clientes: Cria um novo cliente.

- Corpo da Requisição:

```bash
{
  "nome": "Jane Doe",
  "data_nascimento": "1992-05-20",
  "cpf": "79235551846"
}
```

- Resposta de Sucesso (201 Created):

```bash
{
  "message": "Cliente criado com sucesso",
  "cliente": { ...dados do cliente... }
}
```

GET /clientes/most-orders: Lista os clientes que mais fizeram pedidos, em ordem decrescente(default=5).

- Query Params:

  - quantity (number): Limita a quantidade de clientes retornados.

- Exemplo de Requisição: GET /clientes/most-orders?quantity=7

- Resposta de Sucesso (200 OK):

```bash
[
  {
    "id": 1,
    "nome": "John Doe",
    ...
    "totalPedidos": "15"
  },
  {
    "id": 2,
    "nome": "Jane Doe",
    ...
    "totalPedidos": "12"
  },
  ...
]
```

GET /clientes/most-spent: Lista os clientes que mais gastaram, em ordem decrescente(default=5).

- Query Params:

  - quantity (number): Limita a quantidade de clientes retornados.

- Exemplo de Requisição: GET /clientes/most-spent?quantity=7

- Resposta de Sucesso (200 OK):

```bash
[
  {
    "id": 1,
    "nome": "John Doe",
    ...
    "totalGasto": "150.00"
  },
  {
    "id": 2,
    "nome": "Jane Doe",
    ...
    "totalGasto": "120.00"
  },
  ...
]
```

GET /clientes/:id : Busca um cliente específico pelo ID.

GET /clientes/:id/details : Busca um cliente e todos os seus pedidos associados.

PUT /clientes/:id : Atualiza os dados de um cliente.

- Corpo da Requisição (parcial):

```bash
{
  "nome": "Johnathan Doe",
}
```

DELETE /clientes/:id : Remove permanentemente um cliente do banco de dados.

POST /clientes/active/:id : Ativa um cliente que estava inativo.

DELETE /clientes/active/:id : Desativa um cliente (soft delete), mantendo o registro no banco.

### Pratos

Endpoints para gerenciar os pratos do cardápio.

GET /pratos : Lista todos os pratos. Suporta filtragem por categoria.

- Query Params:

  - categoria (string): Filtra pratos por categoria.

- Exemplo de Requisição: GET /pratos?categoria=Sobremesa

POST /pratos : Cria um novo prato.

- Corpo da Requisição:

```bash
{
  "nome": "Bolo de Chocolate",
  "descricao": "Bolo de chocolate com cobertura de ganache",
  "preco": 15.00,
  "categoria": "Sobremesa"
}
```

GET /pratos/popularity : Lista os pratos ordenados pela quantidade de vezes que foram pedidos.

GET /pratos/:id : Busca um prato específico pelo ID.

PUT /pratos/:id : Atualiza os dados de um prato.

- Corpo da Requisição (parcial):

```bash
{
  "nome": "Bolo de Cenoura",
  "descricao": "Bolo de cenoura com cobertura de chocolate",
}
```

DELETE /pratos/:id : Remove um prato do banco de dados.

### Pedidos

Endpoints para gerenciar os pedidos.

GET /pedidos : Lista todos os pedidos. Suporta filtragem por status de atendimento.

- Query Params:

  - atendido (boolean): Filtra pedidos por status (true ou false).

- Exemplo de Requisição: GET /pedidos?atendido=false

POST /pedidos : Cria um novo pedido.

- Corpo da Requisição:

```bash
{
  "clienteId": 1,
  "pratoId": 2,
}
```

GET /pedidos/:id/details : Busca um pedido e inclui os detalhes do cliente e do prato associados.

PUT /pedidos/:id : Atualiza um pedido (ex: para trocar o prato ou cliente).

DELETE /pedidos/:id : Remove um pedido do banco de dados.

POST /pedidos/atendido/:id : Marca um pedido como "atendido".

DELETE /pedidos/atendido/:id : Marca um pedido como "não atendido".

## Regras de Negócio

A API implementa as seguintes validações:

- CPF do Cliente: A validação é feita usando o algoritmo padrão de CPF, garantindo que apenas CPFs matematicamente válidos sejam aceitos.
- Nome do Prato: Deve conter apenas letras e espaços, com um comprimento entre 3 e 50 caracteres.
- Preço do Prato: Deve ser um número positivo.
- Cliente Ativo: Um pedido só pode ser criado para um cliente que esteja com o status active: true.
