import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { GrepParamsSchema, GrepParams } from "../schemas/tool_params/grep";

/**
 * Registers the grep tool with the MCP server
 * 
 * The grep tool searches for patterns in files and returns matching lines.
 */
export function registerGrepTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "grep",
    "Search files for patterns. Returns lines matching the specified pattern.",
    GrepParamsSchema.shape,
    async (params: GrepParams): Promise<ToolResponse> => {
      try {
        const { pattern, files, options } = params;
        const filesList = Array.isArray(files) ? files : [files];
        
        return await safeShellCommand(
          shellInstance.grep.bind(shellInstance),
          [options, pattern, ...filesList],
          SecurityLevel.READ,
          config,
          "grep"
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