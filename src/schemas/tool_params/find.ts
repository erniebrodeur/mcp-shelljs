import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// find has no specific options in shelljs implementation
export const FindOptionsSchema = CommonOptionsSchema;

// find command parameters schema
export const FindParamsSchema = z.object({
  paths: PathSchema.describe('Base paths to start search from'),
  options: FindOptionsSchema.optional().default({})
});

export type FindParams = z.infer<typeof FindParamsSchema>;
