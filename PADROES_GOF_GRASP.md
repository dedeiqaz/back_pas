# Padrões GoF e GRASP Utilizados

Este documento descreve os padrões usados na implementação dos 3 cadastros (Produtos, Clientes e Funcionários).

## 1. Padrões GoF aplicados (repetidos em cada cadastro)

### 1.1 Singleton
- Classe: `RepositoryFactory`
- Uso: garante uma única instância da fábrica de repositórios no sistema.
- Benefício: evita criação descontrolada de objetos de infraestrutura.

### 1.2 Factory Method
- Classe: `RepositoryFactory#createRepository(Class<T>)`
- Uso: encapsula a criação de repositórios por tipo de entidade.
- Benefício: desacopla as camadas de serviço da criação concreta do repositório.

### 1.3 Strategy
- Classes: `ProdutoValidationStrategy`, `ClienteValidationStrategy`, `FuncionarioValidationStrategy`
- Uso: cada cadastro possui estratégia própria de validação.
- Benefício: facilita manutenção e evolução de regras sem alterar a lógica central de serviço.

## 2. Padrões GRASP aplicados (repetidos em cada cadastro)

### 2.1 Controller
- Classes: `ProdutoController`, `ClienteController`, `FuncionarioController`
- Uso: recebem e tratam as requisições de interface para cada caso de uso CRUD.
- Benefício: organiza o fluxo de entrada da aplicação.

### 2.2 Information Expert
- Classes de validação de estratégia e classes de serviço
- Uso: a responsabilidade de validar dados fica com quem detém o conhecimento das regras de negócio do cadastro.
- Benefício: regras ficam no local mais adequado, melhorando coesão.

### 2.3 Low Coupling / High Cohesion
- Uso: separação em camadas `controller -> service -> repository`, com interfaces e abstrações.
- Benefício: código mais testável, legível e fácil de manter.

## 3. Mapeamento por cadastro

Cada cadastro (Produto, Cliente e Funcionário) utiliza no mínimo:

- **2 GoF**: Singleton + Factory Method (e também Strategy)
- **2 GRASP**: Controller + Information Expert (e também Low Coupling/High Cohesion)

Portanto, o requisito mínimo de padrões por cadastro foi atendido.
