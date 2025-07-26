# Restaurant Manager

Este projeto é um sistema completo para gestão de restaurantes, desenvolvido com Angular no frontend e Node.js/Express no backend, utilizando Sequelize e PostgreSQL.

## Funcionalidades

- **Clientes**: Cadastro, edição, exclusão, ativação/desativação, listagem, busca, ordenação, visualização de detalhes, estatísticas de pedidos e valor gasto.
- **Pratos**: Cadastro, edição, exclusão, listagem, busca, ordenação, visualização de detalhes, categorias dinâmicas.
- **Pedidos**: Cadastro, edição, exclusão, listagem, filtro por status, marcar como atendido/não atendido.
- **Dashboard**: Visão geral com estatísticas rápidas de clientes, pratos, pedidos e ações rápidas.
- **Tema escuro**: Interface moderna, responsiva e com Material Design 3.
- **API RESTful**: Backend com endpoints para todas as operações CRUD e relatórios.
- **Banco de Dados**: PostgreSQL com migrations e seeders.
- **Docker**: Ambiente pronto para desenvolvimento e produção com docker-compose.

## Estrutura do Projeto

- `frontend/` — Aplicação Angular (Material Design, responsiva)
- `backend/` — API Node.js/Express (Sequelize, PostgreSQL)
- `docker-compose.yml` — Orquestração dos serviços

## Como rodar

1. Clone o repositório
2. Execute `./docker.sh dev` ou `docker compose up --build -d` para buildar e subir tudo
3. Acesse o frontend em `http://localhost:4200`
4. A API estará em `http://localhost:3000`

## Principais Telas

- **Clientes**: Gerencie clientes, veja quem mais gastou ou pediu
- **Pratos**: Gerencie o cardápio e categorias
- **Pedidos**: Crie, edite, marque como atendido
- **Dashboard**: Resumo geral do restaurante

## Tecnologias

- Angular 17+, Angular Material 3
- Node.js, Express, Sequelize
- PostgreSQL
- Docker

---
