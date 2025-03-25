import { z } from 'zod';

// Schema for file:// URI parameters
export const FileUriParamsSchema = z.object({
  filePath: z.string().describe('Path to file'),
  lines: z.boolean().optional().describe('Include line numbers in output'),
  start: z.number().optional().describe('First line to include (1-based)'),
  end: z.number().optional().describe('Last line to include'),
  highlight: z.string().optional().describe('Pattern to highlight in output')
});

export type FileUriParams = z.infer<typeof FileUriParamsSchema>;

// Schema for directory:// URI parameters
export const DirectoryUriParamsSchema = z.object({
  dirPath: z.string().describe('Path to directory'),
  include: z.string().optional().describe('Glob pattern(s) to include (comma-separated)'),
  exclude: z.string().optional().describe('Glob pattern(s) to exclude (comma-separated)'),
  honor_gitignore: z.boolean().optional().describe('Honor .gitignore patterns'),
  recursive: z.boolean().optional().describe('Include subdirectories recursively')
});

export type DirectoryUriParams = z.infer<typeof DirectoryUriParamsSchema>;
