/**
 * Serviço de marcas para interagir com a API (V2)
 */

import { envs } from "@/core/config";
import {
  API_STATUS_CODES,
  BRAND_ENDPOINTS,
  isApiError,
  isApiSuccess,
} from "@/core/constants/api-constants";
import { createLogger } from "@/core/logger";
import { BaseApiService } from "@/lib/axios/base-api-service";

import type {
  BrandData,
  CreateBrandRequest,
  DeleteBrandRequest,
  FindBrandByIdRequest,
  FindBrandRequest,
  FindBrandResponse,
  MutateBrandResponse,
  StoredProcedureResponse,
  UpdateBrandRequest,
} from "./types/brand-types";

import {
  CreateBrandSchema,
  DeleteBrandSchema,
  FindBrandByIdSchema,
  FindBrandSchema,
  UpdateBrandSchema,
} from "./validation/brand-schemas";

// Logger instance
const logger = createLogger("BrandService");

// Default values for user info (should be overridden by caller when needed)
const DEFAULT_USER_NAME = "System";
const DEFAULT_USER_ROLE = "system";

/**
 * Serviço para operações relacionadas a marcas (API V2)
 */
export class BrandServiceApi extends BaseApiService {
  /**
   * Build base payload with environment variables (V2)
   */
  private static buildBasePayload(
    additionalData: Record<string, unknown> = {},
  ): Record<string, unknown> {
    return {
      pe_app_id: envs.APP_ID,
      pe_system_client_id: envs.SYSTEM_CLIENT_ID,
      pe_store_id: envs.STORE_ID,
      pe_organization_id: envs.ORGANIZATION_ID,
      pe_user_id: envs.USER_ID,
      pe_user_name: DEFAULT_USER_NAME,
      pe_user_role: DEFAULT_USER_ROLE,
      pe_person_id: envs.PERSON_ID,
      ...additionalData,
    };
  }

  // ========================================
  // FIND ALL BRANDS
  // ========================================

  /**
   * Endpoint - Listar Marcas v2
   * @param params - Parâmetros de busca e filtros
   * @returns Promise com lista de marcas
   */
  static async findBrands(
    params: Partial<FindBrandRequest> = {},
  ): Promise<FindBrandResponse> {
    try {
      const validatedParams = BrandServiceApi.validateSearchParams(params);
      const requestBody = BrandServiceApi.buildSearchPayload(validatedParams);

      const response = await BrandServiceApi.executeBrandSearch(requestBody);

      return BrandServiceApi.handleSearchResponse(response);
    } catch (error) {
      logger.error("Erro no serviço de marcas (busca)", error);
      throw error;
    }
  }

  /**
   * Valida parâmetros de busca
   * @private
   */
  private static validateSearchParams(
    params: Partial<FindBrandRequest>,
  ): Partial<FindBrandRequest> {
    try {
      return FindBrandSchema.partial().parse(params);
    } catch (error) {
      logger.error("Erro na validação de parâmetros de busca", error);
      throw error;
    }
  }

  /**
   * Constrói payload de busca com valores padrão (V2)
   * @private
   */
  private static buildSearchPayload(
    params: Partial<FindBrandRequest>,
  ): Record<string, unknown> {
    const payload = BrandServiceApi.buildBasePayload({
      pe_search: "", // Valor padrão - sem filtro de pesquisa
      pe_inactive: 0, // Valor padrão - apenas ativos
      pe_limit: 100, // Valor padrão - 100 registros
      ...params,
    });

    return payload;
  }

  /**
   * Executa busca de marcas na API
   * @private
   */
  private static async executeBrandSearch(
    requestBody: Record<string, unknown>,
  ): Promise<FindBrandResponse> {
    const instance = new BrandServiceApi();
    return await instance.post<FindBrandResponse>(
      BRAND_ENDPOINTS.FIND_ALL,
      requestBody,
    );
  }

  /**
   * Trata resposta da busca de marcas (V2)
   * @private
   */
  private static handleSearchResponse(
    data: FindBrandResponse,
  ): FindBrandResponse {
    // Verifica se é código de resultado vazio ou não encontrado
    if (
      data.statusCode === API_STATUS_CODES.EMPTY_RESULT ||
      data.statusCode === API_STATUS_CODES.NOT_FOUND ||
      data.statusCode === API_STATUS_CODES.UNPROCESSABLE
    ) {
      return {
        ...data,
        statusCode: API_STATUS_CODES.SUCCESS,
        quantity: 0,
        errorId: 0,
        data: {
          "Brand find All": [],
        },
      };
    }

    // Verifica se a busca foi bem-sucedida usando função utilitária
    if (isApiError(data.statusCode)) {
      throw new Error(data.message || "Erro ao buscar marcas");
    }

    return data;
  }

  // ========================================
  // FIND BRAND BY ID
  // ========================================

  /**
   * Endpoint - Buscar Marca por ID (V2)
   * @param params - Parâmetros com ID da marca
   * @returns Promise com dados da marca
   */
  static async findBrandById(
    params: Partial<FindBrandByIdRequest>,
  ): Promise<FindBrandResponse> {
    try {
      const validatedParams = FindBrandByIdSchema.partial().parse(params);
      const requestBody = BrandServiceApi.buildBasePayload({
        pe_brand_id: validatedParams.pe_brand_id ?? 0,
        ...validatedParams,
      });

      const instance = new BrandServiceApi();
      const response = await instance.post<FindBrandResponse>(
        BRAND_ENDPOINTS.FIND_BY_ID,
        requestBody,
      );

      return BrandServiceApi.handleSearchResponse(response);
    } catch (error) {
      logger.error("Erro no serviço de marcas (buscar por ID)", error);
      throw error;
    }
  }

  // ========================================
  // CREATE BRAND
  // ========================================

  /**
   * Endpoint - Criar Marca (V2)
   * @param params - Dados da marca a ser criada
   * @returns Promise com resposta da criação
   */
  static async createBrand(
    params: Partial<CreateBrandRequest>,
  ): Promise<MutateBrandResponse> {
    try {
      const validatedParams = CreateBrandSchema.partial().parse(params);
      const requestBody = BrandServiceApi.buildBasePayload({
        pe_brand: "",
        pe_slug: "",
        pe_image_path: "",
        pe_notes: "",
        ...validatedParams,
      });

      const instance = new BrandServiceApi();
      const response = await instance.post<MutateBrandResponse>(
        BRAND_ENDPOINTS.CREATE,
        requestBody,
      );

      if (isApiError(response.statusCode)) {
        throw new Error(response.message || "Erro ao criar marca");
      }

      return response;
    } catch (error) {
      logger.error("Erro no serviço de marcas (criar)", error);
      throw error;
    }
  }

  // ========================================
  // UPDATE BRAND
  // ========================================

  /**
   * Endpoint - Atualizar Marca (V2)
   * @param params - Dados da marca a ser atualizada
   * @returns Promise com resposta da atualização
   */
  static async updateBrand(
    params: Partial<UpdateBrandRequest>,
  ): Promise<MutateBrandResponse> {
    try {
      const validatedParams = UpdateBrandSchema.partial().parse(params);
      const requestBody = BrandServiceApi.buildBasePayload({
        pe_brand_id: validatedParams.pe_brand_id ?? 0,
        ...validatedParams,
      });

      const instance = new BrandServiceApi();
      const response = await instance.post<MutateBrandResponse>(
        BRAND_ENDPOINTS.UPDATE,
        requestBody,
      );

      if (isApiError(response.statusCode)) {
        throw new Error(response.message || "Erro ao atualizar marca");
      }

      return response;
    } catch (error) {
      logger.error("Erro no serviço de marcas (atualizar)", error);
      throw error;
    }
  }

  // ========================================
  // DELETE BRAND
  // ========================================

  /**
   * Endpoint - Excluir Marca (V2)
   * @param params - ID da marca a ser excluída
   * @returns Promise com resposta da exclusão
   */
  static async deleteBrand(
    params: Partial<DeleteBrandRequest>,
  ): Promise<MutateBrandResponse> {
    try {
      const validatedParams = DeleteBrandSchema.partial().parse(params);
      const requestBody = BrandServiceApi.buildBasePayload({
        pe_brand_id: validatedParams.pe_brand_id ?? 0,
        ...validatedParams,
      });

      const instance = new BrandServiceApi();
      const response = await instance.post<MutateBrandResponse>(
        BRAND_ENDPOINTS.DELETE,
        requestBody,
      );

      if (isApiError(response.statusCode)) {
        throw new Error(response.message || "Erro ao excluir marca");
      }

      return response;
    } catch (error) {
      logger.error("Erro no serviço de marcas (excluir)", error);
      throw error;
    }
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  /**
   * Extrai lista de marcas da resposta da API (V2)
   * @param response - Resposta da API
   * @returns Lista de marcas ou array vazio
   */
  static extractBrandList(response: FindBrandResponse): BrandData[] {
    return response.data?.["Brand find All"] ?? [];
  }

  /**
   * Extrai resposta da stored procedure de mutação
   * @param response - Resposta da API com stored procedure
   * @returns Resposta da stored procedure ou null
   */
  static extractMutateResponse(
    response: MutateBrandResponse,
  ): StoredProcedureResponse | null {
    return response.data?.[0] ?? null;
  }

  // ========================================
  // VALIDATION METHODS
  // ========================================

  /**
   * Valida se a resposta de busca de marcas é válida (V2)
   * @param response - Resposta da API
   * @returns true se válida, false caso contrário
   */
  static isValidBrandResponse(response: FindBrandResponse): boolean {
    return (
      isApiSuccess(response.statusCode) &&
      response.data &&
      Array.isArray(response.data["Brand find All"])
    );
  }

  /**
   * Verifica se a operação de mutação foi bem-sucedida
   * @param response - Resposta da API
   * @returns true se bem-sucedida, false caso contrário
   */
  static isMutationSuccessful(response: MutateBrandResponse): boolean {
    const spResponse = BrandServiceApi.extractMutateResponse(response);
    return spResponse ? spResponse.sp_error_id === 0 : false;
  }
}
