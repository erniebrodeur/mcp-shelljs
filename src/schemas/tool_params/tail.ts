import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// tail command options schema
export const TailOptionsSchema = CommonOptionsSchema.extend({
  n: z.number().optional().describe('Number of lines to show')
});

// tail command parameters schema
export const TailParamsSchema = z.object({
  files: PathSchema.describe('Files to read'),
  options: TailOptionsSchema.optional().default({})
});

export type TailParams = z.infer<typeof TailParamsSchema>;
