import { z } from 'zod';
import { CommonOptionsSchema } from '../common';

// test command options schema
export const TestOptionsSchema = CommonOptionsSchema;

// Valid test expressions
export const TestExpressionType = z.enum([
  '-b', // path is a block device
  '-c', // path is a character device
  '-d', // path is a directory
  '-e', // path exists
  '-f', // path is a regular file
  '-L', // path is a symbolic link
  '-p', // path is a pipe (FIFO)
  '-S'  // path is a socket
]);

// test command parameters schema
export const TestParamsSchema = z.object({
  expression: TestExpressionType.describe('Test expression (e.g., -d for directory)'),
  path: z.string().describe('Path to test'),
  options: TestOptionsSchema.optional().default({})
});

export type TestParams = z.infer<typeof TestParamsSchema>;
