// Tipos para o serviço de marcas (Brand) - API V2

/**
 * Custom error class for brand-related errors
 */
export class BrandError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "BrandError";
    Object.setPrototypeOf(this, BrandError.prototype);
  }
}

/**
 * Error thrown when brand is not found
 */
export class BrandNotFoundError extends BrandError {
  constructor(params?: Record<string, unknown>) {
    const message = params
      ? `Marca não encontrada com os parâmetros: ${JSON.stringify(params)}`
      : "Marca não encontrada";
    super(message, "BRAND_NOT_FOUND", 100404);
    this.name = "BrandNotFoundError";
    Object.setPrototypeOf(this, BrandNotFoundError.prototype);
  }
}

/**
 * Error thrown when brand validation fails
 */
export class BrandValidationError extends BrandError {
  constructor(
    message: string,
    public readonly validationErrors?: Record<string, string[]>,
  ) {
    super(message, "BRAND_VALIDATION_ERROR", 100400);
    this.name = "BrandValidationError";
    Object.setPrototypeOf(this, BrandValidationError.prototype);
  }
}

/**
 * Base request interface with common parameters (API V2)
 */
interface BaseBrandRequest {
  pe_app_id: number;
  pe_system_client_id: number;
  pe_store_id: number;
  pe_organization_id: string;
  pe_user_id?: string;
  pe_user_name: string;
  pe_user_role: string;
  pe_person_id?: number;
}

/**
 * Requisição para listar marcas (V2)
 */
export interface FindBrandRequest extends BaseBrandRequest {
  pe_search?: string;
  pe_inactive?: number;
  pe_limit?: number;
}

/**
 * Requisição para buscar marca por ID (V2)
 */
export interface FindBrandByIdRequest extends BaseBrandRequest {
  pe_brand_id: number;
}

/**
 * Requisição para criar marca (V2)
 */
export interface CreateBrandRequest extends BaseBrandRequest {
  pe_brand: string;
  pe_slug: string;
  pe_image_path?: string;
  pe_notes?: string;
}

/**
 * Requisição para atualizar marca (V2)
 */
export interface UpdateBrandRequest extends BaseBrandRequest {
  pe_brand_id: number;
  pe_brand?: string;
  pe_slug?: string;
  pe_image_path?: string;
  pe_notes?: string;
  pe_inactive?: number;
}

/**
 * Requisição para excluir marca (V2)
 */
export interface DeleteBrandRequest extends BaseBrandRequest {
  pe_brand_id: number;
}

/**
 * Estrutura de dados da marca (V2)
 */
export interface BrandData {
  ID_MARCA: number;
  MARCA: string | null;
  SLUG: string | null;
  PATH_IMAGEM: string | null;
  INATIVO: number;
  ANOTACOES?: string | null;
  DT_UPDATE?: string | null;
}

/**
 * Estrutura de resposta da stored procedure (V2)
 */
export interface StoredProcedureResponse {
  sp_return_id: number;
  sp_message: string;
  sp_error_id: number;
}

/**
 * Base response interface (V2)
 */
interface BaseBrandResponse {
  statusCode: number;
  message: string;
  recordId: number;
  quantity: number;
  errorId: number;
  info1?: string;
}

/**
 * Resposta da listagem de marcas (V2)
 * Nova estrutura: data é um objeto com chave "Brand find All"
 */
export interface FindBrandResponse extends BaseBrandResponse {
  data: {
    "Brand find All": BrandData[];
  };
}

/**
 * Resposta de criação/atualização/exclusão de marca (V2)
 */
export interface MutateBrandResponse extends BaseBrandResponse {
  data: StoredProcedureResponse[];
}
