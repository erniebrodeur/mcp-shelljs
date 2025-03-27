import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as shell from "shelljs";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
import { z } from "zod";
import { CommonOptionsSchema } from "../schemas/common";

// Define exec parameters schema
export const ExecOptionsSchema = CommonOptionsSchema.extend({
  async: z.boolean().optional().describe("Run asynchronously"),
  silent: z.boolean().optional().describe("Silence command output"),
  encoding: z.string().optional().describe("Character encoding")
});

export const ExecParamsSchema = z.object({
  command: z.string().describe("Command to execute"),
  options: ExecOptionsSchema.optional().default({})
});

export type ExecParams = z.infer<typeof ExecParamsSchema>;

/**
 * Registers the exec tool with the MCP server
 * 
 * The exec tool executes shell commands. This requires special permission.
 */
export function registerExecTool(
  server: McpServer, 
  shellInstance: typeof shell,
  config: SecurityConfig
): void {
  server.tool(
    "exec",
    "Execute shell command. Runs an arbitrary command in the system shell. Requires --enable-exec flag.",
    ExecParamsSchema.shape,
    async (params: ExecParams): Promise<ToolResponse> => {
      try {
        const { command, options } = params;
        
        // Add a warning about exec access
        console.warn(`SECURITY: Executing command: ${command}`);
        
        return await safeShellCommand(
          shellInstance.exec.bind(shellInstance),
          [command, options],
          SecurityLevel.EXEC,
          config,
          "exec"
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