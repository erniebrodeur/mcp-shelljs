import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";

// Import tools
import { registerReadTools } from "./read_tools";

// Security options type
import { SecurityConfig } from "../utils/permissions";

export function setupTools(server: McpServer, config: SecurityConfig): void {
  // Always register read-only tools
  registerReadTools(server, shell, config);
  
  // We'll add these later:
  // Register write tools if enabled
  /*if (config.enableRw) {
    registerWriteTools(server, shell, config);
  }
  
  // Register exec tool if enabled
  if (config.enableExec) {
    registerExecTool(server, shell, config);
  }*/
}