import { z } from 'zod';

/**
 * Parameter schema for pwd command
 * pwd doesn't accept any parameters
 */
export const pwdInputSchema = z.object({}).strict();

/**
 * Response schema for pwd command
 * Returns a ShellString containing the current working directory
 */
export const pwdResponseSchema = z.object({
  stdout: z.string(), // The current working directory path
  stderr: z.string().optional(), // Error message if any
  code: z.number(), // Exit code (0 for success)
});

export type PwdInput = z.infer<typeof pwdInputSchema>;
export type PwdResponse = z.infer<typeof pwdResponseSchema>;
