import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Content } from "@modelcontextprotocol/sdk/types.js";
import * as shell from "shelljs";
import { z } from "zod";
import { BaseToolOptionsSchema, SecurityLevel, safeShellCommand, ToolResponse } from "../utils";
import { SecurityConfig } from "../utils/permissions";

export function registerReadTools(server: McpServer, shellInstance: typeof shell, config: SecurityConfig) {
  // ls tool
  server.tool(
    "ls",
    {
      paths: z.union([z.string(), z.array(z.string())]).optional(),
      options: z.object({
        R: z.boolean().optional().describe("Recursive"),
        A: z.boolean().optional().describe("All files (include hidden)"),
        L: z.boolean().optional().describe("Follow symlinks"),
        d: z.boolean().optional().describe("List directories themselves")
      }).optional()
    },
    async ({ paths, options = {} }): Promise<ToolResponse> => {
      try {
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

  // pwd tool
  server.tool(
    "pwd",
    {},
    async (): Promise<ToolResponse> => {
      try {
        return await safeShellCommand(
          shellInstance.pwd.bind(shellInstance),
          [],
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