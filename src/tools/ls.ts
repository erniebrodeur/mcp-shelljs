import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { LsParamsSchema, LsParams } from "../schemas/tool_params/ls";

/**
 * Registers the ls tool with the MCP server
 * 
 * The ls tool lists directory contents with options for formatting and filtering.
 */
export function registerLsTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "ls",
    "List directory contents. Shows files and directories with optional formatting and filtering.",
    LsParamsSchema.shape,
    async (params: LsParams): Promise<ToolResponse> => {
      try {
        const { paths, options } = params;
        const pathInput = paths ? (Array.isArray(paths) ? paths : [paths]) : ['.'];
        const args = [options, ...pathInput];
        
        return await safeShellCommand(
          shellInstance.ls.bind(shellInstance),
          args,
          SecurityLevel.READ,
          config,
          "ls"
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