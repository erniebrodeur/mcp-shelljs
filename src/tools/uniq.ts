import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { UniqParamsSchema, UniqParams } from "../schemas/tool_params/uniq";

/**
 * Registers the uniq tool with the MCP server
 * 
 * The uniq tool filters out repeated lines in a file.
 */
export function registerUniqTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "uniq",
    "Filter duplicate lines. Keep only unique lines from input.",
    UniqParamsSchema.shape,
    async (params: UniqParams): Promise<ToolResponse> => {
      try {
        const { input, output, options } = params;
        const args = output ? [options, input, output] : [options, input];
        
        return await safeShellCommand(
          shellInstance.uniq.bind(shellInstance),
          args,
          SecurityLevel.READ,
          config,
          "uniq"
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