# DevShowcase API - Backend (Etapa 1)

API RESTful desenvolvida em **Node.js**, **Express**, **TypeScript**, **Prisma ORM** e banco de dados relacional **SQLite** para a plataforma **DevShowcase**.

## 📌 Requisitos Atendidos

1. **Configuração e Repositório**:
   - Estrutura limpa em TypeScript com divisão em camadas (Controllers, Services, DTOs, Middlewares).
   - Configuração de Git com `.gitignore` adequado para ocultar `node_modules`, `.env` e arquivos temporários.

2. **Modelagem Relacional de Entidades**:
   - **Profile** (Perfil do Desenvolvedor) `1 : N` **Project**
   - **Project** `N : N` **Technology** (via join table implícita do Prisma)
   - **Project** `1 : N` **Feedback**

3. **Validação de Dados e DTOs**:
   - DTOs de entrada e saída com validações via **Zod**:
     - Nomes e títulos não vazios.
     - Formato de e-mail válido.
     - URLs válidas (`http://` ou `https://`).
     - IDs relacioandos no formato UUID.

4. **Endpoints REST Implementados**:
   - `POST /api/profiles`: Cadastro de perfil com validação.
   - `GET /api/profiles/:id`: Busca de perfil por ID (com projetos associados).
   - `POST /api/technologies`: Cadastro de tecnologia com validação.
   - `GET /api/technologies`: Listagem de todas as tecnologias.
   - `POST /api/projects`: Cadastro de projeto vinculando perfil e tecnologias.
   - `GET /api/projects`: Listagem de todos os projetos com autor e tecnologias.
   - `POST /api/projects/:id/feedbacks`: Registro de feedback/opinião para um projeto.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: TypeScript (v5.8) / Node.js (v20+)
- **Framework Web**: Express.js
- **ORM / Persistência**: Prisma ORM (v6) com SQLite
- **Validação de DTOs**: Zod
- **Execução em Dev**: `tsx`

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório e instalar dependências
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd "atividade 1"
npm install
```

### 2. Configurar o Banco de Dados e Carga de Dados (Seed)
```bash
# Sincronizar o banco SQLite com o esquema Prisma
npx prisma db push

# Executar a carga inicial de dados de exemplo (perfis, tecnologias e projetos)
npm run seed
```

### 3. Iniciar o Servidor em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor estará rodando em `http://localhost:3000/api`.

---

## 🧪 Testes da API

### Executar Testes Automatizados nos Endpoints
```bash
npm run test:api
```

### Testar no Postman
1. Abra o Postman.
2. Clique em **Import** e selecione o arquivo `devshowcase_postman_collection.json` localizado na raiz do projeto.
3. Certifique-se de que a API está rodando (`npm run dev`) e execute as requisições na ordem desejada.

---

## 📂 Estrutura do Código

```
src/
├── config/           # Configuração do banco de dados (Prisma client)
├── database/         # Script de carga de dados (seed.ts)
├── middlewares/      # Validação de DTOs (Zod) e Tratamento de Erros
├── modules/          # Módulos da aplicação (Profiles, Technologies, Projects)
│   ├── profiles/     # Controller, Service, DTOs e Routes de Perfis
│   ├── technologies/ # Controller, Service, DTOs e Routes de Tecnologias
│   └── projects/     # Controller, Service, DTOs e Routes de Projetos & Feedbacks
├── routes/           # Rotas centrais da API (/api)
├── scripts/          # Scripts de validação e testes dos endpoints
└── app.ts            # Ponto de entrada da aplicação Express
```
