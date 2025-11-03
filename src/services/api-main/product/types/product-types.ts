/**
 * Tipos e interfaces utilizados pelo ProductWebServiceApi
 */

/**
 * Estrutura base para requisições que exigem contexto de tenant
 */
interface ProductWebBaseRequest {
  pe_app_id?: number;
  pe_system_client_id?: number;
  pe_store_id?: number;
  pe_organization_id?: string;
  pe_member_id?: string;
  pe_user_id?: string;
  pe_person_id?: number;
}

/**
 * Estrutura padrão de resposta com metadados do MySQL
 */
export interface MySQLMetadata {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

/**
 * Estrutura padrão de retorno das stored procedures
 */
export interface StoredProcedureResponse {
  sp_return_id: number;
  sp_message: string;
  sp_error_id: number;
}

/**
 * Dados detalhados retornados pelo endpoint product-web-find-id
 */
export interface ProductWebDetail {
  ID_PRODUTO: number;
  SKU: number;
  PRODUTO: string;
  DESCRICAO_TAB: string | null;
  ETIQUETA: string | null;
  REF: string | null;
  MODELO: string | null;
  PATH_IMAGEM: string | null;
  SLUG: string | null;
  PATH_IMAGEM_MARCA: string | null;
  ID_TIPO: number | null;
  TIPO: string | null;
  ID_MARCA: number | null;
  MARCA: string | null;
  VL_ATACADO: string;
  VL_CORPORATIVO: string;
  VL_VAREJO: string;
  OURO: string;
  PRATA: string;
  BRONZE: string;
  ESTOQUE_LOJA: number;
  TEMPODEGARANTIA_DIA: number;
  PESO_GR: number;
  COMPRIMENTO_MM: number;
  LARGURA_MM: number;
  ALTURA_MM: number;
  DIAMETRO_MM: number;
  DESTAQUE: number;
  PROMOCAO: number;
  FLAG_SERVICO: number;
  IMPORTADO: number;
  DESCRICAO_VENDA: string | null;
  ANOTACOES: string | null;
  META_TITLE: string | null;
  META_DESCRIPTION: string | null;
}

/**
 * Taxonomia relacionada retornada junto aos detalhes do produto web
 */
export interface ProductWebRelatedTaxonomy {
  ID_TAXONOMY: number;
  PARENT_ID: number;
  TAXONOMIA: string;
  SLUG: string | null;
  ORDEM: number;
  LEVEL: number | null;
}

/**
 * Item retornado pela listagem product-web-find
 */
export interface ProductWebListItem {
  ID_PRODUTO: number;
  SKU: number;
  PRODUTO: string;
  DESCRICAO_TAB: string | null;
  ETIQUETA: string | null;
  REF: string | null;
  MODELO: string | null;
  TIPO: string | null;
  MARCA: string | null;
  PATH_IMAGEM_MARCA: string | null;
  PATH_IMAGEM: string | null;
  SLUG: string | null;
  ESTOQUE_LOJA: number;
  OURO: string;
  PRATA: string;
  BRONZE: string;
  VL_ATACADO: string;
  VL_CORPORATIVO: string;
  VL_VAREJO: string;
  DECONTO?: string | null;
  IMPORTADO: number;
  PROMOCAO: number;
  LANCAMENTO: number;
  TEMPODEGARANTIA_DIA: number;
  DESCRICAO_VENDA: string | null;
  DATADOCADASTRO: string | null;
}

/**
 * Requisição para product-web-find-id
 */
export interface ProductWebFindByIdRequest extends ProductWebBaseRequest {
  pe_type_business: number;
  pe_id_produto: number;
  pe_slug_produto: string;
}

/**
 * Requisição para product-web-find
 */
export interface ProductWebFindRequest extends ProductWebBaseRequest {
  pe_id_taxonomy?: number;
  pe_slug_taxonomy?: string;
  pe_id_produto?: number;
  pe_produto?: string;
  pe_id_marca?: number;
  pe_flag_estoque?: number;
  pe_qt_registros?: number;
  pe_pagina_id?: number;
  pe_coluna_id?: number;
  pe_ordem_id?: number;
}

/**
 * Estrutura base compartilhada pelas respostas dos endpoints Product Web
 */
interface ProductWebBaseResponse {
  statusCode: number;
  message: string;
  recordId: number;
  quantity: number;
  info1: string;
}

/**
 * Resposta do endpoint product-web-find-id
 */
export interface ProductWebFindByIdResponse extends ProductWebBaseResponse {
  data: [
    ProductWebDetail[],
    ProductWebRelatedTaxonomy[],
    [StoredProcedureResponse],
    MySQLMetadata,
  ];
}

/**
 * Resposta do endpoint product-web-find
 */
export interface ProductWebFindResponse extends ProductWebBaseResponse {
  data: [ProductWebListItem[], [StoredProcedureResponse], MySQLMetadata];
}

/**
 * Erro base para operações Product Web
 */
export class ProductWebError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "ProductWebError";
    Object.setPrototypeOf(this, ProductWebError.prototype);
  }
}

/**
 * Erro específico quando um produto web não é encontrado
 */
export class ProductWebNotFoundError extends ProductWebError {
  constructor(params?: Record<string, unknown>) {
    const message = params
      ? `Produto web não encontrado com os parâmetros: ${JSON.stringify(params)}`
      : "Produto web não encontrado";
    super(message, "PRODUCT_WEB_NOT_FOUND", 100404);
    this.name = "ProductWebNotFoundError";
    Object.setPrototypeOf(this, ProductWebNotFoundError.prototype);
  }
}

/**
 * Erro específico para falhas de validação
 */
export class ProductWebValidationError extends ProductWebError {
  constructor(
    message: string,
    public readonly validationErrors?: Record<string, string[]>,
  ) {
    super(message, "PRODUCT_WEB_VALIDATION_ERROR", 100400);
    this.name = "ProductWebValidationError";
    Object.setPrototypeOf(this, ProductWebValidationError.prototype);
  }
}
