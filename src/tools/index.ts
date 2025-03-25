import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";

// Import tools
import { registerReadTools } from "./read_tools";
import { registerWriteTools } from "./write_tools";
import { registerExecTool } from "./exec_tool";

// Security options type
import { SecurityConfig } from "../utils/permissions";

export function setupTools(server: McpServer, config: SecurityConfig): void {
  // Always register read-only tools
  registerReadTools(server, shell, config);
  
  // Register write tools if enabled
  if (config.enableRw) {
    registerWriteTools(server, shell, config);
  }
  
  // Register exec tool if enabled
  if (config.enableRw && config.enableExec) {
    registerExecTool(server, shell, config);
  }
}