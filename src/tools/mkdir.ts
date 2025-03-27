import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { MkdirParamsSchema, MkdirParams } from "../schemas/tool_params/mkdir";

/**
 * Registers the mkdir tool with the MCP server
 * 
 * The mkdir tool creates directories.
 */
export function registerMkdirTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "mkdir",
    "Create directories. Creates directory structure with optional support for creating intermediate directories.",
    MkdirParamsSchema.shape,
    async (params: MkdirParams): Promise<ToolResponse> => {
      try {
        const { dirs, options } = params;
        const dirsList = Array.isArray(dirs) ? dirs : [dirs];
        
        return await safeShellCommand(
          shellInstance.mkdir.bind(shellInstance),
          [options, ...dirsList],
          SecurityLevel.WRITE,
          config,
          "mkdir"
        );
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true
        };
      }
    }
  );
}