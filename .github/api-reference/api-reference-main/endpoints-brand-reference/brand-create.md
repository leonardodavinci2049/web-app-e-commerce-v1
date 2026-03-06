# Endpoint API Reference - Cadastrar Marcas (V2)

### Descrição

Endpoint para cadastrar novas marcas no sistema.

## Informações do Endpoint

| Propriedade      | Valor                                                                     |
| ---------------- | ------------------------------------------------------------------------- |
| **Método**       | `POST`                                                                    |
| **Path**         | `/brand/v2/brand-create`                                                  |
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

Se a chave for inválida ou ausente, a API retornará `401 Unauthorized`.

---

## Estrutura da Requisição (Body)

| Campo                 | Tipo   | Obrigatório | Descrição                      | Restrições    |
| :-------------------- | :----- | :---------: | :----------------------------- | :------------ |
| `pe_app_id`           | number |   **Sim**   | ID da aplicação                | -             |
| `pe_system_client_id` | number |   **Sim**   | ID do cliente do sistema       | -             |
| `pe_store_id`         | number |   **Sim**   | ID da loja                     | -             |
| `pe_organization_id`  | string |   **Sim**   | ID da organização              | Max 200 chars |
| `pe_user_id`          | string |     Não     | ID do usuário                  | Max 200 chars |
| `pe_user_name`        | string |   **Sim**   | Nome do usuário               | Max 200 chars |
| `pe_user_role`        | string |   **Sim**   | Papel do usuário (ex: 'seller') | Max 200 chars |
| `pe_person_id`        | number |     Não     | ID da pessoa associada         | -             |
| `pe_brand`            | string |   **Sim**   | Nome da marca                  | Max 100 chars |
| `pe_slug`             | string |   **Sim**   | Slug da marca (URL friendly)   | Max 300 chars |
| `pe_image_path`       | string |     Não     | Caminho da imagem da marca     | Max 500 chars |
| `pe_notes`            | string |     Não     | Observações/Notas              | -             |

### Exemplo de Requisição

```http
POST /brand/v2/brand-create
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
  "pe_brand": "Brand Name4",
  "pe_slug": "brand-name4",
  "pe_image_path": "/images/brand-name4.jpg",
  "pe_notes": "Observações sobre a marca"
}
```

---

## Estrutura da Resposta

A resposta segue um padrão unificado de envelope JSON.

| Campo        | Tipo   | Descrição                                          |
| :----------- | :----- | :------------------------------------------------- |
| `statusCode` | number | Código interno de status (ex: 100200 para sucesso) |
| `message`    | string | Mensagem descritiva do resultado                   |
| `recordId`   | number | ID do registro criado (se aplicável)               |
| `data`       | array  | Detalhes do retorno da procedure                   |
| `quantity`   | number | Quantidade de registros afetados/retornados        |
| `errorId`    | number | ID de erro (0 = sem erro)                          |

### Exemplo de Sucesso (200/201)

```json
{
    "statusCode": 100200,
    "message": "Cadastro criado com sucesso",
    "recordId": 32,
    "data": [
        {
            "sp_return_id": 32,
            "sp_message": "Cadastro criado com sucesso",
            "sp_error_id": 0
        }
    ],
    "quantity": 1,
    "errorId": 0,
    "info1": ""
}
```

---

## Respostas de Erro

### 400 Bad Request (Erro de Validação)

Retornado quando campos obrigatórios estão faltando ou tipos estão incorretos.

```json
{
  "message": ["pe_brand should not be empty", "pe_slug must be a string"],
  "error": "Bad Request",
  "statusCode": 400
}
```

### 401 Unauthorized

Retornado quando a API Key é inválida ou não fornecida.

```json
{
  "message": "Invalid API key",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### 404/422 Erro de Negócio (Exemplo)

Pode ocorrer se IDs referenciados não existirem ou houver violação de regra de negócio no banco de dados.

```json
{
  "statusCode": 100422,
  "message": "Error! Informe ID SYSTEM Válido",
  "recordId": 0,
  "data": [
    {
      "sp_return_id": 0,
      "sp_message": "Error! Informe ID SYSTEM Válido",
      "sp_error_id": 1
    }
  ],
  "quantity": 0,
  "errorId": 1
}
```

### 500 Internal Server Error

Erro inesperado no servidor.

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```
