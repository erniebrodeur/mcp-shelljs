import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityConfig } from "../utils/permissions";
import { SecurityLevel } from "../utils/path";

// Import all tool registration functions
import { registerLsTool } from "./ls";
import { registerPwdTool } from "./pwd";
import { registerCatTool } from "./cat";
import { registerGrepTool } from "./grep";
import { registerFindTool } from "./find";
import { registerWhichTool } from "./which";
import { registerTestTool } from "./test";
import { registerHeadTool } from "./head";
import { registerTailTool } from "./tail";
import { registerSortTool } from "./sort";
import { registerUniqTool } from "./uniq";

// Write tools
import { registerMkdirTool } from "./mkdir";
import { registerTouchTool } from "./touch";
import { registerRmTool } from "./rm";

// Exec tool
import { registerExecTool } from "./exec";

// Map tools to their security levels for registration
const tools = [
  // Read tools
  { register: registerLsTool, level: SecurityLevel.READ },
  { register: registerPwdTool, level: SecurityLevel.READ },
  { register: registerCatTool, level: SecurityLevel.READ },
  { register: registerGrepTool, level: SecurityLevel.READ },
  { register: registerFindTool, level: SecurityLevel.READ },
  { register: registerWhichTool, level: SecurityLevel.READ },
  { register: registerTestTool, level: SecurityLevel.READ },
  { register: registerHeadTool, level: SecurityLevel.READ },
  { register: registerTailTool, level: SecurityLevel.READ },
  { register: registerSortTool, level: SecurityLevel.READ },
  { register: registerUniqTool, level: SecurityLevel.READ },
  
  // Write tools
  { register: registerMkdirTool, level: SecurityLevel.WRITE },
  { register: registerTouchTool, level: SecurityLevel.WRITE },
  { register: registerRmTool, level: SecurityLevel.WRITE },
  
  // Exec tool
  { register: registerExecTool, level: SecurityLevel.EXEC }
];

export function setupTools(server: McpServer, config: SecurityConfig): void {
  // Register tools based on security level
  for (const { register, level } of tools) {
    if (
      level === SecurityLevel.READ ||
      (level === SecurityLevel.WRITE && config.enableRw) ||
      (level === SecurityLevel.EXEC && config.enableRw && config.enableExec)
    ) {
      register(server, shell, config);
    }
  }
}