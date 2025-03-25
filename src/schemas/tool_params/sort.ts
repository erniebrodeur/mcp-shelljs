import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// sort command options schema
export const SortOptionsSchema = CommonOptionsSchema.extend({
  r: z.boolean().optional().describe('Reverse the results'),
  n: z.boolean().optional().describe('Compare according to numerical value')
});

// sort command parameters schema
export const SortParamsSchema = z.object({
  files: PathSchema.describe('Files to sort'),
  options: SortOptionsSchema.optional().default({})
});

export type SortParams = z.infer<typeof SortParamsSchema>;
