import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { PwdParamsSchema, PwdParams } from "../schemas/tool_params/pwd";

/**
 * Registers the pwd tool with the MCP server
 * 
 * The pwd tool displays the current working directory path.
 */
export function registerPwdTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "pwd",
    "Print Working Directory. Shows the absolute path of the current directory.",
    PwdParamsSchema.shape,
    async (params: PwdParams): Promise<ToolResponse> => {
      try {
        return await safeShellCommand(
          shellInstance.pwd.bind(shellInstance),
          [params.options],
          SecurityLevel.READ,
          config,
          "pwd"
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