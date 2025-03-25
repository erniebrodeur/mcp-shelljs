import * as path from 'path';
import * as fs from 'fs';

export enum SecurityLevel {
  READ = 'read',
  WRITE = 'write',
  EXEC = 'exec'
}

export interface PathValidationOptions {
  allowOutsideCwd?: boolean;
  allowedDirs?: string[];
  requiredLevel?: SecurityLevel;
}

const DEFAULT_OPTIONS: PathValidationOptions = {
  allowOutsideCwd: false,
  allowedDirs: [],
  requiredLevel: SecurityLevel.READ
};

export function validatePath(filePath: string, options: PathValidationOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Normalize path to prevent directory traversal
  const normalizedPath = path.normalize(filePath);
  
  // Convert to absolute path
  const absolutePath = path.isAbsolute(normalizedPath) 
    ? normalizedPath 
    : path.resolve(process.cwd(), normalizedPath);
  
  // Check if path exists (for read operations)
  if (opts.requiredLevel === SecurityLevel.READ && !fs.existsSync(absolutePath)) {
    throw new Error(`Path does not exist: ${absolutePath}`);
  }
  
  // Check if path is within allowed directories
  const isInCwd = absolutePath.startsWith(process.cwd());
  const isInAllowedDir = opts.allowedDirs?.some(dir => 
    absolutePath.startsWith(path.resolve(dir))
  ) ?? false;
  
  if (!opts.allowOutsideCwd && !isInCwd && !isInAllowedDir) {
    throw new Error(`Access denied: ${absolutePath} is outside allowed directories`);
  }
  
  return absolutePath;
}

export function validatePaths(filePaths: string[], options: PathValidationOptions = {}): string[] {
  return filePaths.map(p => validatePath(p, options));
}

export function isGlobSafe(pattern: string): boolean {
  const suspicious = [
    /\.\.[\/\\]/,  // Directory traversal
    /^~[\/\\]/,    // Home directory
    /^[\/\\]etc[\/\\]/, // System files
    /^[\/\\]root[\/\\]/, // Root user directory
  ];
  
  return !suspicious.some(regex => regex.test(pattern));
}