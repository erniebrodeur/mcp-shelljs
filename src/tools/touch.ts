import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { TouchParamsSchema, TouchParams } from "../schemas/tool_params/touch";

/**
 * Registers the touch tool with the MCP server
 * 
 * The touch tool creates empty files or updates file timestamps.
 */
export function registerTouchTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "touch",
    "Create or update file timestamps. Updates access/modification times of files, creates empty files if they don't exist.",
    TouchParamsSchema.shape,
    async (params: TouchParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.touch.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.WRITE,
          config,
          "touch"
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