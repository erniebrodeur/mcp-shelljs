import { z } from 'zod';
import { CommonOptionsSchema } from '../common';

// pwd has no specific parameters, just common options
export const PwdOptionsSchema = CommonOptionsSchema;

export const PwdParamsSchema = z.object({
  options: PwdOptionsSchema.optional().default({})
});

export type PwdParams = z.infer<typeof PwdParamsSchema>;
