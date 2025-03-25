import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// head command options schema
export const HeadOptionsSchema = CommonOptionsSchema.extend({
  n: z.number().optional().describe('Number of lines to show')
});

// head command parameters schema
export const HeadParamsSchema = z.object({
  files: PathSchema.describe('Files to read'),
  options: HeadOptionsSchema.optional().default({})
});

export type HeadParams = z.infer<typeof HeadParamsSchema>;
