/**
 * Schemas de validação Zod para o serviço de marcas (API V2)
 */

import { z } from "zod";

/**
 * Schema base para requisições de marca
 */
const BaseBrandSchema = z.object({
  pe_user_name: z.string().max(200),
  pe_user_role: z.string().max(200),
  pe_user_id: z.string().max(200).optional(),
  pe_person_id: z.number().int().optional(),
});

/**
 * Schema para listar marcas com filtros (V2)
 */
export const FindBrandSchema = BaseBrandSchema.extend({
  pe_search: z.string().max(200).optional(),
  pe_inactive: z.number().int().min(0).max(1).optional(),
  pe_limit: z.number().int().min(1).max(500).optional(),
});

/**
 * Schema para buscar marca por ID (V2)
 */
export const FindBrandByIdSchema = BaseBrandSchema.extend({
  pe_brand_id: z.number().int().positive(),
});

/**
 * Schema para criar marca (V2)
 */
export const CreateBrandSchema = BaseBrandSchema.extend({
  pe_brand: z.string().max(100),
  pe_slug: z.string().max(300),
  pe_image_path: z.string().max(500).optional(),
  pe_notes: z.string().optional(),
});

/**
 * Schema para atualizar marca (V2)
 */
export const UpdateBrandSchema = BaseBrandSchema.extend({
  pe_brand_id: z.number().int().positive(),
  pe_brand: z.string().max(100).optional(),
  pe_slug: z.string().max(100).optional(),
  pe_image_path: z.string().max(500).optional(),
  pe_notes: z.string().optional(),
  pe_inactive: z.number().int().min(0).max(1).optional(),
});

/**
 * Schema para excluir marca (V2)
 */
export const DeleteBrandSchema = BaseBrandSchema.extend({
  pe_brand_id: z.number().int().positive(),
});

/**
 * Tipos inferidos dos schemas
 */
export type FindBrandInput = z.infer<typeof FindBrandSchema>;
export type FindBrandByIdInput = z.infer<typeof FindBrandByIdSchema>;
export type CreateBrandInput = z.infer<typeof CreateBrandSchema>;
export type UpdateBrandInput = z.infer<typeof UpdateBrandSchema>;
export type DeleteBrandInput = z.infer<typeof DeleteBrandSchema>;
