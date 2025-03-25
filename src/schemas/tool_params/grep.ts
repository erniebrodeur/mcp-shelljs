import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// grep command options schema
export const GrepOptionsSchema = CommonOptionsSchema.extend({
  v: z.boolean().optional().describe('Invert the match'),
  l: z.boolean().optional().describe('Print only filenames of matching files'),
  i: z.boolean().optional().describe('Ignore case'),
  n: z.boolean().optional().describe('Print line numbers')
});

// grep command parameters schema
export const GrepParamsSchema = z.object({
  pattern: z.string().describe('Pattern to search for (regex)'),
  files: PathSchema.describe('Files to search in'),
  options: GrepOptionsSchema.optional().default({})
});

export type GrepParams = z.infer<typeof GrepParamsSchema>;
