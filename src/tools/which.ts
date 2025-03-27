import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { WhichParamsSchema, WhichParams } from "../schemas/tool_params/which";

/**
 * Registers the which tool with the MCP server
 * 
 * The which tool locates a command in the system PATH.
 */
export function registerWhichTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "which",
    "Locate a command. Shows the path to an executable in the system's PATH.",
    WhichParamsSchema.shape,
    async (params: WhichParams): Promise<ToolResponse> => {
      try {
        const { command, options } = params;
        
        return await safeShellCommand(
          shellInstance.which.bind(shellInstance),
          [command],
          SecurityLevel.READ,
          config,
          "which"
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