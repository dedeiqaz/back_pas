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

Acesse no navegador:

- http://localhost:8080

## Estrutura

- `src/main/java/br/com/trio/sistema/model` -> entidades de domínio
- `src/main/java/br/com/trio/sistema/controller` -> controllers MVC
- `src/main/java/br/com/trio/sistema/service` -> regras de negócio e estratégias de validação
- `src/main/java/br/com/trio/sistema/repository` -> abstração e implementação de repositório em memória
- `src/main/java/br/com/trio/sistema/config` -> configuração de serviços e fábrica

## Padrões: MVC e Camadas (Layers)

O projeto já está organizado segundo os padrões MVC e por camadas. A seguir um mapeamento direto entre camadas e arquivos do código:

- **Model (Domínio):** [src/main/java/br/com/trio/sistema/model/Cliente.java](src/main/java/br/com/trio/sistema/model/Cliente.java)
- **View (Apresentação):** templates Thymeleaf em [src/main/resources/templates](src/main/resources/templates) (por exemplo [templates/clientes/lista.html](src/main/resources/templates/clientes/lista.html))
- **Controller (Apresentação / Web):** controllers que retornam views em [src/main/java/br/com/trio/sistema/controller/ClienteController.java](src/main/java/br/com/trio/sistema/controller/ClienteController.java)
- **Service (Camada de negócios):** `CadastroService` em [src/main/java/br/com/trio/sistema/service/CadastroService.java](src/main/java/br/com/trio/sistema/service/CadastroService.java) encapsula regras e validações
- **Repository (Persistência):** abstração e implementação em memória em [src/main/java/br/com/trio/sistema/repository/CrudRepository.java](src/main/java/br/com/trio/sistema/repository/CrudRepository.java) e [src/main/java/br/com/trio/sistema/repository/InMemoryCrudRepository.java](src/main/java/br/com/trio/sistema/repository/InMemoryCrudRepository.java)

Para demonstrar a separação Front-Back (API back-end invocada por um front-end separado), foi adicionada uma API REST simples para `Cliente`:

- **API (Back-end REST):** [src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java](src/main/java/br/com/trio/sistema/controller/api/ClienteApiController.java)

## Separação Front / Back

Este repositório agora contém uma pasta `frontend` com um pequeno cliente estático que consome a API REST do back-end.

- `frontend/index.html` + `frontend/app.js` -> exemplo de front-end separado (fetch para `/api/clientes`).
- Para rodar localmente, execute o back-end (`mvn spring-boot:run`) e sirva a pasta `frontend` com um servidor estático (por exemplo `python -m http.server 5500`).

Exemplo de execução:
```
# Inicie o back-end na raiz do projeto
mvn spring-boot:run

# Em outra janela, sirva o frontend
cd frontend
python -m http.server 5500

# Abra http://localhost:5500 no navegador
```

O back-end permite CORS para facilitar desenvolvimento (consulte `ClienteApiController` para detalhes).

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
