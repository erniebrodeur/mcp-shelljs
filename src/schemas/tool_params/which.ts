import { z } from 'zod';
import { CommonOptionsSchema } from '../common';

// which command options schema
export const WhichOptionsSchema = CommonOptionsSchema;

// which command parameters schema
export const WhichParamsSchema = z.object({
  command: z.string().describe('Command to locate in PATH'),
  options: WhichOptionsSchema.optional().default({})
});

export type WhichParams = z.infer<typeof WhichParamsSchema>;
