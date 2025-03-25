import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// cat command options schema
export const CatOptionsSchema = CommonOptionsSchema.extend({
  n: z.boolean().optional().describe('Number all output lines')
});

// cat command parameters schema
export const CatParamsSchema = z.object({
  files: PathSchema.describe('Files to concatenate and print'),
  options: CatOptionsSchema.optional().default({})
});

export type CatParams = z.infer<typeof CatParamsSchema>;
