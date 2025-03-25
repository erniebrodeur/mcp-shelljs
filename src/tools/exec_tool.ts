import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Content } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import { z } from "zod";
import { SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";
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

export function registerExecTool(server: McpServer, shellInstance: typeof shell, config: SecurityConfig) {
  server.tool(
    "exec",
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