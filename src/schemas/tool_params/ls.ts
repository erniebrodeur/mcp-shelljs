import { z } from 'zod';
import { CommonOptionsSchema, PathSchema } from '../common';

// ls command options schema
export const LsOptionsSchema = CommonOptionsSchema.extend({
  R: z.boolean().optional().describe('Recursive, list subdirectories recursively'),
  A: z.boolean().optional().describe('All, include files beginning with . (except for . and ..)'),
  L: z.boolean().optional().describe('Follow symlinks'),
  d: z.boolean().optional().describe('List directories themselves, not their contents'),
  l: z.boolean().optional().describe('Long format, display file metadata')
});

// ls command parameters schema
export const LsParamsSchema = z.object({
  paths: PathSchema.optional().describe('Paths to list. Defaults to current directory if not specified.'),
  options: LsOptionsSchema.optional().default({})
});

export type LsParams = z.infer<typeof LsParamsSchema>;
