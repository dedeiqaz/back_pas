# Documento Simplificado de Descrição do Sistema

## 1. Propósito do Sistema

O **Sistema CRUD Trio** é uma aplicação web orientada a objetos desenvolvida para fins acadêmicos, com o objetivo de demonstrar a implementação de operações de **CRUD (Create, Read, Update e Delete)** em três funcionalidades principais de cadastro.

O sistema foi pensado para simular um cenário administrativo simples de uma organização, centralizando o gerenciamento de:

- Produtos
- Clientes
- Funcionários

A proposta principal é facilitar o controle desses dados em uma interface web intuitiva, além de evidenciar boas práticas de projeto com uso de padrões **GoF** e princípios **GRASP**.

## 2. Principais Funcionalidades

### 2.1 Cadastro de Produtos
Permite criar, listar, editar e excluir produtos com os seguintes dados:

- ID (gerado automaticamente)
- Nome
- Preço
- Estoque

### 2.2 Cadastro de Clientes
Permite criar, listar, editar e excluir clientes com os seguintes dados:

- ID (gerado automaticamente)
- Nome
- E-mail
- Telefone

### 2.3 Cadastro de Funcionários
Permite criar, listar, editar e excluir funcionários com os seguintes dados:

- ID (gerado automaticamente)
- Nome
- Cargo
- Salário

## 3. Principais Usuários do Sistema

Os principais usuários são:

- **Equipe Administrativa**: responsável por manter os cadastros atualizados.
- **Gestor(a)**: utiliza os cadastros para acompanhamento de produtos, clientes e equipe.
- **Equipe de Desenvolvimento/Professor**: utiliza o sistema para validação técnica da implementação OO e dos padrões solicitados.

## 4. Visão Técnica Resumida

- Linguagem: **Java 21**
- Framework: **Spring Boot** (MVC + Thymeleaf)
- Tipo de aplicação: Web
- Armazenamento: Repositório em memória (didático, sem banco externo)
- Arquitetura em camadas: Controller, Service, Repository e Model

## 5. Conclusão

A aplicação atende ao escopo de trio por implementar **3 cadastros completos**, cada um com operações CRUD, interface de navegação e validações. O projeto também incorpora padrões de projeto para fortalecer desacoplamento, manutenção e clareza arquitetural.
