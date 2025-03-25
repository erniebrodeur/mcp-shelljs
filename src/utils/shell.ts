import * as shell from 'shelljs';
import { SecurityLevel } from './path';
import { SecurityConfig } from './permissions';
import { validatePaths } from './path';
import { requirePermission } from './permissions';
import { shellStringToResponse, createErrorResponse } from './convert';
import { z } from 'zod';
import { Content } from '@modelcontextprotocol/sdk/types.js';

export const BaseToolOptionsSchema = z.object({
  silent: z.boolean().optional().default(true),
  async: z.boolean().optional().default(false)
}).passthrough();

export interface ToolResponse {
  content: Content[];
  isError?: boolean;
  errorDetail?: {
    code: number;
    message: string;
  };
}

export async function safeShellCommand(
  command: Function,
  args: any[],
  securityLevel: SecurityLevel,
  config: SecurityConfig,
  commandName: string
): Promise<ToolResponse> {
  try {
    requirePermission(securityLevel, config)();
    const result = command(...args);
    return shellStringToResponse(result, commandName);
  } catch (error: any) {
    return createErrorResponse(error.message);
  }
}

export function createSafeFileCommand(
  command: Function,
  securityLevel: SecurityLevel,
  config: SecurityConfig,
  commandName: string
) {
  return async function(paths: string | string[], options: any = {}): Promise<ToolResponse> {
    try {
      requirePermission(securityLevel, config)();
      
      const pathArray = Array.isArray(paths) ? paths : [paths];
      const validPaths = validatePaths(pathArray, {
        requiredLevel: securityLevel
      });
      
      const result = command(options, ...validPaths);
      return shellStringToResponse(result, commandName);
    } catch (error: any) {
      return createErrorResponse(error.message);
    }
  };
}