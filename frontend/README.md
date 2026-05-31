# Front-end Separado - Sistema CRUD Trio

Este front-end consome a API REST do back-end Spring Boot hospedado no projeto principal.

## Executar localmente

1. Inicie o backend:

```bash
mvn spring-boot:run
```

2. Abra outra janela e instale as dependências do frontend:

```bash
cd frontend
npm install
```

3. Inicie o servidor estático:

```bash
npm start
```

4. Abra no navegador:

```text
http://localhost:5500
```

## Configurar a URL do backend

O front-end usa a variável `window.API_BASE_URL` definida em `frontend/index.html`.
Altere o valor para a URL do backend Railway, por exemplo:

```html
<script>window.API_BASE_URL = 'https://seu-app-name.up.railway.app';</script>
```

## URLs de API disponíveis

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
