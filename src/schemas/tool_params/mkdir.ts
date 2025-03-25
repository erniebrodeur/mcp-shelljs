import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// mkdir command options schema
export const MkdirOptionsSchema = CommonOptionsSchema.extend({
  p: z.boolean().optional().describe('Create intermediate directories as needed')
});

// mkdir command parameters schema
export const MkdirParamsSchema = z.object({
  dirs: PathSchema.describe('Directories to create'),
  options: MkdirOptionsSchema.optional().default({})
});

export type MkdirParams = z.infer<typeof MkdirParamsSchema>;
