import { z } from 'zod';

const errorWithBodySchema = z.object({
  message: z.string(),
  body: z.object({
    errors: z.array(
      z
        .object({
          code: z.string(),
          message: z.string(),
        })
        .and(z.record(z.string())),
    ),
  }),
});

export type ErrorWithBody = z.infer<typeof errorWithBodySchema>;

export function isErrorWithBody(error: unknown): error is ErrorWithBody {
  return errorWithBodySchema.safeParse(error).success;
}
