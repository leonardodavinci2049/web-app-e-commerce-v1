# Endpoint API Reference - Listar Marcas (V2)

### Descrição

Endpoint para listar marcas cadastradas no sistema com suporte a filtros e paginação.

## Informações do Endpoint

| Propriedade      | Valor                                                                     |
| ---------------- | ------------------------------------------------------------------------- |
| **Método**       | `POST`                                                                    |
| **Path**         | `/brand/v2/brand-find-all`                                                |
| **Auth**         | `Authorization: Bearer {API_KEY}` ou `x-api-key: {API_KEY}` (obrigatório) |
| **Content-Type** | `application/json`                                                        |
| **Rate Limit**   | 500 requisições por minuto                                                |

## Url Base

A URL base da API é definida pela variável de ambiente `API_BASE_URL`.
Exemplo: `http://localhost:3333/api`

## Autenticação

A autenticação é **obrigatória**. Utilize um dos seguintes headers:

- **Authorization**: `Bearer {seu_api_key}`
- **x-api-key**: `{seu_api_key}`

---

## Estrutura da Requisição (Body)

| Campo                 | Tipo   | Obrigatório | Descrição                         | Restrições    |
| :-------------------- | :----- | :---------: | :-------------------------------- | :------------ |
| `pe_app_id`           | number |   **Sim**   | ID da aplicação                   | -             |
| `pe_system_client_id` | number |   **Sim**   | ID do cliente do sistema          | -             |
| `pe_store_id`         | number |   **Sim**   | ID da loja                        | -             |
| `pe_organization_id`  | string |   **Sim**   | ID da organização                 | Max 200 chars |
| `pe_user_id`          | string |     Não     | ID do usuário                     | Max 200 chars |
| `pe_user_name`        | string |   **Sim**   | Nome do usuário                   | Max 200 chars |
| `pe_user_role`        | string |   **Sim**   | Papel do usuário (ex: 'seller')   | Max 200 chars |
| `pe_person_id`        | number |     Não     | ID da pessoa associada            | -             |
| `pe_search`           | string |     Não     | termo de pesquis por ID e Nome da Marca       | Max 200 chars |
| `pe_inactive`         | number |     Não     | Filtro por status (0=ativo, 1=inativo) | -        |
| `pe_limit`            | number |     Não     | Limite de registros (Default 100) | -             |

### Exemplo de Requisição

```http
POST /brand/v2/brand-find-all
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

```json
{
  "pe_app_id": 1,
  "pe_system_client_id": 1,
  "pe_store_id": 3,
  "pe_organization_id": "ORG001",
  "pe_user_id": "USER001",
  "pe_user_name": "User Name",
  "pe_user_role": "seller",
  "pe_person_id": 29014,
  "pe_search": "",
  "pe_inactive": 0,
  "pe_limit": 3
}
```

---

## Estrutura da Resposta

A resposta segue um padrão unificado de envelope JSON.

| Campo        | Tipo   | Descrição                                          |
| :----------- | :----- | :------------------------------------------------- |
| `statusCode` | number | Código interno de status (ex: 100200 para sucesso) |
| `message`    | string | Mensagem descritiva do resultado                   |
| `recordId`   | number | ID de referência (geralmente 0 ou 1 para listas)   |
| `data`       | object | Objeto contendo os arrays de resultados            |
| `quantity`   | number | Quantidade de registros retornados                 |
| `errorId`    | number | ID de erro (0 = sem erro)                          |

### Exemplo de Sucesso (200)

```json
{
    "statusCode": 100200,
    "message": "Cadastro Carregados com sucesso",
    "recordId": 1,
    "data": {
        "Brand find All": [
            {
                "ID_MARCA": 10,
                "MARCA": "AFNAN",
                "SLUG": "afnan",
                "PATH_IMAGEM": "/images/afnan.jpg",
                "INATIVO": 0,
                "DATADOCADASTRO": "2024-06-19T22:34:25.000Z"
            },
            {
                "ID_MARCA": 11,
                "MARCA": "AFNAN",
                "SLUG": "afnan-2",
                "PATH_IMAGEM": "",
                "INATIVO": 0,
                "DATADOCADASTRO": "2024-06-20T10:00:00.000Z"
            },
            {
                "ID_MARCA": 9,
                "MARCA": "Antonio Banderas",
                "SLUG": "antonio-banderas",
                "PATH_IMAGEM": "/images/ab.jpg",
                "INATIVO": 0,
                "DATADOCADASTRO": "2024-05-10T08:00:00.000Z"
            }
        ]
    },
    "quantity": 3,
    "errorId": 0,
    "info1": ""
}
```

---

## Respostas de Erro

### 400 Bad Request (Erro de Validação)

```json
{
  "message": ["pe_app_id must be a number"],
  "error": "Bad Request",
  "statusCode": 400
}
```

### 404/422 Erro de Negócio (Exemplo)

```json
{
  "statusCode": 100404,
  "message": "Brand find All not found",
  "recordId": 0,
  "data": {
    "Brand find All": []
  },
  "quantity": 0,
  "errorId": 1
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
