import { z } from 'zod';

export type ResourceNotFoundError = { code: 'ResourceNotFound'; message: string };
export const isResourceNotFoundError = (error: unknown): error is ResourceNotFoundError =>
  z.object({ code: z.literal('ResourceNotFound'), message: z.string() }).safeParse(error).success;

export type DuplicateFieldError = { code: 'DuplicateField'; message: string };
export const isDuplicateFieldError = (error: unknown): error is DuplicateFieldError =>
  z.object({ code: z.literal('DuplicateField'), message: z.string() }).safeParse(error).success;

export type InvalidCredentialsError = { code: 'InvalidCredentials'; message: string };
export const isInvalidCredentialsError = (error: unknown): error is InvalidCredentialsError =>
  z.object({ code: z.literal('InvalidCredentials'), message: z.string() }).safeParse(error).success;

export const isErrorWithMessage = (error: unknown): error is Error =>
  z.object({ message: z.string() }).safeParse(error).success;
