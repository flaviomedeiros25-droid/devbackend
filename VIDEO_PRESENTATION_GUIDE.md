# Guia de Apresentação em Vídeo e Entrega em PDF - DevShowcase API

Este guia traz o passo a passo completo para você gravar o vídeo demonstrativo (duração de **5 a 8 minutos**) e preparar o **arquivo PDF de entrega** conforme exigido pelas instruções do projeto.

---

## 📋 Checklist de Entrega

- [ ] **Repositório Público no GitHub** contendo todo o código-fonte, arquivo `.gitignore` e `README.md`.
- [ ] **Vídeo no YouTube** (Configurado como **Não Listado** / *Unlisted*).
- [ ] **Arquivo PDF** com os 2 links (Link do Repositório GitHub + Link do Vídeo YouTube).

---

## 🎥 Roteiro Recomendado para Gravação do Vídeo (5 a 8 Minutos)

### ⏱️ Minuto 0:00 - 0:45 | Apresentação Inicial (Câmera Ligada)
1. **Ligar a Webcam**: Mostre seu rosto e apresente-se com seu **nome completo** e curso/turma.
   *Exemplo:* *"Olá! Meu nome é [Seu Nome Completo], e esta é a apresentação da Etapa 1 do projeto prático DevShowcase API..."*
2. **Introdução da Proposta**: Explique brevemente o objetivo da API (Backend para cadastrar perfis de desenvolvedores, projetos relacionando tecnologias e recebendo opiniões/feedbacks).

### ⏱️ Minuto 0:45 - 2:00 | Visão Geral da Arquitetura e Código (Compartilhamento de Tela)
1. Mostre a tela inteira do VS Code.
2. Apresente o arquivo `prisma/schema.prisma` destacando os relacionamentos exigidos:
   - **Profile 1 : N Project** (`Profile` possui lista de `projects`).
   - **Project N : N Technology** (Relação de N para N entre projetos e tecnologias).
   - **Project 1 : N Feedback** (`Project` possui lista de `feedbacks`).
3. Mostre a estrutura de camadas:
   - `src/modules/profiles/dto/profile.dto.ts` (Validações de campos obrigatórios com Zod).
   - `src/modules/projects/dto/project.dto.ts`.

### ⏱️ Minuto 2:00 - 6:30 | Demonstração Prática da API em Execução no Postman
> **Dica**: No terminal do VS Code, execute `npm run dev` (ou `npm run seed` antes) para iniciar a API na porta 3000.

Abra o **Postman** (com a coleção `devshowcase_postman_collection.json` importada) e execute cada endpoint mostrando a resposta HTTP no console do Postman:

1. **POST /api/profiles (Cadastro de Perfil Válido)**
   - Mostre o JSON enviado no Body.
   - Clique em `Send` -> Mostre o status `201 Created` e o `id` retornado.

2. **POST /api/profiles (Teste de Validação de Erro - E-mail/URL Inválidos)**
   - Altere o e-mail para algo sem `@` ou URL inválida.
   - Clique em `Send` -> Mostre a resposta `400 Bad Request` com o detalhamento do erro.

3. **GET /api/profiles/{id} (Buscar Perfil por ID)**
   - Cole o ID retornado anteriormente.
   - Clique em `Send` -> Mostre o status `200 OK` e os dados do perfil com a lista de projetos.

4. **POST /api/technologies (Cadastro de Tecnologia)**
   - Envie `{ "name": "Docker", "category": "DevOps" }`.
   - Clique em `Send` -> Mostre o status `201 Created`.

5. **GET /api/technologies (Listar Tecnologias)**
   - Clique em `Send` -> Mostre a lista de tecnologias retornadas com status `200 OK`.

6. **POST /api/projects (Cadastro de Projeto com Relacionamentos)**
   - Passe o `profileId` do desenvolvedor e o array `technologyIds` com o ID da tecnologia.
   - Clique em `Send` -> Mostre o status `201 Created` e a resposta contendo o objeto do perfil e as tecnologias populadas.

7. **GET /api/projects (Listagem de Projetos)**
   - Clique em `Send` -> Mostre todos os projetos cadastrados com seus autores e tecnologias (`200 OK`).

8. **POST /api/projects/{id}/feedbacks (Cadastro de Feedback)**
   - Envie um comentário e nota para o projeto.
   - Mostre a criação do feedback vinculado ao projeto (`201 Created`).

### ⏱️ Minuto 6:30 - 7:30 | Encerramento
1. Volte rapidamente para a tela do VS Code / Webcam.
2. Conclua ressaltando que todos os 4 endpoints e seus relacionamentos exigidos foram implementados e testados com sucesso.
3. Agradeça e encerre a gravação.

---

## 🚀 Como Subir o Código para o GitHub

Execute os comandos abaixo no seu terminal na pasta do projeto:

```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Fazer o commit inicial
git commit -m "feat: implementacao completa da etapa 1 da DevShowcase API"

# 3. Criar o repositório no GitHub (site github.com -> New Repository -> Público)

# 4. Vincular o repositório remoto e enviar o código
git remote add origin https://github.com/SEU_USUARIO/devshowcase-api.git
git branch -M main
git push -u origin main
```

---

## 📄 Modelo para o Arquivo PDF de Entrega

Crie um documento Word/Google Docs, salve como **PDF** e inclua os dados no modelo abaixo:

```text
====================================================================
               PLATAFORMA DEVSHOWCASE API - ETAPA 1
====================================================================

Aluno(a): Flávio Medeiros
Data: 23/09/2026

--------------------------------------------------------------------
1. LINK DO REPOSITÓRIO NO GITHUB (CÓDIGO-FONTE):
https://github.com/flaviomedeiros25-droid/devbackend.git

2. LINK DO VÍDEO NO YOUTUBE (NÃO LISTADO):
https://youtu.be/COLOQUE_SEU_LINK_AQUI
--------------------------------------------------------------------
```
