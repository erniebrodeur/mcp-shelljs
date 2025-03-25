import { SecurityLevel } from './path';

export interface SecurityConfig {
  enableRw: boolean;
  enableExec: boolean;
}

export function isOperationPermitted(level: SecurityLevel, config: SecurityConfig): boolean {
  switch (level) {
    case SecurityLevel.READ:
      return true;
    case SecurityLevel.WRITE:
      return config.enableRw;
    case SecurityLevel.EXEC:
      return config.enableRw && config.enableExec;
    default:
      return false;
  }
}

export function requirePermission(level: SecurityLevel, config: SecurityConfig) {
  return function checkPermission() {
    if (!isOperationPermitted(level, config)) {
      const levelName = level === SecurityLevel.WRITE ? 'write' : 'exec';
      throw new Error(
        `Permission denied: This operation requires ${levelName} ` +
        `permission. Start the server with --enable-${levelName} flag.`
      );
    }
  };
}