# Sistema CRUD Trio

Projeto acadêmico em Java orientado a objetos com 3 cadastros CRUD:

- Produtos
- Clientes
- Funcionários

## Requisitos

- Java 21
- Maven 3.9+

## Como executar

```bash
mvn spring-boot:run
```

A API fica disponível em:

- http://localhost:8080

Use um cliente HTTP como `curl`, Postman ou o front-end separado para consumir os endpoints.

## Estrutura

- `src/main/java/br/com/trio/sistema/model` -> entidades de domínio
- `src/main/java/br/com/trio/sistema/controller` -> controllers REST API
- `src/main/java/br/com/trio/sistema/service` -> regras de negócio e estratégias de validação
- `src/main/java/br/com/trio/sistema/repository` -> abstração e implementação de repositório em memória
- `src/main/java/br/com/trio/sistema/config` -> configuração de serviços e fábrica

## Padrões: Camadas (Layers)

O projeto já está organizado por camadas. A seguir um mapeamento direto entre camadas e arquivos do código:

- **Model (Domínio):** [src/main/java/br/com/trio/sistema/model/Cliente.java](src/main/java/br/com/trio/sistema/model/Cliente.java)
- **Controller (API):** controllers REST em [src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java](src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java)
- **Service (Camada de negócios):** `CadastroService` em [src/main/java/br/com/trio/sistema/service/CadastroService.java](src/main/java/br/com/trio/sistema/service/CadastroService.java) encapsula regras e validações
- **Repository (Persistência):** abstração e implementação em memória em [src/main/java/br/com/trio/sistema/repository/CrudRepository.java](src/main/java/br/com/trio/sistema/repository/CrudRepository.java) e [src/main/java/br/com/trio/sistema/repository/InMemoryCrudRepository.java](src/main/java/br/com/trio/sistema/repository/InMemoryCrudRepository.java)

Para demonstrar a separação Front-Back (API back-end invocada por um front-end separado), foram adicionadas APIs REST para `Cliente`, `Produto` e `Funcionário`:

- **API Cliente:** [src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java](src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java)
- **API Produto:** [src/main/java/br/com/trio/sistema/controller/api/ProdutoApiController.java](src/main/java/br/com/trio/sistema/controller/api/ProdutoApiController.java)
- **API Funcionário:** [src/main/java/br/com/trio/sistema/controller/api/FuncionarioApiController.java](src/main/java/br/com/trio/sistema/controller/api/FuncionarioApiController.java)

## Separação Front / Back

Este repositório agora contém uma pasta `frontend` com um cliente Web separado que consome as APIs do backend.

- `frontend/index.html` + `frontend/app.js` -> front-end separado para Clientes, Produtos e Funcionários.
- `frontend/style.css` -> estilo do frontend separado.
- `frontend/package.json` -> comando `npm start` para rodar o front-end localmente.

### Executar localmente

```bash
# Inicie o backend na raiz do projeto
mvn spring-boot:run

# Em outra janela, inicie o frontend
cd frontend
npm install
npm start

# Abra http://localhost:5500 no navegador
```

### Configurar a URL do backend

Alterar `window.API_BASE_URL` em `frontend/index.html` para a URL do backend Railway, por exemplo:

```html
<script>window.API_BASE_URL = 'https://seu-app-name.up.railway.app';</script>
```

### Endpoints disponíveis

- `GET /api/clientes`
- `GET /api/clientes/{id}`
- `POST /api/clientes/salvar`
- `DELETE /api/clientes/{id}`

- `GET /api/produtos`
- `GET /api/produtos/{id}`
- `POST /api/produtos/salvar`
- `DELETE /api/produtos/{id}`

- `GET /api/funcionarios`
- `GET /api/funcionarios/{id}`
- `POST /api/funcionarios/salvar`
- `DELETE /api/funcionarios/{id}`

O back-end permite CORS para facilitar desenvolvimento e consumo por um front-end separado.

Como usar a API (exemplos):

GET listagem:
```
curl -s http://localhost:8080/api/clientes
```

POST salvar (JSON):
```
curl -X POST -H "Content-Type: application/json" -d '{"nome":"Fulano","email":"fulano@ex.com"}' http://localhost:8080/api/clientes/salvar
```

Essa API usa a mesma camada de `service` e `repository`, mostrando como manter camadas separadas sem duplicar regras de negócio.

## Artefatos solicitados

- Documento simplificado: `DOCUMENTO_SISTEMA.md`
- Implementação: código completo neste repositório
- Explicação dos padrões GoF e GRASP: `PADROES_GOF_GRASP.md`

## Checklist de entrega AVA

1. Subir este projeto no GitHub com nome da equipe.
2. Gerar prints das telas:
   - Tela inicial
   - Lista e formulário de Produtos
   - Lista e formulário de Clientes
   - Lista e formulário de Funcionários
3. Enviar no AVA:
   - Link do repositório GitHub
   - Prints das telas
   - Documento simplificado (pode anexar o `DOCUMENTO_SISTEMA.md` exportado em PDF, se solicitado)
