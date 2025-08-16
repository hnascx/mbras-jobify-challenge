# 🚀 Jobify - Plataforma de Vagas Remotas

Aplicação para busca e gerenciamento de vagas de trabalho remotas, construída com Next.js 15, Fastify e PostgreSQL.

## ✨ Características

- 🔍 **Busca Inteligente**: Filtros por categoria e busca por palavra-chave
- ❤️ **Sistema de Favoritos**: Salve vagas para consulta posterior
- 📱 **Design Responsivo**: Interface otimizada para todos os dispositivos
- 🚀 **Performance**: Next.js 15 com App Router e Server Components
- 🎨 **UI Moderna**: TailwindCSS + shadcn/ui para uma experiência visual agradável
- 🔄 **Tempo Real**: Dados sempre atualizados da API Remotive
- 🐳 **Docker Ready**: Containerização completa

## 🛠️ Tecnologias

### Frontend

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos
- **Framer Motion** - Animações fluidas
- **React Query** - Gerenciamento de estado e cache
- **Lucide React** - Ícones consistentes

### Backend

- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para PostgreSQL
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes
- **Supertest** - Testes de integração

### Infraestrutura

- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização
- **Docker Compose** - Orquestração de serviços

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recomendado) ou npm
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Instalação Rápida com Docker

1. **Clone o repositório**

   ```bash
   git clone https://github.com/hnascx/mbras-jobify-challenge.git
   cd mbras-jobify-challenge
   ```

2. **Configure as variáveis de ambiente**

   ```bash
   # Backend
   cp backend/.env.example
   # Edite backend/.env.example com suas configurações
   ```

3. **Inicie a aplicação**

   ```bash
   docker-compose up --build
   ```

4. **Acesse a aplicação**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001
   - Database: localhost:5432

### Instalação Manual

1. **Backend**

   ```bash
   cd backend
   pnpm install
   cp .env.example
   # Configure as variáveis de ambiente
   pnpm run dev
   ```

2. **Frontend**

   ```bash
   cd frontend
   pnpm install
   pnpm run dev
   ```

3. **Database**
   ```bash
   # Use o docker-compose apenas para o banco
   docker-compose up database
   ```

## 📁 Estrutura do Projeto

```
jobify/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 15)
│   │   ├── components/      # Componentes React
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilitários e configurações
│   │   └── types/          # Definições TypeScript
│   └── package.json
├── backend/                  # API Fastify
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── routes/          # Rotas da API
│   │   ├── schemas/         # Validações Zod
│   │   └── types/          # Tipos TypeScript
│   ├── prisma/              # Schema e migrações
│   └── package.json
├── docker-compose.yml        # Orquestração Docker
├── Dockerfile               # Build das imagens
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (.env.example)

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jobify?schema=public"
PORT=3001
NODE_ENV=development
```

### Banco de Dados

A aplicação usa PostgreSQL com Prisma como ORM. O schema inclui:

- **FavoriteJob**: Tabela para vagas favoritadas pelos usuários
- **Relacionamentos**: Usuário → Vagas Favoritas → Dados da Vaga

## 🧪 Testes

### Backend

```bash
cd backend
pnpm test          # Executa todos os testes
pnpm run test:watch # Modo watch para desenvolvimento
```

### Frontend

```bash
cd frontend
pnpm run lint      # Verificação de código
```

## 📱 Funcionalidades

### 🏠 Página Principal

- Lista de vagas com paginação
- Filtros por categoria
- Busca por palavra-chave
- Cards responsivos com preview das vagas

### 🔍 Detalhes da Vaga

- Informações completas da vaga
- Botão de favoritar
- Compartilhamento social
- Layout otimizado para leitura

### ❤️ Vagas Favoritadas

- Lista de vagas salvas
- Gerenciamento de favoritos
- Interface consistente com a página principal

### 🎯 Categorias Disponíveis

- Desenvolvimento de Software
- Design
- Marketing
- Vendas/Negócios
- Atendimento ao Cliente
- Produto
- Dados
- DevOps
- Financeiro/Jurídico
- Recursos Humanos
- QA
- Escrita
- Outras categorias