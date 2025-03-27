import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { RmParamsSchema, RmParams } from "../schemas/tool_params/rm";

/**
 * Registers the rm tool with the MCP server
 * 
 * The rm tool removes files and directories.
 */
export function registerRmTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "rm",
    "Remove files or directories. Deletes files with optional support for recursive directory removal.",
    RmParamsSchema.shape,
    async (params: RmParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.rm.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.WRITE,
          config,
          "rm"
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