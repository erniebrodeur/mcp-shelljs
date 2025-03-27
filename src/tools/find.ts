import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { FindParamsSchema, FindParams } from "../schemas/tool_params/find";

/**
 * Registers the find tool with the MCP server
 * 
 * The find tool recursively searches for files in directories.
 */
export function registerFindTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "find",
    "Find files recursively. Returns all files (however deep) in the given paths.",
    FindParamsSchema.shape,
    async (params: FindParams): Promise<ToolResponse> => {
      try {
        const { paths, options } = params;
        const pathsList = Array.isArray(paths) ? paths : [paths];
        
        return await safeShellCommand(
          shellInstance.find.bind(shellInstance),
          pathsList,
          SecurityLevel.READ,
          config,
          "find"
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