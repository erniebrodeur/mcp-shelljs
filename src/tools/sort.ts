import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { SortParamsSchema, SortParams } from "../schemas/tool_params/sort";

/**
 * Registers the sort tool with the MCP server
 * 
 * The sort tool sorts lines of text files.
 */
export function registerSortTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "sort",
    "Sort lines. Returns the contents of files sorted line by line.",
    SortParamsSchema.shape,
    async (params: SortParams): Promise<ToolResponse> => {
      try {
        const { files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.sort.bind(shellInstance),
          [options, ...filesList],
          SecurityLevel.READ,
          config,
          "sort"
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