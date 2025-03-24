import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';

/**
 * Custom world class for MCP-ShellJS tests
 */
export class McpWorld extends World {
  // Server state and response tracking
  public serverMode: 'read-only' | 'read-write' | 'exec-enabled' = 'read-only';
  public response: any = null;
  public error: Error | null = null;
  
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(McpWorld);
