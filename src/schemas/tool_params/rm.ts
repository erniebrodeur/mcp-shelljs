import { z } from 'zod';
import { CommonOptionsSchema, PathSchema, RecursiveOptionSchema, ForceOptionSchema } from '../common';

// rm command options schema - combine recursive and force options
export const RmOptionsSchema = CommonOptionsSchema
  .merge(RecursiveOptionSchema)
  .merge(ForceOptionSchema);

// rm command parameters schema
export const RmParamsSchema = z.object({
  files: PathSchema.describe('Files or directories to remove'),
  options: RmOptionsSchema.optional().default({})
});

export type RmParams = z.infer<typeof RmParamsSchema>;
