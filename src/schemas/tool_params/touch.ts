import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// touch command options schema
export const TouchOptionsSchema = CommonOptionsSchema.extend({
  a: z.boolean().optional().describe('Change only the access time'),
  c: z.boolean().optional().describe('Do not create files if they do not exist'),
  m: z.boolean().optional().describe('Change only the modification time')
  // Could add date options if needed in the future
});

// touch command parameters schema
export const TouchParamsSchema = z.object({
  files: PathSchema.describe('Files to touch (create or update timestamp)'),
  options: TouchOptionsSchema.optional().default({})
});

export type TouchParams = z.infer<typeof TouchParamsSchema>;
