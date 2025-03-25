import { z } from 'zod';
import { CommonOptionsSchema } from '../common';

// uniq command options schema
export const UniqOptionsSchema = CommonOptionsSchema.extend({
  i: z.boolean().optional().describe('Ignore case while comparing'),
  c: z.boolean().optional().describe('Prefix lines by the number of occurrences'),
  d: z.boolean().optional().describe('Only print duplicate lines')
});

// uniq command parameters schema
export const UniqParamsSchema = z.object({
  input: z.string().describe('Input file'),
  output: z.string().optional().describe('Output file (optional)'),
  options: UniqOptionsSchema.optional().default({})
});

export type UniqParams = z.infer<typeof UniqParamsSchema>;
