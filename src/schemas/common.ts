import { z } from 'zod';

// Common option flags for tools
export const CommonOptionsSchema = z.object({
  silent: z.boolean().optional().default(true).describe('Silence command output')
}).passthrough();

// Base schema for path operations
export const PathSchema = z.union([
  z.string().describe('File or directory path'),
  z.array(z.string()).describe('Array of file or directory paths')
]);

// Common recursive flag option
export const RecursiveOptionSchema = z.object({
  r: z.boolean().optional().describe('Recursive operation'),
  R: z.boolean().optional().describe('Recursive operation (alias for -r)')
}).passthrough();

// Common force flag option
export const ForceOptionSchema = z.object({
  f: z.boolean().optional().describe('Force operation without confirmation')
}).passthrough();

// Helper function to check if recursive option is enabled
export function isRecursiveEnabled(options: any): boolean {
  return Boolean(options?.r || options?.R);
}

// Helper function to check if force option is enabled
export function isForceEnabled(options: any): boolean {
  return Boolean(options?.f);
}
