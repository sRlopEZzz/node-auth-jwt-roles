# Node.js JWT Authentication with Roles

Este repositório contém um módulo de autenticação e autorização desenvolvido em Node.js
com Express, utilizando JWT, controlo de permissões por tipo de utilizador e validação de
e-mail.

O código foi isolado a partir de um sistema maior de gestão de restaurante (Morabeza),
com o objetivo de demonstrar a implementação de autenticação de forma organizada,
reutilizável e com separação clara de responsabilidades.

---

## Objetivo

O objetivo deste repositório é apresentar uma implementação prática de:

- Autenticação baseada em JSON Web Tokens (JWT)
- Autorização por tipo de utilizador (roles)
- Validação de e-mail após registo
- Estrutura em camadas (controllers, services e middlewares)
- Integração com base de dados através de ORM (Sequelize)

Este repositório não representa o sistema completo, apenas o módulo de autenticação.

---

## Funcionalidades

- Login com e-mail e palavra-passe
- Hash de palavras-passe com bcrypt
- Emissão e validação de JWT
- Proteção de rotas privadas
- Verificação de permissões por tipo de utilizador
- Validação de e-mail através de token

---

## Estrutura do Projeto

src/
├── app.js
├── config/
├── controllers/
│ ├── AuthController.js
│ └── UserController.js
├── services/
│ └── AuthService.js
├── middlewares/
│ ├── auth.js
│ ├── authRoleMiddleware.js
│ ├── emailValidation.js
│ └── requireActiveUser.js
├── models/
│ └── Usuario.js
├── routes/
│ ├── publicRoutes.js
│ └── privateRoutes.js
└── utils/
├── jwt.js
└── email.js

A responsabilidade de cada camada é a seguinte:

- Controllers: tratamento de pedidos HTTP e respostas
- Services: regras de negócio
- Middlewares: autenticação, autorização e validações
- Models: acesso e manipulação de dados

---

## Fluxo de Autenticação

1. O utilizador submete e-mail e palavra-passe.
2. A palavra-passe é comparada com o hash armazenado.
3. É verificado se o e-mail foi validado.
4. É gerado um token JWT com informação mínima do utilizador.
5. O token é utilizado para aceder a rotas privadas.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize
- MySQL / PostgreSQL
- JSON Web Token
- bcrypt
- Nodemailer

---
Variáveis de Ambiente

O ficheiro .env.example contém um exemplo das variáveis necessárias para execução
do projeto, incluindo configurações de base de dados, JWT e envio de e-mails.

Limitações

Este repositório não inclui funcionalidades como carrinho, pedidos, reservas ou
upload de ficheiros. Essas partes pertencem ao sistema completo do projeto original
e foram removidas intencionalmente para manter o foco na autenticação.


#Autor
Leandro Lopes Vieira

## Execução do Projeto

```bash
npm install
cp .env.example .env
npm run dev


