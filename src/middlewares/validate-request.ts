import { ZodError, ZodSchema } from 'zod'

export type ValidationResult<TData> = { success: true, data: TData } | { success: false, error: ZodError }

export default async function validateRequest<TBody = any>(request: Request, schema: ZodSchema): Promise<ValidationResult<TBody>> {
  const body = await request.json()

  const result = await schema.safeParseAsync(body)

  if (result.success) {
    return {
      success: true,
      data: result.data,
    }
  }

  return {
    success: false,
    error: result.error,
  }
}