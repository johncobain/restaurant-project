#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}🍽️  RESTAURANT PROJECT${NC}"
    echo "  🌐 Frontend: http://localhost:4200"
    echo "  🚀 API:      http://localhost:3000"
    echo "  🗄️  DB:       localhost:5434"
    echo
}

case "$1" in
  "start"|"up")
    echo -e "${YELLOW}🚀 Iniciando aplicação...${NC}"
    docker compose up -d
    print_info
    ;;
  "dev")
    echo -e "${YELLOW}�️  Reconstruindo e iniciando...${NC}"
    docker compose up --build -d
    print_info
    ;;
  "stop"|"down")
    echo -e "${YELLOW}🛑 Parando aplicação...${NC}"
    docker compose down
    ;;
  "restart")
    echo -e "${YELLOW}🔄 Reiniciando...${NC}"
    docker compose restart
    print_info
    ;;
  "rebuild")
    echo -e "${YELLOW}🔨 Reconstruindo imagens...${NC}"
    docker compose down
    docker compose up --build -d
    print_info
    ;;
  "logs")
    docker compose logs -f
    ;;
  "status")
    docker compose ps
    print_info
    ;;
  "clean")
    echo -e "${YELLOW}🧹 Limpando tudo...${NC}"
    docker compose down -v --rmi all
    docker system prune -f
    ;;
  "clean-vol")
    echo -e "${YELLOW}🧹 Limpando volumes...${NC}"
    docker compose down -v
    ;;
  "reset-db")
    echo -e "${YELLOW}🗄️  Resetando banco de dados...${NC}"
    echo "⚠️  Todos os dados do banco serão perdidos!"
    read -p "Continuar? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      docker compose down -v
      docker compose up -d postgres
      echo -e "${GREEN}✅ Banco resetado! Aguarde inicialização...${NC}"
      sleep 5
      docker compose up -d
      print_info
    else
      echo -e "${RED}❌ Operação cancelada${NC}"
    fi
    ;;
  "fix")
    echo -e "${YELLOW}🔧 Corrigindo conflitos de containers...${NC}"
    docker compose down --remove-orphans
    docker container prune -f
    docker compose up -d
    print_info
    ;;
  *)
    echo -e "${BLUE}🍽️  Restaurant Project - Docker Manager${NC}"
    echo
    echo -e "${YELLOW}Comandos principais:${NC}"
    echo -e "  ${GREEN}start/up${NC}    - Inicia aplicação"
    echo -e "  ${GREEN}dev${NC}         - Reconstrói e inicia (para primeira inicialização)"
    echo -e "  ${GREEN}stop/down${NC}   - Para aplicação"
    echo -e "  ${GREEN}restart${NC}     - Reinicia containers"
    echo -e "  ${GREEN}rebuild${NC}     - Reconstrói tudo (essencial após mudanças de dependências)"
    echo
    echo -e "${YELLOW}Utilitários:${NC}"
    echo -e "  ${GREEN}logs${NC}        - Ver logs"
    echo -e "  ${GREEN}status${NC}      - Status dos containers"
    echo -e "  ${GREEN}clean${NC}       - Limpar tudo"
    echo -e "  ${GREEN}clean-vol${NC}   - Limpar volumes"
    echo
    echo -e "${YELLOW}Banco de dados:${NC}"
    echo -e "  ${GREEN}reset-db${NC}    - Resetar banco (apaga todos os dados)"
    echo -e "  ${GREEN}fix${NC}         - Corrigir conflitos de containers"
    echo
    exit 1
    ;;
esac
